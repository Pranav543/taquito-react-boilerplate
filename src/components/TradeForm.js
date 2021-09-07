import React from "react";
import { Tab, Tabs } from "react-bootstrap";

import BuySwaps from "./BuySwaps";
import SellSwaps from "./SellSwaps";

import "../App.css";

const TradeForm = ({ poolAddress }) => {
    return (
        <div className="leftComponent userInput">
            <h1 className="sectionTitle"> Pool Name </h1>
            <Tabs
                defaultActiveKey="trader"
                transition={false}
                id="uncontrolled-tab-example"
                onSelect={(key) =>
                    console.log(`HANDLING TAB EVENT : ${key} selected`)
                }
            >
                <Tab eventKey="trader" title="BUY CDS" unmountOnExit={true}>
                    <BuySwaps poolAddress={poolAddress} />
                </Tab>
                <Tab eventKey="lProvider" title="SELL CDS" unmountOnExit={true}>
                    <SellSwaps poolAddress={poolAddress} />
                </Tab>
            </Tabs>
        </div>
    );
};

export default TradeForm;
