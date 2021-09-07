import React, { useContext, useState, useEffect } from "react";
import { BeaconWallet } from "@taquito/beacon-wallet";
import {
    NetworkType,
    BeaconEvent,
    defaultEventCallbacks,
} from "@airgap/beacon-sdk";

import { TezosStuffContext } from "./../App";

const ConnectButton = ({
    poolAddress,
    iTokenAddress,
    oTokenAddress,
    kUSDAddress,
    contractAddress,
}) => {
    const {
        Tezos,
        wallet,
        setWallet,
        setUserAddress,
        setUserBalance,
        setPoolStorage,
        setPoolContract,
        setITokenContract,
        setITokenStorage,
        setOTokenContract,
        setOTokenStorage,
        setKUSDContract,
        setKUSDStorage,
        setBeaconConnection,
        setPublicToken,
    } = useContext(TezosStuffContext);

    const setup = async (userAddress) => {
        setUserAddress(userAddress);
        // updates balance
        const balance = await Tezos.tz.getBalance(userAddress);
        setUserBalance(balance.toNumber());

        const contract = await Tezos.wallet.at(contractAddress);
        const storage = await contract.storage();
        console.log("contract: ", contract);
        console.log("storage: ", storage);

        // creates poolContract instance
        const poolContract = await Tezos.wallet.at(poolAddress);
        const poolContractStorage = await poolContract.storage();
        setPoolContract(poolContract);
        setPoolStorage(poolContractStorage);

        const iTokenContract = await Tezos.wallet.at(iTokenAddress);
        const iTokenContractStorage = await iTokenContract.storage();
        setITokenContract(iTokenContract);
        setITokenStorage(iTokenContractStorage);

        const oTokenContract = await Tezos.wallet.at(oTokenAddress);
        const oTokenContractStorage = await oTokenContract.storage();
        setOTokenContract(oTokenContract);
        setOTokenStorage(oTokenContractStorage);

        const kUSDContract = await Tezos.wallet.at(kUSDAddress);
        const kUSDContractStorage = await kUSDContract.storage();
        setKUSDContract(kUSDContract);
        setKUSDStorage(kUSDContractStorage);
        console.log("poolContract: ", poolContract);
        console.log("poolContractStorage: ", poolContractStorage);
        console.log("iTokenContract: ", iTokenContract);
        console.log("iTokenContractStorage: ", iTokenContractStorage);
    };

    const connectWallet = async () => {
        try {
            await wallet.requestPermissions({
                network: {
                    type: NetworkType.GRANADANET,
                    rpcUrl: "https://api.tez.ie/rpc/granadanet",
                },
            });
            // gets user's address
            const userAddress = await wallet.getPKH();
            await setup(userAddress);
            setBeaconConnection(true);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        (async () => {
            // creates a wallet instance
            const wallet = new BeaconWallet({
                name: "Omni-Swap",
                preferredNetwork: NetworkType.GRANADANET,
                disableDefaultEvents: true, // Disable all events / UI. This also disables the pairing alert.
                eventHandlers: {
                    // To keep the pairing alert, we have to add the following default event handlers back
                    [BeaconEvent.PAIR_INIT]: {
                        handler: defaultEventCallbacks.PAIR_INIT,
                    },
                    [BeaconEvent.PAIR_SUCCESS]: {
                        handler: (data) => setPublicToken(data.publicKey),
                    },
                },
            });
            Tezos.setWalletProvider(wallet);
            setWallet(wallet);
            // checks if wallet was connected before
            const activeAccount = await wallet.client.getActiveAccount();
            if (activeAccount) {
                const userAddress = await wallet.getPKH();
                await setup(userAddress);
                setBeaconConnection(true);
            }
        })();
    }, []);

    return (
        <input
            className="connectButton"
            type="submit"
            onClick={connectWallet}
            value="Connect Wallet"
        />
    );
};

export default ConnectButton;
