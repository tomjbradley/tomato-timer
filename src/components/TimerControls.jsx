import React from "react";
import Button from "react-bootstrap/Button";

export default function TimerControls({ startTimer, stopTimer, resetTimer }) {
  return (
    <div className="d-flex flex-column my-4 flex-lg-row justify-content-lg-center gap-lg-5">
      <Button onClick={startTimer} variant="success">
        Start
      </Button>
      <Button onClick={stopTimer} variant="danger">
        Stop
      </Button>
      <Button onClick={resetTimer} variant="secondary">
        Reset
      </Button>
    </div>
  );
}
