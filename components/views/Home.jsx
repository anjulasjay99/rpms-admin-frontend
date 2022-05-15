import React, { useEffect } from "react";
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

const card = {
  height: "80px",
  background: "white",
  borderRadius: "5px",
  border: "1px solid #ccc",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  padding: "20px",
};

const parentDiv = {
  backgroundImage: `url(${bg})`,
  position: "absolute",
  top: "50px",
  bottom: 0,
  right: 0,
  left: 0,
};

const parentCont = {
  background: "white",
  position: "absolute",
  top: "30px",
  bottom: "30px",
  right: "50px",
  left: "50px",
};

function Home() {
  const navigate = useNavigate();
  const links = [
    {
      name: "Home",
      path: "/home",
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
        <h2>Home</h2>
        <br />
        <Row>
          <Col xs={12}>
            <h5>Navigation</h5>
          </Col>
          <Col lg={2} md={3} sm={6}>
            <div
              style={card}
              onClick={() => navigate("/submission-types")}
              className="card"
            >
              <FaFileUpload style={{ fontSize: "24px" }} />

              <label style={{ fontSize: "16px", marginLeft: "5px" }}>
                Submission Types
              </label>
            </div>
          </Col>
          <Col lg={2} md={3} sm={6}>
            <div style={card} onClick={() => navigate("/templates")}>
              <FaFileAlt style={{ fontSize: "24px" }} />

              <label style={{ fontSize: "16px", marginLeft: "5px" }}>
                Templates
              </label>
            </div>
          </Col>
          <Col lg={2} md={3} sm={6}>
            <div style={card} onClick={() => navigate("/marking-schemes")}>
              <FaFileSignature style={{ fontSize: "24px" }} />

              <label style={{ fontSize: "16px", marginLeft: "5px" }}>
                Marking Schemes
              </label>
            </div>
          </Col>
          <Col lg={2} md={3} sm={6}>
            <div style={card} onClick={() => navigate("/assign-panels")}>
              <FaUserCheck style={{ fontSize: "24px" }} />

              <label style={{ fontSize: "16px", marginLeft: "5px" }}>
                Assign Panels
              </label>
            </div>
          </Col>

          <Col lg={2} md={3} sm={6}>
            <div style={card} onClick={() => navigate("/edit-user")}>
              <FaUserAlt style={{ fontSize: "24px" }} />

              <label style={{ fontSize: "16px", marginLeft: "5px" }}>
                Users
              </label>
            </div>
          </Col>
          <Col lg={2} md={3} sm={6}>
            <div style={card} onClick={() => navigate("/roles")}>
              <FaUsers style={{ fontSize: "24px" }} />

              <label style={{ fontSize: "16px", marginLeft: "5px" }}>
                Roles
              </label>
            </div>
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
                  <th>Username/ Email</th>
                  <th>Date</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>@mdo</td>
                  <td>@twitter</td>
                  <td>@mdo</td>
                  <td>@mdo</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
      <br />
    </div>
  );
}

export default Home;
