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
import { FaUserEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { IconsDiv } from "../../assets/css/IconsDiv.styeld";

function Users() {
  const navigate = useNavigate();
  const [users, setusers] = useState([]);
  const [admins, setadmins] = useState([]);
  const [students, setstudents] = useState([]);
  const [staff, setstaff] = useState([]);
  const [stdLoaded, setstdLoaded] = useState(false);
  const [stfLoaded, setstfLoaded] = useState(false);
  const [adminLoaded, setadminLoaded] = useState(false);
  const [keyword, setkeyword] = useState("");

  const links = [
    {
      name: "Home",
      path: "/home",
    },
    {
      name: "Users",
      path: "/users",
    },
  ];

  //fetch all admin users
  const fetchAdminUsers = async () => {
    await fetch("https://rpms-backend.herokuapp.com/admins", {
      method: "GET",
      headers: {
        "x-access-token": sessionStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setadmins(res);
      })
      .catch((err) => {
        alert("Error!");
      });
  };

  //fetch all staff members
  const fetchStaffMembers = async () => {
    await fetch("https://rpms-backend.herokuapp.com/staff/getAll")
      .then((res) => res.json())
      .then((res) => {
        setstaff(res);
      })
      .catch((err) => {
        alert(err);
      });
  };

  //fetch all students
  const fetchStudents = async () => {
    await fetch("https://rpms-backend.herokuapp.com/students")
      .then((res) => res.json())
      .then((res) => {
        setstudents(res);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const getUsers = () => {
    return [...admins, ...staff, ...students];
  };

  //navigate to edit user page
  const editUser = (user) => {
    navigate("/edit-user", { state: { user } });
  };

  //delete a user
  const deleteUser = (user) => {
    if (confirm("Are you sure you want to delete user " + user.firstName)) {
      if (user.role.toLocaleLowerCase() === "admin") {
        fetch(`https://rpms-backend.herokuapp.com/admins/${user._id}`, {
          method: "DELETE",
          headers: {
            "x-access-token": sessionStorage.getItem("token"),
          },
        })
          .then((res) => res.json())
          .then((res) => {
            fetchAdminUsers();
            fetchStaffMembers();
            fetchStudents();
            alert("Success!");
          })
          .catch((err) => alert(err));
      } else if (user.role.toLocaleLowerCase() === "student") {
        fetch(`https://rpms-backend.herokuapp.com/students/${user._id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((res) => {
            fetchAdminUsers();
            fetchStaffMembers();
            fetchStudents();
            alert("Success!");
          })
          .catch((err) => alert(err));
      } else {
        fetch(`https://rpms-backend.herokuapp.com/staff/delete/${user._id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((res) => {
            fetchAdminUsers();
            fetchStaffMembers();
            fetchStudents();
            alert("Success!");
          })
          .catch((err) => alert(err));
      }
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }

    fetchAdminUsers();
    fetchStaffMembers();
    fetchStudents();
  }, []);

  return (
    <Container>
      <BreadCrumb links={links}></BreadCrumb>
      <div>
        <br />
        <Row>
          <Col>
            <h2>Users</h2>
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
        </Row>
        <Row>
          <Col>
            <Table striped responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Tel. No</th>
                  <th>Role</th>
                  <th>Date Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {getUsers()
                  .filter((user) => {
                    if (keyword !== "") {
                      let name = user.firstName + " " + user.lastName;
                      if (
                        name
                          .trim()
                          .toLowerCase()
                          .includes(keyword.trim().toLowerCase())
                      ) {
                        return user;
                      }
                    } else {
                      return user;
                    }
                  })
                  .map((user, index) => {
                    return (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.email}</td>
                        <td>{user.telNo}</td>
                        <td>{user.role}</td>
                        <td>{user.dateCreated}</td>
                        <td>
                          <IconsDiv>
                            <FaUserEdit
                              title="Edit User"
                              style={{ marginRight: "10px", cursor: "pointer" }}
                              onClick={() => editUser(user)}
                            />

                            <MdDeleteForever
                              title="Delete User"
                              style={{ cursor: "pointer" }}
                              onClick={() => deleteUser(user)}
                            />
                          </IconsDiv>
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

export default Users;
