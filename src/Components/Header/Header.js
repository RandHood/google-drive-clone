import React from "react";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from '../../Contexts/Auth';

export default function Header() {
    const { logout } = useAuth();
    const history = useHistory();

    function handleLogout() {
        logout();
        history.push("/login");
    }

    return (
        <Navbar bg="light" expand="sm">
            <Navbar.Brand as={Link} to="/">
                Google Drive Clone
            </Navbar.Brand>
            <Nav className="justify-content-end">
                <NavDropdown title="Name" id="basic-nav-dropdown">
                    <Button onClick={handleLogout}>Logout</Button>
                </NavDropdown>
            </Nav>
        </Navbar>
    )
}