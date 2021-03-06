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
import Spinner from "react-bootstrap/Spinner";

function EditUser() {
  const location = useLocation();
  const navigate = useNavigate();
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [telNo, settelNo] = useState(0);
  const [role, setrole] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setloading] = useState(false);
  const [InitName, setInitName] = useState("");

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

  //go back to previous page
  const onCancel = () => {
    navigate(-1);
  };

  const onSave = (e) => {
    e.preventDefault();
    if (
      firstName !== "" &&
      lastName !== "" &&
      email !== "" &&
      telNo !== "" &&
      password !== ""
    ) {
      if (role.toLocaleLowerCase() === "admin") {
        updateAdmin();
      } else if (role.toLocaleLowerCase() === "student") {
        updateStudent();
      } else {
        updateStaffMember();
      }
    } else {
      alert("Please fill all the fields!");
    }
  };

  //update admin user
  const updateAdmin = () => {
    setloading(true);
    const user = {
      firstName,
      lastName,
      email,
      telNo,
      password,
      role,
      dateCreated: location.state.user.dateCreated,
    };
    fetch(
      `https://rpms-backend.herokuapp.com/admins/${location.state.user._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": sessionStorage.getItem("token"),
        },
        body: JSON.stringify(user),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        setloading(false);
        alert("Success!");
        navigate("/users");
      })
      .catch((err) => {
        setloading(false);
        alert(err);
      });
  };

  //update staff
  const updateStaffMember = () => {
    setloading(true);
    const user = {
      firstName,
      lastName,
      sliitEmail: email,
      staffId: location.state.user.staffId,
      telNo: telNo,
      field: location.state.user.field,
      password: password,
    };
    fetch(
      `https://rpms-backend.herokuapp.com/staff/update/${location.state.user._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        setloading(false);
        alert("Success!");
        navigate("/users");
      })
      .catch((err) => {
        setloading(false);
        alert(err);
      });
  };

  //update student
  const updateStudent = () => {
    setloading(true);
    const user = {
      InitName,
      IdNumber: location.state.user.IdNumber,
      email,
      telNo: telNo,
      nic: location.state.user.nic,
      password: password,
      isGrouped: location.state.user.isGrouped,
    };
    fetch(`https://rpms-backend.herokuapp.com/students/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((res) => {
        setloading(false);
        alert("Success!");
        navigate("/users");
      })
      .catch((err) => {
        setloading(false);
        alert(err);
      });
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

    if (location.state.user.role.trim().toLowerCase() === "admin") {
      setemail(location.state.user.email);
    } else if (location.state.user.role.trim().toLowerCase() === "student") {
      setemail(location.state.user.email);
      setInitName(location.state.user.InitName);
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
          <Row hidden={role.toLowerCase() !== "student"}>
            <Col xs={12}>
              <Form.Group className="mb-3">
                <Form.Label>Name*</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="First Name"
                  value={InitName}
                  onChange={(e) => setInitName(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row hidden={role.toLowerCase() === "student"}>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>First Name*</Form.Label>
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
                <Form.Label>Last Name*</Form.Label>
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
                <Form.Label>Email address*</Form.Label>
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
                <Form.Label>Telephone No.*</Form.Label>
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
                <Form.Label>Password*</Form.Label>
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
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  hidden={!loading}
                />
                Save Changes
              </Button>
              <Button
                variant="secondary"
                style={{ marginRight: "5px", float: "right" }}
                onClick={onCancel}
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
