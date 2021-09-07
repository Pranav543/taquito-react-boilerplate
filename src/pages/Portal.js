import React from "react";

import TradeForm from "../components/TradeForm";
import TraderDashboard from "../components/TraderDashboard";
import LProviders from "../components/LProviders";
import PoolDetails from "../components/PoolDetails";

import "../App.css";

const Portal = ({ poolAddress }) => {
    return (
        <div>
            <div className="rowComp">
                <TradeForm poolAddress={poolAddress} />
                <PoolDetails />
            </div>
            <br />
            <div className="rowComp">
                <TraderDashboard />
                {/* <LProviders /> */}
            </div>
        </div>
    );
};

export default Portal;
