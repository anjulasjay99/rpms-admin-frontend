import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "../../assets/css/styles.module.css";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";
import BreadCrumb from "../shared/BreadCrumb";

function CreateSubmissionType({ user }) {
  const navigate = useNavigate();
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [isFileUpload, setisFileUpload] = useState(true);
  const [isEditable, setisEditable] = useState(true);
  const [isMultipleSubmissions, setisMultipleSubmissions] = useState(true);
  const [visibility, setvisibility] = useState("Public");

  const links = [
    {
      name: "Home",
      path: "/home",
    },
    {
      name: "Submission Types",
      path: "/submission-types",
    },
    {
      name: "Create Submission Type",
      path: "/create-submission-type",
    },
  ];

  //go back to previous page
  const onCancel = () => {
    navigate(-1);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    //create submission type object
    const submissionType = {
      name,
      description,
      isFileUpload,
      isEditable,
      isMultipleSubmissions,
      visibility,
    };

    //call endpoint and save submission type in the db
    fetch(`http://localhost:8070/submissiontypes/${user.username}`, {
      method: "POST",
      headers: {
        "x-access-token": sessionStorage.getItem("token"),
        "Content-type": "application/json",
      },
      body: JSON.stringify(submissionType),
    })
      .then((response) => response.json())
      .then((response) => {
        alert("Added successfully!");
      })
      .catch((err) => {
        alert("Error!");
      });
  };

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
            <h2>Create Submission Type</h2>
          </Col>
        </Row>
        <br />
        <Container>
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
                  <Form.Label>Type</Form.Label>
                  <br />
                  <Form.Check
                    inline
                    label="File"
                    name="type"
                    type="radio"
                    checked={isFileUpload}
                    onChange={() => setisFileUpload(true)}
                  />
                  <Form.Check
                    inline
                    label="Text Only"
                    name="type"
                    type="radio"
                    checked={!isFileUpload}
                    onChange={() => setisFileUpload(false)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Options</Form.Label>
                  <br />
                  <Form.Check
                    inline
                    label="Editable"
                    name="options"
                    type="checkbox"
                    checked={isEditable}
                    onChange={() => setisEditable(!isEditable)}
                  />
                  <Form.Check
                    inline
                    label="Multiple Submissions"
                    name="options"
                    type="checkbox"
                    checked={isMultipleSubmissions}
                    onChange={() =>
                      setisMultipleSubmissions(!isMultipleSubmissions)
                    }
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
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </Container>
    </div>
  );
}

export default CreateSubmissionType;
