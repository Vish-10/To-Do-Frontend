import React from "react";
import { Navbar, Nav, Button } from 'react-bootstrap';

function NavBar(props){
    return(
        <Navbar bg="dark" variant = "dark">
            <Navbar.Brand href="#home">TO-DO</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Nav className = "me-auto">

            </Nav>
            <Nav>
                <Nav.Link eventkey = {1}>
                    {props.auth ? <Button variant="outline-danger" onClick={() => window.location.reload()}>Sign-out</Button> : ''}
                </Nav.Link>
            </Nav>
        </Navbar>
    );
}

export default NavBar;