import React, { useState, useContext } from "react";
import Table from "./Table";
import { OpKind } from "@taquito/taquito";
import { TezosStuffContext } from "../App";
import { useSnackbar } from "notistack";

const TraderDashboard = () => {
    const {
        Tezos,
        userAddress,
        setPoolStorage,
        setKUSDStorage,
        setUserBalance,
        kUSDContract,
        poolContract,
        oTokenContract,
        iTokenContract,
        iTokenStorage,
        oTokenStorage,
        setOTokenStorage,
        setITokenStorage,
        userITokenBalance,
        userOTokenBalance,
        setUserITokenBalance,
        setUserOTokenBalance,
        poolStorage,
    } = useContext(TezosStuffContext);

    const [isDefault, setDefault] = useState(true);
    const [loading, setLoading] = useState(false);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const rows = [
        {
            id: 1,
            pool: "AAVE Protocol",
            Default: isDefault ? "Yes" : "No",
            CoverToken: userITokenBalance,
            PremiumToken: userOTokenBalance,
        },
    ];

    const claimCoverage = async () => {
        setLoading(true);
        const balance_map = await iTokenStorage.balances.get(userAddress);
        const iTokenAmount = balance_map.balance.toNumber();
        const batchT = [];
        batchT.push({
            kind: OpKind.TRANSACTION,
            ...poolContract.methods.setCoverTokenSupply(1).toTransferParams(),
        });
        batchT.push({
            kind: OpKind.TRANSACTION,
            ...poolContract.methods
                .claimCoverage(iTokenAmount)
                .toTransferParams(),
        });

        try {
            const batch = await Tezos.wallet.batch(batchT);
            const batchOp = await batch.send();
            console.log("Operation hash:", batchOp.hash);
            await batchOp.confirmation();
            const newStorage = await poolContract.storage();
            if (newStorage) setPoolStorage(newStorage);
            const newKUSDStorage = await kUSDContract.storage();
            if (newKUSDStorage) setKUSDStorage(newKUSDStorage);
            const newOTokenStorage = await oTokenContract.storage();
            if (newOTokenStorage) setOTokenStorage(newOTokenStorage);
            const newITokenStorage = await iTokenContract.storage();
            if (newITokenStorage) setITokenStorage(newITokenStorage);

            try {
                const balance_map = await iTokenStorage.balances.get(
                    userAddress
                );
                const userITokenAmount = balance_map.balance.toNumber();
                setUserITokenBalance(userITokenAmount);

                const balance_map2 = await oTokenStorage.balances.get(
                    userAddress
                );
                const userOTokenAmount = balance_map2.balance.toNumber();
                setUserOTokenBalance(userOTokenAmount);
            } catch (e) {
                console.log(e);
            }

            enqueueSnackbar("Transaction Successful", {
                variant: "success",
                autoHideDuration: 4000,
                anchorOrigin: {
                    vertical: "top",
                    horizontal: "left",
                },
            });

            setUserBalance(await Tezos.tz.getBalance(userAddress));
        } catch (error) {
            console.log(error);
            enqueueSnackbar(`${error.message}`, {
                variant: "error",
                autoHideDuration: 4000,
                anchorOrigin: {
                    vertical: "top",
                    horizontal: "left",
                },
            });
        } finally {
            setLoading(false);
        }
    };

    const claimPremium = async () => {
        setLoading(true);
        const balance_map = await oTokenStorage.balances.get(userAddress);
        const oTokenAmount = balance_map.balance.toNumber();
        const batchT = [];
        batchT.push({
            kind: OpKind.TRANSACTION,
            ...poolContract.methods.setPremiumTokenSupply(1).toTransferParams(),
        });
        batchT.push({
            kind: OpKind.TRANSACTION,
            ...poolContract.methods
                .withdrawPremium(oTokenAmount)
                .toTransferParams(),
        });

        try {
            const batch = await Tezos.wallet.batch(batchT);
            const batchOp = await batch.send();
            await batchOp.confirmation();
            console.log("Operation hash:", batchOp.hash);
            const newStorage = await poolContract.storage();
            if (newStorage) setPoolStorage(newStorage);
            const newKUSDStorage = await kUSDContract.storage();
            if (newKUSDStorage) setKUSDStorage(newKUSDStorage);
            const newOTokenStorage = await oTokenContract.storage();
            if (newOTokenStorage) setOTokenStorage(newOTokenStorage);
            const newITokenStorage = await iTokenContract.storage();
            if (newITokenStorage) setITokenStorage(newITokenStorage);

            setUserBalance(await Tezos.tz.getBalance(userAddress));
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const callback = () => {
        if (isDefault) {
            claimCoverage();
        } else {
            claimPremium();
        }
    };

    const onDefault = () => {
        if (typeof poolStorage.coveragePool === "object") {
            let iTokenPoolSize = poolStorage.coveragePool.toNumber();
            let iTokenTotalSupply = iTokenStorage.totalSupply.toNumber();
            let temp = (iTokenPoolSize * 100) / iTokenTotalSupply;
            let coverTokenValue = (temp * userITokenBalance) / 100;
            enqueueSnackbar(
                `In event of Default you get ${coverTokenValue} kUSD`,
                {
                    variant: "info",
                    autoHideDuration: 4000,
                    anchorOrigin: {
                        vertical: "top",
                        horizontal: "left",
                    },
                }
            );
        }
    };
    const onExpiry = () => {
        if (typeof poolStorage.coveragePool === "object") {
            let oTokenPoolSize = poolStorage.premiumPool.toNumber();
            let oTokenTotalSupply = oTokenStorage.totalSupply.toNumber();
            let temp = (oTokenPoolSize * 100) / oTokenTotalSupply;
            let premiumTokenValue = (temp * userOTokenBalance) / 100;
            enqueueSnackbar(
                `In event of Expiry you get ${premiumTokenValue} kUSD`,
                {
                    variant: "info",
                    autoHideDuration: 4000,
                    anchorOrigin: {
                        vertical: "top",
                        horizontal: "left",
                    },
                }
            );
        }
    };

    const headers = ["id", "pool", "Default", "CoverToken", "PremiumToken"];

    return (
        <div className="leftComponent traders">
            <h1 className="sectionTitle"> Your Dashboard </h1>
            <Table
                name="tradersDashboard"
                rows={rows}
                header={headers}
                callback={callback}
                headerLength={headers.length}
                loading={loading}
            />
            <div style={{ display: 'flex', flexDirection: 'row', marginTop: '10px' }}>
                <h2 className="sectionTitle" style={{ marginLeft: "0", marginRight: "8px", alignSelf: 'center' }}> Predict 🤑 In: </h2>
                <div>
                    <button
                        className="button"
                        style={{ marginLeft: "0", marginRight: "8px" }}
                        onClick={onDefault}
                    >
                        <span>Default Event</span>
                    </button>
                    <button
                        className="button"
                        style={{ marginLeft: "0" }}
                        onClick={onExpiry}
                    >
                        <span>Expiry Event</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TraderDashboard;
