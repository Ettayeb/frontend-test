import React from "react";
import { Route, Switch } from "react-router-dom";
// reactstrap components
// core components
import DashboardNavbar from "./../../components/Navbars/DashboardNavbar.js";
import Index from "../../components/Dashboard/Index";

import routes from "./../../routes.js";

class Dashboard extends React.Component {
    componentDidUpdate() {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        this.refs.mainContent.scrollTop = 0;
    }
    getRoutes = (routes) => {
        return routes.map((prop, key) => {
            if (prop.layout === "/") {
                return (
                    <Route
                        path={prop.layout + prop.path}
                        component={prop.component}
                        key={key}
                        exact
                    />
                );
            } else {
                return <Route path={"/dashboard"} component={Index} key={key} />;
            }
        });
    };

    getBrandText = () => {
        for (let i = 0; i < routes.length; i++) {
            if (
                routes[i].show &&
                this.props.location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1
            ) {
                return routes[i].name;
            }
        }
        return "Brand";
    };
    render() {
        return (
            <>
                <div className="main-content" ref="mainContent">
                    <DashboardNavbar
                        {...this.props}
                        brandText={this.getBrandText(this.props.location.pathname)}
                    />
                    <Switch>{this.getRoutes(routes)}</Switch>
                </div>
            </>
        );
    }
}

export default Dashboard;
