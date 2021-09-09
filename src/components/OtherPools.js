import React, { Component } from "react";
import Table from "./Table";

const OtherPools = () => {
    const header = ["id", "Pool", "Expiry", "CoverPoolSize", "PremiumPoolSize"];

    const headerLength = 5;
    const rows = [
        {
            id: 1,
            Pool: "Maple Finance",
            Expiry: "10 Feb 22",
            CoverPoolSize: "$1.5 Mil",
            PremiumPoolSize: "$1.1 Mil",
        },
        {
            id: 2,
            Pool: "GoldFinch Finance",
            Expiry: "18 Aug 22",
            CoverPoolSize: "$8.5 Mil",
            PremiumPoolSize: "$7.1 Mil",
        },
        {
            id: 3,
            Pool: "Compound Finance",
            Expiry: "15 Dec 21",
            CoverPoolSize: "$980 K",
            PremiumPoolSize: "$850 K",
        },
    ];

    return (
        <div className="rightComponent lProviders">
            <h1 className="sectionTitle"> Other Active Pools </h1>
            <Table
                name="lProviders"
                rows={rows}
                header={header}
                headerLength={headerLength}
            />
        </div>
    );
};

export default OtherPools