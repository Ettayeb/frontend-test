import React, { useEffect, useState } from "react";
// reactstrap components
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";
import logo from "./../../assets/img/logo.png";

import AuthService from "../../services/auth.service";

function DashboardNavbar(props) {
    const [isOpen, setIsOpen] = useState(false);

    const user = AuthService.getUser();
    // const userName = user.firstName + user.lastName;
    useEffect(() => {
        if (!user) {
            props.history.push("/auth/login");
        }
    }, []);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    const logout = () => {
        AuthService.logout();
        props.history.push("/auth/login");
    };

    return (
        <>
            <Navbar light expand="md">
                <NavbarBrand href="/">
                    <img width="150px" height="auto" src={logo}></img>
                </NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink href="/profile/">Profile</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink onClick={logout}>LogOut</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </>
    );
}

export default DashboardNavbar;
