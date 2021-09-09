import React from "react";

import TradeForm from "../components/TradeForm";
import TraderDashboard from "../components/TraderDashboard";
import OtherPools from "../components/OtherPools";
import PoolDetails from "../components/PoolDetails";

import "../App.scss";

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
                <OtherPools />
            </div>
        </div>
    );
};

export default Portal;
