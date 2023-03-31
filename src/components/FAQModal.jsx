import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function FAQModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button className="nav-link" onClick={handleShow} variant="link">
        FAQ
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>FAQ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Q. What is Pomodoro Technique?</p>
          <p>
            A. The time management technique created by Francesco Cirillo for a
            more productive way to work and study. For more information,{" "}
            <a
              href="https://www.pomodorotechnique.com/"
              target="_blank"
              rel="noreferrer"
            >
              click here
            </a>
            .
          </p>
          <p>
            Q. Can you tell me the story without having to visit the website?
          </p>
          <p>A. Well, it comprises of the following basic steps:</p>
          <ul>
            <li>Decide on the task at hand</li>
            <li>
              Set the <b>Pomodoro</b> (timer) to 25 minutes
            </li>
            <li>Work on the task until the timer expires; Record with an X</li>
            <li>
              Take a <b>Short Break</b> (5 minutes)
            </li>
            <li>
              Every four <i>"pomodoros"</i>, take a <b>Long Break</b> (10
              minutes)
            </li>
          </ul>
          <p>Q. What is TomatoTimer?</p>
          <p>
            A. It's an easy to use, flexible Pomodoro Technique timer. It was
            inspired by Tomatoi.st and it uses jQuery and HTML5 features like
            Desktop Notifications, Audio API and Local Storage instead of
            relying on Adobe Flash and other such technologies.
          </p>
          <p>Q. Why use TomatoTimer?</p>
          <p>A. Here's why:</p>
          <ul></ul>
          <li>Clean and Crisp interface with a Mobile friendly layout.</li>
          <li>Ability to Pause or Reset the timer intervals.</li>
          <li>Audio notifications at the end of a timer period.</li>
          <li>Desktop notifications. (Only supported in Google Chrome)</li>
          <li>Keyboard shortcuts.</li>
          <li>Ability to change the alert sound + volume via Settings</li>
          <li>Custom Timer Intervals</li>
          <li>A history of your activity. (Coming soon.)</li>
        </Modal.Body>
      </Modal>
    </>
  );
}
