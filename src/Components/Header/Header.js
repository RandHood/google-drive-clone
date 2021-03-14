import React, { useState } from "react";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from '../../Contexts/Auth';
import logo from '../../Assets/Images/logo.png';
import './Header.css';

export default function Header(props) {
    const { logout } = useAuth();
    const history = useHistory();

    function handleLogout() {
        logout();
        history.push("/login");
    }

    return (
        <Navbar className="header" bg="light" expand="lg">
            <Navbar.Brand as={Link} to="/">
                <img src={logo} className="logo" alt="logo"/>
                <span className="headerText">Drive Clone</span>
            </Navbar.Brand>
            <Nav className="rightSide">
                <NavDropdown className="userDropdown" title={props.name} id="basic-nav-dropdown">
                    {/* <NavDropdown.Item className="w-30">Action</NavDropdown.Item> */}
                    <NavDropdown.Item className="logout" onClick={handleLogout}>Logout</NavDropdown.Item>
                </NavDropdown>
            </Nav>
        </Navbar>
    )
}