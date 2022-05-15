import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import { Link, useNavigate } from "react-router-dom";
import * as styles from "../../assets/css/styles.module.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  FaFileAlt,
  FaFileSignature,
  FaFileUpload,
  FaUserCheck,
  FaUsers,
  FaUserAlt,
} from "react-icons/fa";

function Home() {
  const navigate = useNavigate();
  const card = {
    height: "300px",
    width: "300px",
    background: "whitesmoke",
    borderRadius: "5px",
    border: "1px solid #ccc",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <Container style={{ background: "white" }}>
        <h2>Home</h2>
        <br />
        {/* <Link to="/create-marking-scheme">Create Marking Scheme</Link> <br />
        <Link to="/create-submission-type">Create Submission Type</Link> <br />
        <Link to="/upload-template">Upload Template</Link>
        <br />
        <Link to="/edit-user">Edit User</Link>
        <br />
        <Link to="/submission-types">Submission Types</Link> <br />
        <Link to="/marking-schemes">Marking Schemes</Link>
        <br />
        <Link to="/templates">Templates</Link>
        <br />
        <Link to="/roles">Roles</Link>
        <br /> */}
        <Row>
          <Col lg={3}>
            <div
              style={card}
              onClick={() => navigate("/submission-types")}
              className={styles.homeCard}
            >
              <FaFileUpload style={{ fontSize: "56px" }} />

              <label style={{ fontSize: "24px" }}>Submission Types</label>
            </div>
          </Col>
          <Col lg={3}>
            <div style={card} onClick={() => navigate("/templates")}>
              <FaFileAlt style={{ fontSize: "56px" }} />

              <label style={{ fontSize: "24px" }}>Templates</label>
            </div>
          </Col>
          <Col lg={3}>
            <div style={card} onClick={() => navigate("/marking-schemes")}>
              <FaFileSignature style={{ fontSize: "56px" }} />

              <label style={{ fontSize: "24px" }}>Marking Schemes</label>
            </div>
          </Col>
          <Col lg={3}>
            <div style={card} onClick={() => navigate("/assign-panels")}>
              <FaUserCheck style={{ fontSize: "56px" }} />

              <label style={{ fontSize: "24px" }}>Assign Panels</label>
            </div>
          </Col>
        </Row>
        <br />
        <Row className="justify-content-md-center">
          <Col lg={3}>
            <div style={card} onClick={() => navigate("/edit-user")}>
              <FaUserAlt style={{ fontSize: "56px" }} />

              <label style={{ fontSize: "24px" }}>Users</label>
            </div>
          </Col>
          <Col lg={3}>
            <div style={card} onClick={() => navigate("/roles")}>
              <FaUsers style={{ fontSize: "56px" }} />

              <label style={{ fontSize: "24px" }}>Roles</label>
            </div>
          </Col>
        </Row>
      </Container>
      <br />
    </div>
  );
}

export default Home;
