import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import SettingsForm from "./SettingsForm";

export default function SettingsModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button className="nav-link" onClick={handleShow} variant="link">
        Settings
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Options</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SettingsForm handleClose={handleClose} />
        </Modal.Body>
      </Modal>
    </>
  );
}
