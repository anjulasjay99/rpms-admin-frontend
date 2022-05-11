import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

function SubmissionTypes() {
  const [submissionTypes, setsubmissionTypes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      await fetch("http://localhost:8070/submissiontypes/")
        .then((response) => response.json())
        .then((response) => {
          setsubmissionTypes(response);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    fetchData();
  }, []);

  return (
    <Container>
      <div>
        <br />
        <Row>
          <Col>
            <h2>Submission Types</h2>
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <div className="d-flex">
              <InputGroup>
                <FormControl placeholder="Search here" />
              </InputGroup>
            </div>
          </Col>
          <Col>
            <Button variant="primary" style={{ float: "right" }}>
              <i className="bi bi-plus-lg"></i>
              Create New
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table striped responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Created By</th>
                  <th>Date Created</th>
                  <th>Visibility</th>
                  <th>Total Submissions</th>
                </tr>
              </thead>
              <tbody>
                {submissionTypes.map((type) => {
                  return (
                    <tr>
                      <td>{submissionTypes.indexOf(type) + 1}</td>
                      <td>{type.name}</td>
                      <td>{type.createdBy}</td>
                      <td>{type.dateCreated}</td>
                      <td>{type.visibility}</td>
                      <td>{type.totalSubmissions}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default SubmissionTypes;
