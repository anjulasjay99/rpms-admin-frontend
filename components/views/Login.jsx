import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";
import jsonwebtoken from "jsonwebtoken";

function Login({ setUser }) {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  //login using email and password
  const login = (e) => {
    e.preventDefault();
    let user;
    fetch("http://localhost:8070/admins/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((res) => {
        //check if authentication was success
        if (res.auth) {
          sessionStorage.setItem("token", res.user);
          navigate("/home");
        } else {
          alert(res.message);
        }
      })
      .catch((err) => {
        alert("ERROR!");
      });
  };
  return (
    <div>
      <Container>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Control
                type="password"
                placeholder="Passowrd"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button onClick={(e) => login(e)}>Log In</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
