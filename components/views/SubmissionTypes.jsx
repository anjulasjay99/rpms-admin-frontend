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

function SubmissionTypes() {
  const navigate = useNavigate();
  const [submissionTypes, setsubmissionTypes] = useState([]);
  const [keyword, setkeyword] = useState("");
  const [templates, settemplates] = useState([]);

  const links = [
    {
      name: "Home",
      path: "/home",
    },
    {
      name: "Submission Types",
      path: "/submission-types",
    },
  ];

  //fetch all templates
  const fetchTemplates = async () => {
    await fetch("https://rpms-backend.herokuapp.com/templates")
      .then((res) => res.json())
      .then((res) => settemplates(res))
      .catch((err) => console.log(err));
  };

  //get template name
  const getTemplate = (id) => {
    let template = {
      name: "No Template",
    };
    templates.forEach((tmp) => {
      if (tmp._id === id) {
        template = tmp;
      }
    });
    return template;
  };

  //open template
  const openFile = (doc) => {
    fetch(
      `https://rpms-backend.herokuapp.com/templates/files/download/${doc.fileId}`
    )
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
    async function fetchData() {
      await fetch("https://rpms-backend.herokuapp.com/submissiontypes/")
        .then((response) => response.json())
        .then((response) => {
          setsubmissionTypes(response);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    fetchData();
    fetchTemplates();
  }, []);

  return (
    <Container>
      <BreadCrumb links={links}></BreadCrumb>
      <div>
        <br />
        <Row>
          <Col>
            <h2>Submission Types</h2>
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
              onClick={() => navigate("/create-submission-type")}
            >
              <i className="bi bi-plus-lg"></i>
              <FaPlus />
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
                  <th>Template</th>
                  <th>Visibility</th>
                </tr>
              </thead>
              <tbody>
                {submissionTypes
                  .filter((type) => {
                    if (keyword !== "") {
                      if (
                        type.name
                          .trim()
                          .toLowerCase()
                          .includes(keyword.trim().toLowerCase())
                      ) {
                        return type;
                      }
                    } else {
                      return type;
                    }
                  })
                  .map((type) => {
                    return (
                      <tr>
                        <td>{submissionTypes.indexOf(type) + 1}</td>
                        <td>{type.name}</td>
                        <td>{type.createdBy}</td>
                        <td>{type.dateCreated}</td>
                        <td>
                          <a
                            href="#"
                            onClick={() =>
                              openFile(getTemplate(type.templateId))
                            }
                          >
                            {getTemplate(type.templateId).document}
                          </a>
                        </td>
                        <td>{type.visibility}</td>
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
