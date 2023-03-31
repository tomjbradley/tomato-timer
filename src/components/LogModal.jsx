import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

export default function FAQModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button className="nav-link" onClick={handleShow} variant="link">
        Log
      </Button>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Time log</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button className="mb-3" variant="primary">
            Clear pomodoros done today
          </Button>
          <p>Pomodoro goal tracker:</p>
          <Table striped bordered>
            <thead>
              <tr>
                <th>Session</th>
                <th>Start time</th>
                <th>End time</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {/* <tr>
                <td>short_break</td>
                <td>Friday, March 31st 2023, 3:45:51 pm</td>
                <td>Friday, March 31st 2023, 3:46:52 pm</td>
                <td>
                  <input className="w-100" type="text" />
                </td>
              </tr> */}
            </tbody>
          </Table>
          <Button variant="primary">Clear timer log</Button>
        </Modal.Body>
      </Modal>
    </>
  );
}
