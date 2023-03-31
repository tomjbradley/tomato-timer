import React from "react";
import Button from "react-bootstrap/Button";

export default function TimerControls() {
  return (
    <div className="d-flex flex-column my-4 flex-lg-row justify-content-lg-center gap-lg-5">
      <Button onClick={() => {}} variant="success">
        Start
      </Button>
      <Button onClick={() => {}} variant="danger">
        Stop
      </Button>
      <Button onClick={() => {}} variant="secondary">
        Reset
      </Button>
    </div>
  );
}
