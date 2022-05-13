import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "../../assets/css/styles.module.css";
import React, { useState } from "react";
import Container from "react-bootstrap/Container";

function UploadTemplate({ user }) {
  const [file, setfile] = useState();
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [visibility, setvisibility] = useState("Public");

  const onFileSelect = (event) => {
    setfile(event.target.files[0]);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData();
    data.append("template", file);

    let document = "";

    await fetch(`http://localhost:8070/files/templates/upload/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: data,
    })
      .then((response) => response.json())
      .then((response) => {
        document = response;
      })
      .catch((err) => {
        alert("Error!");
      });

    const templateData = {
      name,
      description,
      document,
      visibility,
    };

    fetch(`http://localhost:8070/templates/${user.username}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(templateData),
    })
      .then((response) => response.json())
      .then((response) => {
        alert("Added successfully!");
      })
      .catch((err) => {
        alert("Error!");
      });
  };

  return (
    <div>
      <Container>
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
                <Form.Control
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Form.Group className="mb-3">
              <Form.Label>Description (Optional)</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={description}
                onChange={(e) => setdescription(e.target.value)}
              />
            </Form.Group>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Upload Template</Form.Label>
                <Form.Control
                  type="file"
                  accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,
                text/plain, application/pdf"
                  onChange={(event) => onFileSelect(event)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Visibility</Form.Label>
                <Form.Select
                  value={visibility}
                  onChange={(e) => setvisibility(e.target.value)}
                >
                  <option value="Public">Public</option>
                  <option value="Hidden">Hidden</option>
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
                onClick={(event) => onSubmit(event)}
              >
                Save
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

export default UploadTemplate;
