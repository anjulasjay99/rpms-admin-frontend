import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "../../assets/css/styles.module.css";
import Criteria from "../../components/shared/Criteria";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";
import BreadCrumb from "../shared/BreadCrumb";
import Spinner from "react-bootstrap/Spinner";

function CreateMarkingScheme({ user }) {
  const navigate = useNavigate();
  const [criterias, setcriterias] = useState([
    {
      criteria: "",
      mark: 0,
    },
  ]);
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [visibility, setvisibility] = useState("Public");
  const [file, setfile] = useState();
  const [loading, setloading] = useState(false);

  const links = [
    {
      name: "Home",
      path: "/home",
    },
    {
      name: "Marking Schemes",
      path: "/marking-schemes",
    },
    {
      name: "Create Marking Scheme",
      path: "/create-marking-scheme",
    },
  ];

  //go back to previous page
  const onCancel = () => {
    navigate(-1);
  };

  //triggers when user selects a file
  const onFileSelect = (event) => {
    setfile(event.target.files[0]);
  };

  //called to add a new criteria
  const addNewCriteria = () => {
    setcriterias([...criterias, { criteria: "", mark: 0 }]);
  };

  //called to remove a criteria
  const removeCriteria = (index) => {
    let cts = criterias.filter((c) => criterias.indexOf(c) !== index);
    setcriterias(cts);
  };

  //called when user submit the form
  const onSubmit = async (event) => {
    event.preventDefault();
    setloading(true);

    const data = new FormData();
    data.append("markingscheme", file);

    let document = "";
    let fileId = "";

    await fetch(
      `https://rpms-backend.herokuapp.com/markingschemes/files/upload/`,
      {
        method: "POST",
        headers: {
          "x-access-token": sessionStorage.getItem("token"),
          Accept: "application/json",
        },
        body: data,
      }
    )
      .then((response) => response.json())
      .then((response) => {
        document = response.document;
        fileId = response.fileId;
      })
      .catch((err) => {
        alert("Error!");
      });

    const markingScheme = {
      name,
      description,
      criterias,
      visibility,
      document,
      fileId,
    };

    fetch(`https://rpms-backend.herokuapp.com/markingschemes/${user.email}`, {
      method: "POST",
      headers: {
        "x-access-token": sessionStorage.getItem("token"),
        "Content-type": "application/json",
      },
      body: JSON.stringify(markingScheme),
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

  const onCriteriaValueChange = (index, event) => {
    let newArr = [...criterias];
    newArr[index] = { criteria: event.target.value, mark: newArr[index].mark };

    setcriterias(newArr);
  };

  const onCriteriaMarkChange = (index, event) => {
    let newArr = [...criterias];
    newArr[index] = {
      criteria: newArr[index].criteria,
      mark: event.target.value,
    };

    setcriterias(newArr);
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
            <h2>Create Marking Scheme</h2>
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
                <Form.Label>Upload Marking Scheme</Form.Label>
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
          <br />
          <Row>
            <Col lg={12}>
              <Form.Group className="mb-3">
                <Row>
                  <Col lg={6}>
                    <Form.Label>Marking Criteria</Form.Label>
                  </Col>
                  <Col lg={6}>
                    <Button
                      variant="primary"
                      style={{ marginRight: "5px", float: "right" }}
                      onClick={() => addNewCriteria()}
                    >
                      Add New Criteria
                    </Button>
                  </Col>
                </Row>

                <br />
                <div
                  style={{
                    maxHeight: "400px",
                    overflow: "auto",
                    padding: "5px",
                  }}
                >
                  {criterias.map((criteria, index) => {
                    return (
                      <div
                        style={{
                          border: "1px solid #ccc",
                          borderRadius: "5px",
                          padding: "10px",
                          marginBottom: "10px",
                        }}
                      >
                        <Row>
                          <Col>
                            <Form.Group className="mb-3">
                              <Form.Label>Criteria</Form.Label>
                              <Form.Control
                                type="text"
                                placeholder="Criteria"
                                value={criteria.criteria}
                                onChange={(e) => {
                                  onCriteriaValueChange(index, e);
                                }}
                              />
                            </Form.Group>
                          </Col>
                          <Col>
                            <Form.Group className="mb-3">
                              <Form.Label>Marks</Form.Label>
                              <Row>
                                <Col lg={10}>
                                  {" "}
                                  <Form.Control
                                    type="number"
                                    placeholder="0"
                                    value={criteria.mark}
                                    onChange={(e) => {
                                      onCriteriaMarkChange(index, e);
                                    }}
                                  />
                                </Col>
                                <Col lg={2}>
                                  {" "}
                                  <Button
                                    variant="danger"
                                    onClick={() => removeCriteria(index)}
                                  >
                                    Remove
                                  </Button>
                                </Col>
                              </Row>
                            </Form.Group>
                          </Col>
                        </Row>
                      </div>
                    );
                  })}
                </div>
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
        <br />
      </Container>
    </div>
  );
}

export default CreateMarkingScheme;
