import React, { useEffect, useRef, useState, useCallback } from "react";

import TimerDisplay from "./TimerDisplay";
import TimerControls from "./TimerControls";
import TimerSelect from "./TimerSelect";
import playAlarm from "../utils/playAlarm";
import notify from "../utils/notify";
import { useSettings } from "../context/SettingsContext";
import formatTime from "../utils/formatTime";

export default function Timer() {
  const [settings, _] = useSettings();
  const [activeTimer, setActiveTimer] = useState("pomodoro");
  const [seconds, setSeconds] = useState(settings.timers[activeTimer] * 60);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef();

  const handleKeyPress = useCallback(
    (event) => {
      console.log(event);

      if (event.code === "Space") {
        if (running) {
          stopTimer();
        } else {
          startTimer();
        }
      }

      if (event.altKey === true) {
        if (event.key === "p") changeTimer("pomodoro");
        if (event.key === "s") changeTimer("shortBreak");
        if (event.key === "l") changeTimer("longBreak");
        if (event.key === "r") resetTimer();
      }
    },
    [running]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  function changeTimer(timer) {
    setActiveTimer(timer);
    setSeconds(settings.timers[timer] * 60);
    startTimer();
  }

  useEffect(() => {
    resetTimer();
  }, [settings.timers]);

  function startTimer() {
    if (!running) {
      setRunning(true);
      intervalRef.current = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds - 1 === 0) {
            stopTimer();
            document.title = "Buzzzzz!";
            playAlarm(settings.alarmSoundFilename, settings.alarmVolume);
            if (settings.allowNotifications) notify();
            return 0;
          }

          if (settings.timerInTitle)
            document.title = `(${formatTime(prevSeconds - 1)}) TomatoTimer`;
          return prevSeconds - 1;
        });
      }, 1000);
    }
  }

  function stopTimer() {
    setRunning(false);
    clearInterval(intervalRef.current);
  }

  function resetTimer() {
    stopTimer();
    setSeconds(settings.timers[activeTimer] * 60);
  }

  return (
    <>
      <TimerSelect activeTimer={activeTimer} setActiveTimer={changeTimer} />
      <TimerDisplay seconds={seconds} />
      <TimerControls
        startTimer={startTimer}
        stopTimer={stopTimer}
        resetTimer={resetTimer}
      />
    </>
  );
}
