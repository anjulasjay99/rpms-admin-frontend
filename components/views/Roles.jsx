import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";
import BreadCrumb from "../shared/BreadCrumb";

function Roles() {
  const navigate = useNavigate();
  const [roles, setroles] = useState([]);
  const links = [
    {
      name: "Home",
      path: "/home",
    },
    {
      name: "Roles",
      path: "/roles",
    },
  ];

  const fetchRoles = async () => {
    await fetch("http://localhost:8070/roles", {
      method: "GET",
      headers: {
        "x-access-token": sessionStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((response) => setroles(response))
      .catch((err) => {
        alert(err);
      });
  };
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
    fetchRoles();
  }, []);

  return (
    <div>
      <Container>
        <BreadCrumb links={links}></BreadCrumb>
        <div>
          <br />
          <Row>
            <Col>
              <h2>Roles</h2>
            </Col>
          </Row>
          <br />
          <Row>
            <Col lg={3}>
              <div className="d-flex">
                <InputGroup>
                  <FormControl placeholder="Search here" />
                </InputGroup>
              </div>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <Table striped responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Role</th>
                    <th>Permission Level</th>
                    <th>Total Users</th>
                  </tr>
                </thead>
                <tbody>
                  {roles.map((role) => {
                    return (
                      <tr>
                        <td>{roles.indexOf(role) + 1}</td>
                        <td>{role.role}</td>
                        <td>{role.permissionLevel}</td>
                        <td>{role.totalUsers}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}

export default Roles;
