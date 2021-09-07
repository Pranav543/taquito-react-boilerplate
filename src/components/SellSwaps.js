import React, { useState, useContext } from "react";
import { OpKind } from "@taquito/taquito";
import { TezosStuffContext } from "../App";

import "../App.css";

const SellSwaps = ({ poolAddress }) => {
    const {
        Tezos,
        userAddress,
        setPoolStorage,
        setKUSDStorage,
        setUserBalance,
        kUSDContract,
        poolContract,
    } = useContext(TezosStuffContext);

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

            setUserBalance(await Tezos.tz.getBalance(userAddress));
        } catch (error) {
            console.log(error);
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

            <h2 className="sectionTitle">
                You Will Receive : {paymentTokenAmount} OToken
            </h2>
            <input className="submitButton" type="submit" value="Trade" />
        </form>
    );
};

export default SellSwaps;
