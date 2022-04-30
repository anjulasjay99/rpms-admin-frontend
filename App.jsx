import React from "react";
import BreadCrumb from "./components/shared/BreadCrumb";
import EditUser from "./components/views/EditUser";
import Container from "react-bootstrap/Container";
import UploadTemplate from "./components/views/UploadTemplate";
import CreateSubmissionType from "./components/views/CreateSubmissionType";
import CreateMarkingScheme from "./components/views/CreateMarkingScheme";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function App() {
  return (
    <div>
      <Container>
        <Row>
          <Col>
            <BreadCrumb></BreadCrumb>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs>
            <CreateMarkingScheme></CreateMarkingScheme>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
