import React, { useState, useContext } from "react";
import Table from "./Table";
import { OpKind } from "@taquito/taquito";
import { TezosStuffContext } from "../App";

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
    } = useContext(TezosStuffContext);

    const [isDefault, setDefault] = useState(true);
    const [loading, setLoading] = useState(false);

    const rows = [
        {
            id: 1,
            pool: "AAVE Protocol",
            Default: isDefault ? "Yes" : "No",
            IToken: userITokenBalance,
            OToken: userOTokenBalance,
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

            setUserBalance(await Tezos.tz.getBalance(userAddress));
        } catch (error) {
            console.log(error);
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

    const headers = ["id", "pool", "Default", "IToken", "OToken"];

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
        </div>
    );
};

export default TraderDashboard;
