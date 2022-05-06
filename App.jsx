import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BreadCrumb from "./components/shared/BreadCrumb";
import EditUser from "./components/views/EditUser";
import Container from "react-bootstrap/Container";
import UploadTemplate from "./components/views/UploadTemplate";
import CreateSubmissionType from "./components/views/CreateSubmissionType";
import CreateMarkingScheme from "./components/views/CreateMarkingScheme";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Home from "./components/views/Home";
import SubmissionTypes from "./components/views/SubmissionTypes";
import MarkingSchemes from "./components/views/MarkingSchemes";
import Templates from "./components/views/Templates";
import Roles from "./components/views/Roles";
import Header from "./components/shared/Header";
function App() {
  const [user, setuser] = useState({
    username: "admin123",
    password: "abc123",
  });

  const setUser = (loggedUser) => {
    setUser(loggedUser);
  };

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Header></Header>
        <br />
        <BreadCrumb></BreadCrumb>

        <Routes>
          <Route exact path="/" element={<Home user={user} />} />
          <Route
            path="/create-marking-scheme"
            element={<CreateMarkingScheme user={user} />}
          />
          <Route
            path="/create-submission-type"
            element={<CreateSubmissionType user={user} />}
          />
          <Route
            path="/upload-template"
            element={<UploadTemplate user={user} />}
          />
          <Route path="/edit-user" element={<EditUser user={user} />} />
          <Route
            path="/submission-types"
            element={<SubmissionTypes user={user} />}
          />
          <Route
            path="/marking-schemes"
            element={<MarkingSchemes user={user} />}
          />
          <Route path="/templates" element={<Templates user={user} />} />
          <Route path="/roles" element={<Roles user={user} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
