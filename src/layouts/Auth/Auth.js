import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
// reactstrap components
import { Container, Row } from "reactstrap";

import routes from "./../../routes.js";

class Auth extends React.Component {
    componentDidMount() {
        document.body.classList.add("bg-default");
    }
    componentWillUnmount() {
        document.body.classList.remove("bg-default");
    }
    getRoutes = (routes) => {
        return routes.map((prop, key) => {
            console.log(prop);
            if (prop.layout === "/auth") {
                return (
                    <Route
                        path={prop.layout + prop.path}
                        component={prop.component}
                        key={key}
                        exact
                    />
                );
            } else {
                return null;
            }
        });
    };

    render() {
        return (
            <>
                <div className="main-content ">
                    {/* Page content */}
                    <Container className="mt-5 pb-5">
                        <Row className="justify-content-center">
                            <Switch>
                                {this.getRoutes(routes)}
                                <Redirect from="*" to="/auth/login" />
                            </Switch>
                        </Row>
                    </Container>
                </div>
            </>
        );
    }
}

export default Auth;
