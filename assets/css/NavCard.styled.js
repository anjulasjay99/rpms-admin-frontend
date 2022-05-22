import styled from "styled-components";

export const NavCard = styled.div({
  height: "80px",
  background: "white",
  borderRadius: "5px",
  border: "1px solid #ccc",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  padding: "20px",
  transition: "background 250ms ease-out",
  "&:hover": {
    background: "#e3f2fd",
  },
});
