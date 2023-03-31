import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import LogModal from "./LogModal";
import FAQModal from "./FAQModal";
import SettingsModal from "./SettingsModal";

export default function Header() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>TomatoTimer</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto text-center">
            <LogModal />
            <FAQModal />
            <SettingsModal />
            <Nav.Link
              href="https://twitter.com/intent/tweet?hashtags=pomodoro,productivity&related=tomatotimer&text=Tomato+Timer:+An+easy+to+use+Pomodoro+Technique+Timer&tw_p=tweetbutton&url=https://tomjbradley.github.io/tomato-timer/&via=tomjbrad"
              target="_blank"
              rel="noreferrer"
            >
              Tweet about us!
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
