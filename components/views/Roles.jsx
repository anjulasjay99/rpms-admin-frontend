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
  const [keyword, setkeyword] = useState("");
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
  const [adminCount, setadminCount] = useState(0);
  const [studentCount, setstudentCount] = useState(0);
  const [staffCount, setstaffCount] = useState(0);

  //get admin count
  const getTotalAdminUsers = async () => {
    await fetch("https://rpms-backend.herokuapp.com/admins/totalusers")
      .then((res) => res.json())
      .then((res) => {
        setadminCount(res.total);
      });
  };

  //get student count
  const getTotalStudentUsers = async () => {
    await fetch("https://rpms-backend.herokuapp.com/students/totalusers")
      .then((res) => res.json())
      .then((res) => {
        setstudentCount(res.total);
      });
  };

  //get staff count
  const getTotalStaffUsers = async () => {
    await fetch("https://rpms-backend.herokuapp.com/staff/totalusers")
      .then((res) => res.json())
      .then((res) => {
        setstaffCount(res.total);
      });
  };

  const getUserCountForRole = (role) => {
    if (role.trim().toLowerCase() === "admin") {
      return adminCount;
    } else if (role.trim().toLowerCase() === "student") {
      return studentCount;
    } else {
      return staffCount;
    }
  };

  //fetch user roles
  const fetchRoles = async () => {
    await fetch("https://rpms-backend.herokuapp.com/roles", {
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
    getTotalAdminUsers();
    getTotalStudentUsers();
    getTotalStaffUsers();
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
                  <FormControl
                    placeholder="Search here"
                    value={keyword}
                    onChange={(e) => setkeyword(e.target.value)}
                  />
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
                  {roles
                    .filter((role) => {
                      if (keyword !== "") {
                        if (
                          role.role
                            .trim()
                            .toLowerCase()
                            .includes(keyword.trim().toLowerCase())
                        ) {
                          return role;
                        }
                      } else {
                        return role;
                      }
                    })
                    .map((role) => {
                      return (
                        <tr>
                          <td>{roles.indexOf(role) + 1}</td>
                          <td>{role.role}</td>
                          <td>{role.permissionLevel}</td>
                          <td>{getUserCountForRole(role.role)}</td>
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
