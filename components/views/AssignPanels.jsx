import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function AssignPanels() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [studentGroups, setstudentGroups] = useState([
    {
      groupID: "GRP_30",
      Leadermail: "rasika.p@my.sliit.lk",
      S2mail: "malisha.p@my.sliit.lk",
      S3mail: "pavithra.c@my.sliit.lk",
      S4mail: "zaid.m@my.sliit.lk",
      topic: "Machine Learning",
      panel: "",
    },
  ]);
  const [panels, setpanels] = useState([
    {
      name: "Dharshana Rajarathna",
      email: "dharshana.r@sliit.lk",
    },
    {
      name: "Nirmal Ranasinghe",
      email: "nirmal.r@sliit.lk",
    },
    {
      name: "Nayana Wimalarathna",
      email: "nayana.w@sliit.lk",
    },
  ]);
  const [panelToAssign, setpanelToAssign] = useState("dharshana.r@sliit.lk");

  const panelRowStyle = {
    width: "100%",
    margin: "5px 0px 5px 0px",
    padding: "5px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  };

  const modalContentDiv = {
    marginTop: "10px",
    maxHeight: "400px",
    overflowY: "auto",
    overflowX: "hidden",
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const assignPanel = () => {
    console.log(panelToAssign);
    setShow(false);
  };

  useEffect(() => {
    /* async function fetchData() {
      await fetch("http://localhost:8070/submissiontypes/")
        .then((response) => response.json())
        .then((response) => {
          setsubmissionTypes(response);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    fetchData(); */
  }, []);

  return (
    <Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Assign Panel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <InputGroup>
                <FormControl placeholder="Search here" />
              </InputGroup>
            </Col>
          </Row>
          <div style={modalContentDiv}>
            {panels.map((panel, index) => {
              return (
                <Row>
                  <Col>
                    <div style={panelRowStyle}>
                      <div>
                        <label style={{ fontWeight: 600 }}>{panel.name}</label>
                        <br />
                        <label style={{ fontWeight: 300, fontSize: "14px" }}>
                          {panel.email}
                        </label>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          marginRight: "5px",
                        }}
                      >
                        <input
                          type="radio"
                          name="panel"
                          value={panel.email}
                          onChange={(e) => setpanelToAssign(e.target.value)}
                          checked={panelToAssign === panel.email}
                        />
                      </div>
                    </div>
                  </Col>
                </Row>
              );
            })}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={assignPanel}>
            Assign
          </Button>
        </Modal.Footer>
      </Modal>
      <div>
        <br />
        <Row>
          <Col>
            <h2>Assign Panels</h2>
          </Col>
        </Row>
        <br />
        <Row>
          <Col lg={6}>
            <div className="d-flex">
              <InputGroup>
                <FormControl placeholder="Search here" />
              </InputGroup>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table striped responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Group ID</th>
                  <th>Leader</th>
                  <th>Members</th>
                  <th>Topic</th>
                  <th>Panel</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {studentGroups.map((group, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{group.groupID}</td>
                      <td>{group.Leadermail}</td>
                      <td>
                        {group.Leadermail}
                        <br />
                        {group.S2mail}
                        <br />
                        {group.S3mail}
                        <br />
                        {group.S4mail}
                      </td>
                      <td>{group.topic}</td>
                      <td>{group.panel === "" ? "Unassigned" : group.panel}</td>
                      <td>
                        <Button variant="outline-primary" onClick={handleShow}>
                          Assign Panel
                        </Button>
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

export default AssignPanels;
