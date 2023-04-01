import React, { useState, useRef, useEffect } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";

import formatTime from "../utils/formatTime";
import TimerControls from "./TimerControls";
import { useSettings } from "../context/SettingsContext";
import playAlarm from "../utils/playAlarm";
import notify from "../utils/notify";

export default function Timer() {
  const [
    {
      pomodoroMinutes,
      shortBreakMinutes,
      longBreakMinutes,
      alarmSoundFilename,
      alarmVolume,
    },
    setSettings,
  ] = useSettings();
  const [seconds, setSeconds] = useState(60 * pomodoroMinutes);
  const [running, setRunning] = useState(false);

  const intervalId = useRef(null);

  useEffect(() => {
    resetTimer();
  }, [pomodoroMinutes, shortBreakMinutes, longBreakMinutes]);

  function startTimer() {
    if (!running) {
      setRunning(true);
      intervalId.current = setInterval(
        () =>
          setSeconds((prevSeconds) => {
            if (prevSeconds - 1 === 0) ringAlarm();
            return prevSeconds - 1;
          }),
        1000
      );
    }
  }

  function ringAlarm() {
    stopTimer();
    playAlarm(alarmSoundFilename, alarmVolume);
    notify();
  }

  function stopTimer() {
    clearInterval(intervalId.current);
    setRunning(false);
  }

  function resetTimer() {
    stopTimer();
    setSeconds(pomodoroMinutes * 60);
  }

  return (
    <>
      <ButtonGroup
        aria-label="Select Timer"
        className="d-flex mx-auto my-4"
        style={{ maxWidth: 748 }}
      >
        <Button variant="primary" active>
          Pomodoro
        </Button>
        <Button variant="primary">Short Break</Button>
        <Button variant="primary">Long Break</Button>
      </ButtonGroup>
      <span className="d-block display-1 fw-bold text-center mt-4 mb-5">
        {formatTime(seconds)}
      </span>
      <TimerControls
        startTimer={startTimer}
        stopTimer={stopTimer}
        resetTimer={resetTimer}
      />
    </>
  );
}
