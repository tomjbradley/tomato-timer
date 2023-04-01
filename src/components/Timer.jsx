import React, { useEffect, useRef, useState } from "react";

import TimerDisplay from "./TimerDisplay";
import TimerControls from "./TimerControls";
import TimerSelect from "./TimerSelect";
import playAlarm from "../utils/playAlarm";
import notify from "../utils/notify";
import { useSettings } from "../context/SettingsContext";

export default function Timer() {
  const [settings, _] = useSettings();
  const [activeTimer, setActiveTimer] = useState("pomodoro");
  const [seconds, setSeconds] = useState(settings.timers[activeTimer] * 60);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef();

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
            playAlarm(settings.alarmSoundFilename, settings.alarmVolume);
            notify();
            return 0;
          }

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
