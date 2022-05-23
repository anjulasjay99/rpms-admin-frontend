import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { Link, useNavigate } from "react-router-dom";
import * as styles from "../../assets/css/styles.module.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import {
  FaFileAlt,
  FaFileSignature,
  FaFileUpload,
  FaUserCheck,
  FaUsers,
  FaUserAlt,
} from "react-icons/fa";
import bg from "../../assets/images/loginBgnew.jpg";
import BreadCrumb from "../shared/BreadCrumb";
import { NavCard } from "../../assets/css/NavCard.styled";
import { ParentDiv } from "../../assets/css/ParentDiv.styled";

function Home() {
  const navigate = useNavigate();
  const links = [
    {
      name: "Home",
      path: "/home",
    },
  ];
  const [lognActivities, setlognActivities] = useState([]);

  const fecthLoginActivities = async () => {
    await fetch("http://localhost:8070/loginactivities", {
      method: "GET",
      headers: {
        "x-access-token": sessionStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((res) => [setlognActivities(res)])
      .catch((err) => {
        alert(err);
      });
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }

    setTimeout(() => {
      fecthLoginActivities();
    }, 1000);
  }, []);

  return (
    <ParentDiv>
      <Container
        style={{
          background: "white",
          position: "absolute",
          top: "25px",
          bottom: 0,
          left: "50px",
          right: "50px",
        }}
      >
        <BreadCrumb links={links}></BreadCrumb>
        <h2>Home</h2>
        <br />
        <Row>
          <Col xs={12}>
            <h5>Navigation</h5>
          </Col>
          <Col lg={2} md={3} sm={6}>
            <NavCard onClick={() => navigate("/submission-types")}>
              <FaFileUpload style={{ fontSize: "24px" }} />

              <label style={{ fontSize: "16px", marginLeft: "5px" }}>
                Submission Types
              </label>
            </NavCard>
          </Col>
          <Col lg={2} md={3} sm={6}>
            <NavCard onClick={() => navigate("/templates")}>
              <FaFileAlt style={{ fontSize: "24px" }} />

              <label style={{ fontSize: "16px", marginLeft: "5px" }}>
                Templates
              </label>
            </NavCard>
          </Col>
          <Col lg={2} md={3} sm={6}>
            <NavCard onClick={() => navigate("/marking-schemes")}>
              <FaFileSignature style={{ fontSize: "24px" }} />

              <label style={{ fontSize: "16px", marginLeft: "5px" }}>
                Marking Schemes
              </label>
            </NavCard>
          </Col>
          <Col lg={2} md={3} sm={6}>
            <NavCard onClick={() => navigate("/assign-panels")}>
              <FaUserCheck style={{ fontSize: "24px" }} />

              <label style={{ fontSize: "16px", marginLeft: "5px" }}>
                Assign Panels
              </label>
            </NavCard>
          </Col>

          <Col lg={2} md={3} sm={6}>
            <NavCard onClick={() => navigate("/users")}>
              <FaUserAlt style={{ fontSize: "24px" }} />

              <label style={{ fontSize: "16px", marginLeft: "5px" }}>
                Users
              </label>
            </NavCard>
          </Col>
          <Col lg={2} md={3} sm={6}>
            <NavCard onClick={() => navigate("/roles")}>
              <FaUsers style={{ fontSize: "24px" }} />

              <label style={{ fontSize: "16px", marginLeft: "5px" }}>
                Roles
              </label>
            </NavCard>
          </Col>
        </Row>
        <br />
        <br />
        <Row>
          <Col xs={12}>
            <h5>Quick Links</h5>
          </Col>
          <Col lg={2} md={3} sm={6} xs={12}>
            <Link
              style={{ textDecoration: "none" }}
              to="/create-submission-type"
            >
              Create Submission Type
            </Link>
          </Col>
          <Col lg={2} md={3} sm={6} xs={12}>
            <Link style={{ textDecoration: "none" }} to="/upload-template">
              Upload Template
            </Link>
          </Col>
          <Col lg={2} md={3} sm={6} xs={12}>
            <Link
              style={{ textDecoration: "none" }}
              to="/create-marking-scheme"
            >
              Create Marking Schemes
            </Link>
          </Col>
        </Row>
        <br />
        <br />
        <Row>
          <Col xs={12}>
            <h5>Log In Activity</h5>
          </Col>
          <Col xs={12}>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Date & Time</th>
                </tr>
              </thead>
              <tbody>
                {lognActivities.map((data, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{data.name}</td>
                      <td>{data.email}</td>
                      <td>{data.dateAndTime}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
      <br />
    </ParentDiv>
  );
}

export default Home;
