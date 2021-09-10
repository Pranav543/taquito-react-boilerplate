import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import ConnectButton from "./../components/ConnectButton";
import DisconnectButton from "./../components/DisconnectWallet";
import { TezosStuffContext } from "../App";

import OmniSwapLogo from "../assets/omni-swap2.png"
import "../App.scss";

const Navigation = ({
    poolAddress,
    iTokenAddress,
    oTokenAddress,
    kUSDAddress,
    contractAddress,
}) => {
    const { userAddress } = useContext(TezosStuffContext);
    return (
        <div className="header">
            <img className="logo" alt="Logo" src={OmniSwapLogo}></img>
            <h1 className="appName">
                <NavLink exact activeClassName="currentPage" to="/">
                    Omni-Swap
                </NavLink>
            </h1>
            <nav className="homeNavigationBar">
                <ul>
                    <li>
                        <NavLink
                            exact
                            activeClassName="currentPage"
                            to="/portal"
                        >
                            Trade
                        </NavLink>
                    </li>
                    <li>
                        {!userAddress ? (
                            <ConnectButton
                                poolAddress={poolAddress}
                                iTokenAddress={iTokenAddress}
                                oTokenAddress={oTokenAddress}
                                kUSDAddress={kUSDAddress}
                                contractAddress={contractAddress}
                            />
                        ) : (
                            <DisconnectButton />
                        )}
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Navigation;
