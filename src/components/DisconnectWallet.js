import React, { Dispatch, useContext } from "react";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { TezosToolkit } from "@taquito/taquito";
import { TezosStuffContext } from "./../App";

const DisconnectButton = () => {
    const {
        setTezos,
        wallet,
        setWallet,
        setUserAddress,
        setUserBalance,
        setBeaconConnection,
        setPublicToken,
    } = useContext(TezosStuffContext);

    const disconnectWallet = async () => {
        //window.localStorage.clear();
        setUserAddress("");
        setUserBalance(0);
        setWallet(null);
        const tezosTK = new TezosToolkit("https://api.tez.ie/rpc/granadanet");
        setTezos(tezosTK);
        setBeaconConnection(false);
        setPublicToken(null);
        console.log("disconnecting wallet");
        if (wallet) {
            await wallet.client.removeAllAccounts();
            await wallet.client.removeAllPeers();
            await wallet.client.destroy();
        }
    };

    return (
        <input
            className="connectButton"
            type="submit"
            onClick={disconnectWallet}
            value="Disconnect Wallet"
        />
    );
};

export default DisconnectButton;
