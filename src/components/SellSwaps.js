import React, { useState, useContext } from "react";
import { OpKind } from "@taquito/taquito";
import { TezosStuffContext } from "../App";
import { useSnackbar } from 'notistack';


import "../App.scss";

const SellSwaps = ({ poolAddress }) => {
    const {
        Tezos,
        userAddress,
        setPoolStorage,
        setKUSDStorage,
        setUserBalance,
        kUSDContract,
        poolContract,
        oTokenContract,
        setOTokenStorage,
        setUserITokenBalance,
        setUserOTokenBalance,
        iTokenStorage,
        oTokenStorage,
    } = useContext(TezosStuffContext);

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();


    const [paymentTokenAmount, setPaymentTokenAmount] = useState("");

    const [loading, setLoading] = useState(false);

    const sellSwap = async () => {
        setLoading(true);
        const batchT = [];
        batchT.push({
            kind: OpKind.TRANSACTION,
            ...poolContract.methods
                .sellCoverage(paymentTokenAmount)
                .toTransferParams(),
        });
        batchT.push({
            kind: OpKind.TRANSACTION,
            ...poolContract.methods.setPremiumTokenSupply(1).toTransferParams(),
        });
        try {
            // const op = await kUSDContract.methods
            //     .approve(poolAddress, 100000)
            //     .send();
            // await op.confirmation();
            // const newStorage = await kUSDContract.storage();
            // if (newStorage) setKUSDStorage(newStorage);

            // const op2 = await poolContract.methods
            //     .sellCoverage(paymentTokenAmount)
            //     .send();
            // await op2.confirmation();
            // const newStorage2 = await poolContract.storage();
            // if (newStorage2) setPoolStorage(newStorage2);

            // const op2 = await poolContract.methods
            //     .setPremiumTokenSupply(1)
            //     .send();
            // await op2.confirmation();
            // const newStorage2 = await poolContract.storage();
            // if (newStorage2) setPoolStorage(newStorage2);
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

            enqueueSnackbar('Transaction Successful', {
                variant: 'success',
                autoHideDuration: 4000,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'left',
                }
            });

            setUserBalance(await Tezos.tz.getBalance(userAddress));
        } catch (error) {
            console.log(error);
            enqueueSnackbar(`${error.message}`, {
                variant: 'error',
                autoHideDuration: 4000,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'left',
                }
            });
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        sellSwap();
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                className="inputText"
                style={{ textAlign: "center" }}
                type="text"
                value={paymentTokenAmount}
                placeholder="Enter Amount"
                onChange={(e) => {
                    setPaymentTokenAmount(e.target.value);
                }}
            />

            <h2 className="extraInfo">
                You Will Receive : {paymentTokenAmount} OToken
            </h2>
            <button
                className="button"
                disabled={loading}
                onClick={handleSubmit}
            >
                {loading ? (
                    <span style={{ fontWeight: "bold" }}>
                        <i className="fas fa-spinner fa-spin"></i>&nbsp; Please
                        wait
                    </span>
                ) : (
                    <span style={{ fontWeight: "bold" }}>Trade</span>
                )}
            </button>
        </form>
    );
};

export default SellSwaps;
