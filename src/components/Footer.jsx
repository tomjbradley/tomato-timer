import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import requestNotifications from "../utils/requestNotifications";

export default function Footer() {
  return (
    <section>
      <Container>
        <Row className="gy-4 mb-4">
          <Col lg={4}>
            <h3>Keyboard Shortcuts</h3>
            <ul>
              <li>
                <span>
                  <kbd>SPACE</kbd>
                </span>{" "}
                Start or Stop the timer
              </li>
              <li>
                <span>
                  <kbd>ALT</kbd> + <kbd>P</kbd>
                </span>{" "}
                Pomodoro
              </li>
              <li>
                <span>
                  <kbd>ALT</kbd> + <kbd>S</kbd>
                </span>{" "}
                Short Break
              </li>
              <li>
                <span>
                  <kbd>ALT</kbd> + <kbd>L</kbd>
                </span>{" "}
                Long Break
              </li>
              <li>
                <span>
                  <kbd>ALT</kbd> + <kbd>R</kbd>
                </span>{" "}
                Reset Break
              </li>
            </ul>
          </Col>
          <Col lg={4}>
            <h3>Notifications</h3>
            <p>You can change the audio tone and volume via Settings</p>
            <p>
              Desktop Notifications are currently supported in Chrome, Firefox
              and Safari
            </p>
            <Button onClick={requestNotifications} variant="primary" size="sm">
              Enable Desktop Alerts
            </Button>
          </Col>
          <Col lg={4}>
            <h3>Settings</h3>
            <p>You can set custom times, audio tone and volume via Settings.</p>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
