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

function MarkingSchemes() {
  const navigate = useNavigate();
  const [markingSchemes, setmarkingSchemes] = useState([]);
  const [keyword, setkeyword] = useState("");

  const links = [
    {
      name: "Home",
      path: "/home",
    },
    {
      name: "Marking Schemes",
      path: "/marking-schemes",
    },
  ];

  const openFile = (scheme) => {
    fetch(
      `https://rpms-backend.herokuapp.com/markingschemes/files/download/${scheme.fileId}`
    )
      .then((response) => response.blob())
      .then((blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.setAttribute("download", scheme.document);
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
      await fetch("https://rpms-backend.herokuapp.com/markingschemes/")
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
        <BreadCrumb links={links}></BreadCrumb>
        <br />
        <Row>
          <Col>
            <h2>Marking Schemes</h2>
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
              onClick={() => navigate("/create-marking-scheme")}
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
                  <th>Visibility</th>
                  <th>File</th>
                </tr>
              </thead>
              <tbody>
                {markingSchemes
                  .filter((scheme) => {
                    if (keyword !== "") {
                      if (
                        scheme.name
                          .trim()
                          .toLowerCase()
                          .includes(keyword.trim().toLowerCase())
                      ) {
                        return scheme;
                      }
                    } else {
                      return scheme;
                    }
                  })
                  .map((scheme) => {
                    return (
                      <tr>
                        <td>{markingSchemes.indexOf(scheme) + 1}</td>
                        <td>{scheme.name}</td>
                        <td>{scheme.createdBy}</td>
                        <td>{scheme.dateCreated}</td>
                        <td>{scheme.visibility}</td>
                        <td>
                          <a href="#" onClick={() => openFile(scheme)}>
                            {scheme.document}
                          </a>
                        </td>
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
