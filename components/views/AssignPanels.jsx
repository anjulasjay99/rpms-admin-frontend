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
import BreadCrumb from "../shared/BreadCrumb";

//styles
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

function AssignPanels() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [studentGroups, setstudentGroups] = useState([]);
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
  const [assignedPanels, setassignedPanels] = useState([]);
  const [topics, settopics] = useState([]);
  const [panelToAssign, setpanelToAssign] = useState("dharshana.r@sliit.lk");
  const [selectedGroup, setselectedGroup] = useState("");
  const [keyword1, setkeyword1] = useState("");
  const [keyword2, setkeyword2] = useState("");

  const links = [
    {
      name: "Home",
      path: "/home",
    },
    {
      name: "Assign Panels",
      path: "/assign-panels",
    },
  ];

  //close modal
  const handleClose = () => setShow(false);

  //open modal
  const handleShow = (groupID) => {
    setselectedGroup(groupID);
    setShow(true);
  };

  //fetch all registered groups
  const fetchGroups = async () => {
    await fetch("http://localhost:8070/groups/")
      .then((response) => response.json())
      .then((response) => {
        setstudentGroups(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //fetch registered topics
  const fetchTopics = async () => {
    await fetch("http://localhost:8070/topicsubs/")
      .then((response) => response.json())
      .then((response) => {
        settopics(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //fetch all staff members
  const fetchStaffMembers = async () => {
    await fetch("http://localhost:8070/staff/")
      .then((response) => response.json())
      .then((response) => {
        setpanels(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //fetch all assigned panels
  const fetchAssignedPanels = async () => {
    await fetch("http://localhost:8070/assignedpanels/")
      .then((response) => response.json())
      .then((response) => {
        setassignedPanels(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //get the panel assigned for a group
  const getAssignedPanel = (groupId) => {
    let panel = "Unassigned";
    for (let i = 0; i < assignedPanels.length; i++) {
      if (groupId === assignedPanels[i].groupId) {
        panel = assignedPanels[i].panel;
        break;
      }
    }

    return panel;
  };

  //get the topic selected by a group
  const getTopic = (groupId) => {
    let topic = "No Topic";
    for (let i = 0; i < topics.length; i++) {
      if (groupId === topics[i].groupId) {
        topic = topics[i].topic;
        break;
      }
    }

    return topic;
  };

  //assign a panel to a selected student group
  const assignPanel = () => {
    const data = {
      groupId: selectedGroup,
      panel: panelToAssign,
    };
    fetch("http://localhost:8070/assignedpanels", {
      method: "POST",
      headers: {
        "x-access-token": sessionStorage.getItem("token"),
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(() => {
        alert("Success!");
        setShow(false);
      })
      .catch((err) => {
        alert(err);
      });
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
    fetchAssignedPanels();
    fetchGroups();
    fetchTopics();
  }, []);

  return (
    <Container>
      <BreadCrumb links={links}></BreadCrumb>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Assign Panel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <InputGroup>
                <FormControl
                  placeholder="Search here"
                  value={keyword2}
                  onChange={(e) => setkeyword2(e.target.value)}
                />
              </InputGroup>
            </Col>
          </Row>
          <div style={modalContentDiv}>
            {panels
              .filter((panel) => {
                if (keyword2 !== "") {
                  if (
                    panel.name
                      .trim()
                      .toLowerCase()
                      .includes(keyword2.trim().toLowerCase())
                  ) {
                    return panel;
                  }
                } else {
                  return panel;
                }
              })
              .map((panel, index) => {
                return (
                  <Row>
                    <Col>
                      <div style={panelRowStyle}>
                        <div>
                          <label style={{ fontWeight: 600 }}>
                            {panel.name}
                          </label>
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
          <Col lg={3}>
            <div className="d-flex">
              <InputGroup>
                <FormControl
                  placeholder="Search here"
                  value={keyword1}
                  onChange={(e) => setkeyword1(e.target.value)}
                />
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
                {studentGroups
                  .filter((group) => {
                    if (keyword1 !== "") {
                      if (
                        group.groupID
                          .trim()
                          .toLowerCase()
                          .includes(keyword1.trim().toLowerCase())
                      ) {
                        return group;
                      }
                    } else {
                      return group;
                    }
                  })
                  .map((group, index) => {
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
                        <td>{getTopic(group.groupID)}</td>
                        <td>{getAssignedPanel(group.groupID)}</td>
                        <td>
                          <Button
                            variant="outline-primary"
                            onClick={() => handleShow(group.groupID)}
                          >
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
