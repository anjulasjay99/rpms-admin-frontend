import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "../../assets/css/styles.module.css";
import Criteria from "../../components/shared/Criteria";

function CreateMarkingScheme() {
  const [criterias, setcriterias] = useState([
    {
      id: new Date().toISOString(),
      criteria: "",
      mark: 0,
    },
  ]);

  const addNewCriteria = () => {
    setcriterias([
      ...criterias,
      { id: new Date().toISOString(), criteria: "", mark: 0 },
    ]);
  };

  const removeCriteria = (id) => {
    let cts = criterias.filter((c) => c.id !== id);
    setcriterias(cts);
  };

  const onCriteriaValueChange = (id, event) => {};
  return (
    <div>
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
              <Form.Label>Upload Marking Scheme</Form.Label>
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
                {criterias.map((criteria) => {
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
                                />
                              </Col>
                              <Col lg={2}>
                                {" "}
                                <Button
                                  variant="danger"
                                  onClick={() => removeCriteria(criteria.id)}
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

export default CreateMarkingScheme;
