import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "../../assets/css/styles.module.css";
import Container from "react-bootstrap/Container";
import { useNavigate, useLocation } from "react-router-dom";
import BreadCrumb from "../shared/BreadCrumb";

function EditUser() {
  const location = useLocation();
  const navigate = useNavigate();
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [telNo, settelNo] = useState(0);
  const [role, setrole] = useState("");
  const [password, setpassword] = useState("");

  const links = [
    {
      name: "Home",
      path: "/home",
    },
    {
      name: "Users",
      path: "/users",
    },
    {
      name: "Edit User",
      path: "/edit-user",
    },
  ];

  const onSave = (e) => {
    e.preventDefault();
    if (role.toLocaleLowerCase() === "admin") {
      updateAdmin();
    } else if (role.toLocaleLowerCase() === "student") {
      updateStudent();
    } else {
      updateStaffMember();
    }
  };

  //update admin user
  const updateAdmin = () => {
    const user = {
      firstName,
      lastName,
      email,
      telNo,
      password,
      role,
      dateCreated: location.state.user.dateCreated,
    };
    fetch(`http://localhost:8070/admins/${location.state.user._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": sessionStorage.getItem("token"),
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((res) => {
        alert("Success!");
        navigate("/users");
      })
      .catch((err) => alert(err));
  };

  //update staff
  const updateStaffMember = () => {
    const user = {
      firstName,
      lastName,
      sliitEmail: email,
      staffId: location.state.user.staffId,
      telNo: telNo,
      field: location.state.user.field,
      password: password,
    };
    fetch(`http://localhost:8070/staff/update/${location.state.user._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((res) => {
        alert("Success!");
        navigate("/users");
      })
      .catch((err) => alert(err));
  };

  //update student
  const updateStudent = () => {
    const user = {
      firstName,
      lastName,
      sliitEmail: email,
      staffId: location.state.user.staffId,
      telNo: telNo,
      field: location.state.user.field,
      password: password,
    };
    fetch(`http://localhost:8070/students/${location.state.user._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((res) => {
        alert("Success!");
        navigate("/users");
      })
      .catch((err) => alert(err));
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
    console.log(location.state.user);
    setrole(location.state.user.role);
    setfirstName(location.state.user.firstName);
    setlastName(location.state.user.lastName);
    settelNo(location.state.user.telNo);
    setpassword(location.state.user.password);

    if (role.toLocaleLowerCase() === "admin") {
      setemail(location.state.user.email);
    } else if (role.toLocaleLowerCase() === "student") {
      setemail(location.state.user.email);
    } else {
      setemail(location.state.user.sliitEmail);
    }
  }, []);

  return (
    <div>
      <Container>
        <BreadCrumb links={links}></BreadCrumb>
        <br />
        <Row>
          <Col>
            <h2>Edit User</h2>
          </Col>
        </Row>
        <br />

        <Form>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setfirstName(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setlastName(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Telephone No.</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Telephone No."
                  value={telNo}
                  onChange={(e) => settelNo(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="text"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="align-items-end">
            <Col lg={12}>
              <Button
                variant="primary"
                style={{ float: "right" }}
                onClick={(e) => onSave(e)}
              >
                Save Changes
              </Button>
              <Button
                variant="secondary"
                style={{ marginRight: "5px", float: "right" }}
              >
                Cancel
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
}

export default EditUser;
