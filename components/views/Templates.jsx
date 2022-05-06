import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

function Templates() {
  const [templates, settemplates] = useState([]);

  const openFile = (document) => {
    console.log(document);

    fetch("http://localhost:8070/uploads/templates", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(document),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createArray = (res) => {
    let arr = [];
    res.map((data) => {
      let splittedFileName = data.document.split("-");
      let originalName = "";

      for (let i = 1; i < splittedFileName.length; i++) {
        originalName += splittedFileName[i];
        if (i < splittedFileName.length - 1) {
          originalName += "-";
        }
      }

      arr.push({
        name: data.name,
        createdBy: data.createdBy,
        dateCreated: data.dateCreated,
        visibility: data.visibility,
        document: {
          name: originalName,
          file: data.document,
        },
      });
    });
    settemplates(arr);
  };

  useEffect(() => {
    async function fetchData() {
      await fetch("http://localhost:8070/templates/")
        .then((response) => response.json())
        .then((response) => {
          createArray(response);
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
            <h2>Templates</h2>
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
                {templates.map((template) => {
                  return (
                    <tr>
                      <td>{templates.indexOf(template) + 1}</td>
                      <td>{template.name}</td>
                      <td>{template.createdBy}</td>
                      <td>{template.dateCreated}</td>
                      <td>{template.visibility}</td>
                      <td>
                        <a href="#" onClick={() => openFile(template.document)}>
                          {template.document.name}
                        </a>
                      </td>
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

export default Templates;
