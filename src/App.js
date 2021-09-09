import React, { useState } from "react";
import { TezosToolkit } from "@taquito/taquito";
import Navigation from "./pages/Navigation";
import Main from "./pages/Main";

import "./App.scss";

export const TezosStuffContext = React.createContext("tezosStuff");

const App = () => {
    const [Tezos, setTezos] = useState(
        new TezosToolkit("https://api.tez.ie/rpc/granadanet")
    );
    const [wallet, setWallet] = useState(null);
    const [userAddress, setUserAddress] = useState("");
    const [userBalance, setUserBalance] = useState(0);
    const [userITokenBalance, setUserITokenBalance] = useState(0);
    const [userOTokenBalance, setUserOTokenBalance] = useState(0);
    const [poolContract, setPoolContract] = useState(undefined);
    const [poolStorage, setPoolStorage] = useState(0);
    const [iTokenContract, setITokenContract] = useState(undefined);
    const [iTokenStorage, setITokenStorage] = useState(0);
    const [oTokenContract, setOTokenContract] = useState(undefined);
    const [oTokenStorage, setOTokenStorage] = useState(0);
    const [kUSDContract, setKUSDContract] = useState(undefined);
    const [kUSDStorage, setKUSDStorage] = useState(0);
    const [beaconConnection, setBeaconConnection] = useState(false);
    const [publicToken, setPublicToken] = useState("");

    const iTokenAddress = "KT1GH5tnMqtyQgAn1eMK4Mh1H6EcwgZS6tXi";
    const oTokenAddress = "KT1KkEF9jzsaQfNoDyRtJxRvhpVC1QLhRXPQ";
    const kUSDAddress = "KT1ACn9ksAgs3sP4rnwCeMN2trDPYFxKq4gg";
    const poolAddress = "KT1DUiy8DckvTngcftUsySXn6X5ipYns5Jsh";
    const contractAddress = "KT1K3XVNzsmur7VRgY8CAHPUENaErzzEpe4e";

    // const iTokenAddress = "KT1AfnV1XJJ1VnSdxaAMiHXGV6vQduKoYMBt";
    // const oTokenAddress = "KT1UXwQAFeGNt6vo6i8x5eoLqG6dtpVq5qYr";
    // const kUSDAddress = "KT1ACn9ksAgs3sP4rnwCeMN2trDPYFxKq4gg";
    // const poolAddress = "KT1DQRvcdq7sF4cDVkiAcGfXCN2L25c6DfuV";

    return (
        <div className="app">
            <TezosStuffContext.Provider
                value={{
                    Tezos,
                    setTezos,
                    wallet,
                    setWallet,
                    userAddress,
                    setUserAddress,
                    userBalance,
                    setUserBalance,
                    poolContract,
                    poolStorage,
                    setPoolStorage,
                    setPoolContract,
                    iTokenContract,
                    setITokenContract,
                    iTokenStorage,
                    setITokenStorage,
                    oTokenContract,
                    setOTokenContract,
                    oTokenStorage,
                    setOTokenStorage,
                    kUSDContract,
                    setKUSDContract,
                    kUSDStorage,
                    setKUSDStorage,
                    beaconConnection,
                    setBeaconConnection,
                    publicToken,
                    setPublicToken,
                    userITokenBalance,
                    setUserITokenBalance,
                    userOTokenBalance,
                    setUserOTokenBalance,
                }}
            >
                <Navigation
                    poolAddress={poolAddress}
                    iTokenAddress={iTokenAddress}
                    oTokenAddress={oTokenAddress}
                    kUSDAddress={kUSDAddress}
                    contractAddress={contractAddress}
                />
                <Main poolAddress={poolAddress} />
            </TezosStuffContext.Provider>
        </div>
    );
};

export default App;
