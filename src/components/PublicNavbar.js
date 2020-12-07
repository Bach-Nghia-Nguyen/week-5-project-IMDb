import React from "react";

// import Navbar, Nav, NavLink
import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

// import images, icons
import logo from "../images/IMDb-logo.png";
import githubIco from "../images/github_icon.png";

const PublicNavbar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>
        <img src={logo} alt="IMDb" width="100px" />
      </Navbar.Brand>

      <Nav className="mr-auto">
        <Nav.Link as={NavLink} to="/">
          Home
        </Nav.Link>
        <Nav.Link as={NavLink} to="/current">
          Current playing movies
        </Nav.Link>
      </Nav>

      <Nav>
        <a
          href="https://github.com/Bach-Nghia-Nguyen/week-5-project-imdb"
          target="_blank"
          rel="noreferrer"
        >
          <img src={githubIco} alt="Github" width="32px" />
        </a>
      </Nav>
    </Navbar>
  );
};

export default PublicNavbar;
