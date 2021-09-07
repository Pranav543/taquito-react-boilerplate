import React, { useState } from "react";
import Table from "./Table";

const TraderDashboard = () => {
    const [rows, setRows] = useState([
        { id: 1, pool: "AAVE Protocol", Default: "No", IToken: 0, OToken: 0 },
    ]);

    const [headers, setHeaders] = useState([
        "id",
        "pool",
        "Default",
        "IToken",
        "OToken",
    ]);

    return (
        <div className="leftComponent traders">
            <h1 className="sectionTitle"> Traders </h1>
            <Table
                name="tradersDashboard"
                rows={rows}
                header={headers}
                headerLength={headers.length}
            />
        </div>
    );
};

export default TraderDashboard;
