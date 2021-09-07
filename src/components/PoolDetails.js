import React, { useContext } from "react";
import Table from "./Table";
import { TezosStuffContext } from "../App";

const PoolDetails = () => {
    const { poolStorage } = useContext(TezosStuffContext);

    let iTokenPoolSize = 0;
    let oTokenPoolSize = 0;

    if (typeof poolStorage.coveragePool === "object") {
        iTokenPoolSize = poolStorage.coveragePool.toNumber();
        oTokenPoolSize = poolStorage.premiumPool.toNumber();
    }
    let rows = [
        {
            id: 1,
            Expiry: "IN",
            Default: "No",
            IToken: iTokenPoolSize,
            OToken: oTokenPoolSize,
        },
    ];
    let headers = ["id", "Expiry", "Default", "IToken", "OToken"];

    return (
        <div className="rightComponent lPool">
            <h1 className="sectionTitle"> Pool Details</h1>
            <Table
                name="PoolDetails"
                rows={rows}
                header={headers}
                headerLength={headers.length}
            />
        </div>
    );
};

export default PoolDetails;
