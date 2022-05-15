import React, { useEffect, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaUserAlt, FaKey, FaBookReader } from "react-icons/fa";

function Header({ user }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [show, setshow] = useState(true);

  useEffect(() => {
    if (location.pathname === "/login") {
      setshow(false);
    } else {
      setshow(true);
    }
    console.log(user);
  }, [location]);

  const logout = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
  };
  if (!show) {
    return <></>;
  } else {
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
                <NavDropdown
                  id="nav-dropdown-light-example"
                  title={user.email}
                  menuVariant="light"
                >
                  <NavDropdown.Item disabled>
                    <div>
                      <FaUserAlt style={{ transform: "scale(1.5)" }} />
                      &nbsp;
                      {user.firstName + " " + user.lastName}
                      <br />
                      <label style={{ fontSize: "14px", color: "gray" }}>
                        {user.email}
                      </label>
                    </div>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logout}>Log Out</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

export default Header;
