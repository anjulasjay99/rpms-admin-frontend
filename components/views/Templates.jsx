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
  const [keyword, setkeyword] = useState("");

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
    fetch(`http://localhost:8070/templates/files/download/${doc.fileId}`)
      .then((response) => response.blob())
      .then((blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.setAttribute("download", doc.document);
        link.setAttribute("target", "_blank");
        document.body.appendChild(link);
        link.click();
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
          settemplates(response);
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
          <Col lg={3}>
            <div className="d-flex">
              <InputGroup>
                <FormControl
                  placeholder="Search here"
                  value={keyword}
                  onChange={(e) => setkeyword(e.target.value)}
                />
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
                {templates
                  .filter((tmp) => {
                    if (keyword !== "") {
                      if (
                        tmp.name
                          .trim()
                          .toLowerCase()
                          .includes(keyword.trim().toLowerCase())
                      ) {
                        return tmp;
                      }
                    } else {
                      return tmp;
                    }
                  })
                  .map((template) => {
                    return (
                      <tr>
                        <td>{templates.indexOf(template) + 1}</td>
                        <td>{template.name}</td>
                        <td>{template.createdBy}</td>
                        <td>{template.dateCreated}</td>
                        <td>{template.visibility}</td>
                        <td>
                          <a href="#" onClick={() => openFile(template)}>
                            {template.document}
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
