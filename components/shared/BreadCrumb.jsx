import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Breadcrumb from "react-bootstrap/Breadcrumb";

function BreadCrumb() {
  const location = useLocation();
  const [show, setshow] = useState(true);

  useEffect(() => {
    if (location.pathname === "/login") {
      setshow(false);
    } else {
      setshow(true);
    }
  }, [location]);

  if (!show) {
    return <></>;
  } else {
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
}

export default BreadCrumb;
