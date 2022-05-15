import React, { useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "../../assets/css/styles.module.css";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";
import BreadCrumb from "../shared/BreadCrumb";

function EditUser() {
  const navigate = useNavigate();
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
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/login");
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
        <Row>
          <Col>
            <Image src="https://via.placeholder.com/150" fluid={true} />
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <Button variant="primary" style={{ marginRight: "5px" }}>
              Upload
            </Button>
            <Button variant="outline-danger">Delete</Button>
          </Col>
        </Row>
        <br />

        <Form>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" placeholder="First Name" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" placeholder="Last Name" />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="name@example.com" />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Username" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Role</Form.Label>
                <Form.Select>
                  <option value="admin">Admin</option>
                  <option value="staff">Staff</option>
                  <option value="student">Student</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row className="align-items-end">
            <Col lg={12}>
              <Button
                variant="primary"
                type="submit"
                style={{ float: "right" }}
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
