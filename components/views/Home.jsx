import React from "react";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <Container>
        <h2>Home</h2>
        <Link to="/create-marking-scheme">Create Marking Scheme</Link> <br />
        <Link to="/create-submission-type">Create Submission Type</Link> <br />
        <Link to="/upload-template">Upload Template</Link>
        <br />
        <Link to="/edit-user">Edit User</Link>
        <br />
        <Link to="/submission-types">Submission Types</Link> <br />
        <Link to="/marking-schemes">Marking Schemes</Link>
        <br />
        <Link to="/templates">Templates</Link>
        <br />
        <Link to="/roles">Roles</Link>
        <br />
      </Container>
    </div>
  );
}

export default Home;
