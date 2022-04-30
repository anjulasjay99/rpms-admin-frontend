import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "../../assets/css/styles.module.css";
import React from "react";

function UploadTemplate() {
  return (
    <div>
      <br />
      <Row>
        <Col>
          <h2>Upload New Template</h2>
        </Col>
      </Row>
      <br />

      <Form>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Name" />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Form.Group className="mb-3">
            <Form.Label>Description (Optional)</Form.Label>
            <Form.Control as="textarea" rows={3} />
          </Form.Group>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Upload Template</Form.Label>
              <Form.Control type="file" />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Visibility</Form.Label>
              <Form.Select>
                <option value="admin">Public</option>
                <option value="staff">Hidden</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Row className="align-items-end">
          <Col lg={12}>
            <Button variant="primary" type="submit" style={{ float: "right" }}>
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
    </div>
  );
}

export default UploadTemplate;
