import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import BreadCrumb from "../shared/BreadCrumb";

function Templates() {
  const navigate = useNavigate();
  const [templates, settemplates] = useState([]);
  const links = [
    {
      name: "Home",
      path: "/home",
    },
    {
      name: "Templates",
      path: "/templates",
    },
  ];

  const openFile = (doc) => {
    fetch(`http://localhost:8070/templates/files/download/${doc.id}`)
      .then((response) => response.blob())
      .then((blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.setAttribute("download", doc.name);
        link.setAttribute("target", "_blank");
        document.body.appendChild(link);
        link.click();
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
          id: splittedFileName[0],
          name: originalName,
          file: data.document,
        },
      });
    });
    settemplates(arr);
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
    //fetch uploaded templates
    async function fetchData() {
      await fetch("http://localhost:8070/templates/", {
        method: "GET",
        headers: {
          "x-access-token": sessionStorage.getItem("token"),
        },
      })
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
      <BreadCrumb links={links}></BreadCrumb>
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
            <Button
              variant="primary"
              style={{ float: "right" }}
              onClick={() => navigate("/upload-template")}
            >
              <FaPlus /> Create New
            </Button>
          </Col>
        </Row>
        <br />
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
