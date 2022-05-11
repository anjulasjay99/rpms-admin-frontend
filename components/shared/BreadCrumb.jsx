import React from "react";
import Container from "react-bootstrap/Container";

import Breadcrumb from "react-bootstrap/Breadcrumb";

function BreadCrumb() {
  return (
    <div style={{ marginTop: "50px" }}>
      <Container>
        <Breadcrumb>
          <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
            Library
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Data</Breadcrumb.Item>
        </Breadcrumb>
      </Container>
    </div>
  );
}

export default BreadCrumb;
