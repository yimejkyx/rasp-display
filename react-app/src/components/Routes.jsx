import React from "react";
import {Route, Switch} from "react-router-dom";
import Menu from "./Menu";
import Gas from "./Gas";
import Crypto from "./Crypto";
import Settings from "./Settings";

const Routes = () => {
    return (
        <Switch>
            <Route
                exact
                path="/"
                component={Menu}
            />
            <Route
                exact
                path="/crypto"
                component={Crypto}
            />
            <Route
                exact
                path="/gas"
                component={Gas}
            />
            <Route
                exact
                path="/settings"
                component={Settings}
            />
            <Route
                component={Menu}
            />
        </Switch>
    );
};

export default Routes;
