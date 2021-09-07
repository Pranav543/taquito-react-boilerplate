import { Switch, Route } from "react-router-dom";

import Home from "./Home";
import Portal from "./Portal";

const Main = ({ poolAddress }) => {
    return (
        <Switch>
            {/* The Switch decides which component to show based on the current URL.*/}
            <Route exact path="/" component={Home}></Route>
            {/* <Route exact path='/portal' component={Portal}></Route> */}
            <Route
                exact
                path="/portal"
                render={() => <Portal poolAddress={poolAddress} />}
            ></Route>
        </Switch>
    );
};

export default Main;
