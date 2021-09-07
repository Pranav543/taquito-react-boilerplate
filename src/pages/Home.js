import React, { Component } from "react";

import SuperExchange_Logo from "../assets/SuperExchange_Logo_Circle.png";


import "../App.css";

const Home = () => {
    return (
        <div className="homePage">
            <img className="logoHomePage" alt="Logo" src={SuperExchange_Logo} />
            <br />
            <h1 className="appLine" style={{ textAlign: "center" }}>
                Streaming Liquidity
            </h1>
        </div>
    );
};

export default Home;
