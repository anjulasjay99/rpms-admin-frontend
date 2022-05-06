import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

function MarkingSchemes() {
  const [markingSchemes, setmarkingSchemes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      await fetch("http://localhost:8070/markingschemes/")
        .then((response) => response.json())
        .then((response) => {
          setmarkingSchemes(response);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    fetchData();
  }, []);

  return (
    <div>
      <Container>
        <br />
        <Row>
          <Col>
            <h2>Marking Schemes</h2>
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
                  <th>File</th>
                </tr>
              </thead>
              <tbody>
                {markingSchemes.map((scheme) => {
                  return (
                    <tr>
                      <td>{markingSchemes.indexOf(scheme) + 1}</td>
                      <td>{scheme.name}</td>
                      <td>{scheme.createdBy}</td>
                      <td>{scheme.dateCreated}</td>
                      <td>{scheme.visibility}</td>
                      <td>{scheme.document}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default MarkingSchemes;
