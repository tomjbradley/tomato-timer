import React from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";

export default function TimerSelect({ activeTimer, setActiveTimer }) {
  return (
    <ButtonGroup
      aria-label="Select Timer"
      className="d-flex mx-auto my-4"
      style={{ maxWidth: 748 }}
    >
      <Button
        variant="primary"
        active={activeTimer === "pomodoro"}
        onClick={() => setActiveTimer("pomodoro")}
      >
        Pomodoro
      </Button>
      <Button
        variant="primary"
        active={activeTimer === "shortBreak"}
        onClick={() => setActiveTimer("shortBreak")}
      >
        Short Break
      </Button>
      <Button
        variant="primary"
        active={activeTimer === "longBreak"}
        onClick={() => setActiveTimer("longBreak")}
      >
        Long Break
      </Button>
    </ButtonGroup>
  );
}
