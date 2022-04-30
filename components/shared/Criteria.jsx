import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "../../assets/css/styles.module.css";

function Criteria() {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "5px",
        padding: "10px",
      }}
    >
      <Row>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>Criteria</Form.Label>
            <Form.Control type="text" placeholder="Criteria" />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>Marks</Form.Label>
            <Row>
              <Col>
                {" "}
                <Form.Control type="number" placeholder="0" />
              </Col>
              <Col>
                {" "}
                <Button variant="danger">Remove</Button>
              </Col>
            </Row>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
}

export default Criteria;
