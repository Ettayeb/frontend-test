import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import DashboardLayout from "./layouts/Dashboard/Dashboard.js";
import AuthLayout from "./layouts/Auth/Auth.js";
ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
            <Route path="/" render={(props) => <DashboardLayout {...props} />} />
        </Switch>
    </BrowserRouter>,
    document.getElementById("root")
);
