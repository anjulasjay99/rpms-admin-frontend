import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Breadcrumb from "react-bootstrap/Breadcrumb";

function BreadCrumb({ links }) {
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
        <Breadcrumb>
          {links.map((link, index) => {
            return (
              <Breadcrumb.Item
                active={index === links.length - 1 ? true : false}
              >
                {index === links.length - 1 ? (
                  <label>{link.name}</label>
                ) : (
                  <Link style={{ textDecoration: "none" }} to={link.path}>
                    {link.name}
                  </Link>
                )}
              </Breadcrumb.Item>
            );
          })}
        </Breadcrumb>
      </div>
    );
  }
}

export default BreadCrumb;
