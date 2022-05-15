import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";
import jsonwebtoken from "jsonwebtoken";
import { FaUserAlt, FaKey, FaBookReader } from "react-icons/fa";
import { FcReading } from "react-icons/fc";
import bg from "../../assets/images/loginBgnew.jpg";

//styles
const outerDiv = {
  position: "absolute",
  top: 0,
  bottom: 0,
  right: 0,
  left: 0,
  backgroundImage: `url(${bg})`,
  backgeoundSize: "cover",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

const childDiv = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "380px",
  height: "400px",
  background: "white",
  borderRadius: "10px",
  padding: "5px",
  boxShadow:
    "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;",
};

const mainIcon = {
  transform: "scale(4)",
  marginBottom: "30px",
};

function Login({ setUser, setLogin }) {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setloading] = useState(false);

  //login using email and password
  const login = (e) => {
    e.preventDefault();
    setloading(true);
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
          setUser(jsonwebtoken.decode(res.user));
          setLogin(false);
          setloading(false);
          navigate("/home");
        } else {
          alert(res.message);
        }
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
        alert("ERROR!");
      });
  };

  useEffect(() => {
    setLogin(true);
  }, []);

  return (
    <div style={outerDiv}>
      <div style={childDiv}>
        <Container>
          <Row>
            <Col>
              <center>
                <FcReading style={mainIcon} />
              </center>
            </Col>
          </Row>
          <Row>
            <Col>
              <center>
                <h3>Log In</h3>
                <label>Log in with your admin account</label>
              </center>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">
                  <FaUserAlt />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                />
              </InputGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">
                  <FaKey />
                </InputGroup.Text>
                <Form.Control
                  type="password"
                  placeholder="Passowrd"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                />
              </InputGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button
                style={{ width: "100%", marginBottom: "15px" }}
                onClick={(e) => login(e)}
              >
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  hidden={!loading}
                />
                Log In
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <center>
                <label style={{ fontSize: "14px" }}>
                  Forgot your credentials? &nbsp; <a href="#">Get help</a>
                </label>
              </center>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Login;
