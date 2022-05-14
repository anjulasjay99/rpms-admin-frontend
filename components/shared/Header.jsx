import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { Link, useNavigate } from "react-router-dom";

function Header({ user }) {
  const navigate = useNavigate();
  const logout = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div>
      <Navbar bg="light" variant="light" expand="lg" fixed="top">
        <Container>
          <Navbar.Brand href="#home">Admin</Navbar.Brand>
          <Navbar.Toggle aria-controls="nav" />
          <Navbar.Collapse id="nav">
            <Nav className="me-auto">
              <Nav.Link to="/">Home</Nav.Link>
            </Nav>
            <Nav className="ml-auto">
              <Nav.Link onClick={logout}>Log Out</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
