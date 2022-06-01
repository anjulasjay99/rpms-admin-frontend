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
import Spinner from "react-bootstrap/Spinner";

function CreateSubmissionType({ user }) {
  const navigate = useNavigate();
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [isFileUpload, setisFileUpload] = useState(true);
  const [isEditable, setisEditable] = useState(true);
  const [isMultipleSubmissions, setisMultipleSubmissions] = useState(true);
  const [visibility, setvisibility] = useState("Public");
  const [templates, settemplates] = useState([
    { _id: "123", name: "temp1" },
    { _id: "456", name: "temp2" },
  ]);
  const [selectedTemplate, setselectedTemplate] = useState("");
  const [loading, setloading] = useState(false);

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

  const selectTemplate = (val) => {
    setselectedTemplate(val);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setloading(true);
    console.log(selectedTemplate);

    //create submission type object
    const submissionType = {
      name,
      description,
      templateId: selectedTemplate,
      isEditable,
      isMultipleSubmissions,
      visibility,
    };

    //call endpoint and save submission type in the db
    fetch(`https://rpms-backend.herokuapp.com/submissiontypes/${user.email}`, {
      method: "POST",
      headers: {
        "x-access-token": sessionStorage.getItem("token"),
        "Content-type": "application/json",
      },
      body: JSON.stringify(submissionType),
    })
      .then((response) => response.json())
      .then((response) => {
        setloading(false);
        alert("Added successfully!");
      })
      .catch((err) => {
        setloading(false);
        alert("Error!");
      });
  };

  //fecth all templates
  const fetchTemplates = async () => {
    await fetch("https://rpms-backend.herokuapp.com/templates")
      .then((res) => res.json())
      .then((res) => {
        settemplates(res);
        if (res.length > 0) setselectedTemplate(res[0]._id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
    fetchTemplates();
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
                  <Form.Label>Template</Form.Label>
                  <Form.Select
                    value={selectedTemplate}
                    onChange={(e) => selectTemplate(e.target.value)}
                  >
                    {templates.map((tmp) => {
                      return <option value={tmp._id}>{tmp.name}</option>;
                    })}
                  </Form.Select>
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
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    hidden={!loading}
                  />
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
