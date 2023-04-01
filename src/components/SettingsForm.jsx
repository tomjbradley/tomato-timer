import React, { useState, useRef } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import playAlarm from "../utils/playAlarm";
import { defaultSettings, useSettings } from "../context/SettingsContext";

export default function SettingsForm({ handleClose }) {
  const [settings, setSettings] = useSettings();

  const [timerInTitle, setTimerInTitle] = useState(settings.timerInTitle);
  const [allowNotifications, setAllowNotifications] = useState(
    settings.allowNotifications
  );
  const [alarmSoundFilename, setAlarmSoundFilename] = useState(
    settings.alarmSoundFilename
  );
  const [alarmVolume, setAlarmVolume] = useState(settings.alarmVolume);
  const [pomodoro, setPomodoro] = useState(settings.timers.pomodoro);
  const [shortBreak, setShortBreak] = useState(settings.timers.shortBreak);
  const [longBreak, setLongBreak] = useState(settings.timers.longBreak);

  function handleSubmit(e) {
    e.preventDefault();
    setSettings({
      timerInTitle,
      allowNotifications,
      alarmSoundFilename,
      alarmVolume,
      timers: {
        pomodoro,
        shortBreak,
        longBreak,
      },
    });
    if (timerInTitle === false)
      document.title = "Tomato Timer - Online Pomodoro Timer App";
    handleClose();
  }

  const soundRef = useRef(null);
  const volumeRef = useRef(null);
  const timerInTitleRef = useRef(null);
  const allowNotificationsRef = useRef(null);

  function handleChangeSelect(setValue) {
    return (e) => setValue(e.target.value);
  }

  function handleToggle(setValue) {
    return (e) => setValue((prevValue) => !prevValue);
  }

  function handleChangeNumber(setValue) {
    return (e) => setValue(e.target.valueAsNumber);
  }

  function resetForm() {
    setTimerInTitle(defaultSettings.timerInTitle);
    setAllowNotifications(defaultSettings.allowNotifications);

    if (defaultSettings.timerInTitle === true)
      timerInTitleRef.current.setAttribute("checked", "");
    if (defaultSettings.allowNotifications === true)
      allowNotificationsRef.current.setAttribute("checked", "");

    setAlarmSoundFilename(defaultSettings.alarmSoundFilename);
    setAlarmVolume(defaultSettings.alarmVolume);
    soundRef.current.setAttribute("selected", "");
    volumeRef.current.setAttribute("selected", "");

    setPomodoro(defaultSettings.timers.pomodoro);
    setShortBreak(defaultSettings.timers.shortBreak);
    setLongBreak(defaultSettings.timers.longBreak);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <fieldset className="mb-3">
        <legend className="h2">User preferences</legend>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            checked={timerInTitle}
            onChange={handleToggle(setTimerInTitle)}
            ref={timerInTitleRef}
            id="timerInTitleCheck"
          />
          <label className="form-check-label" htmlFor="timerInTitleCheck">
            Timer indication in title?
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            checked={allowNotifications}
            onChange={handleToggle(setAllowNotifications)}
            ref={allowNotificationsRef}
            id="allowNotificationsCheck"
          />
          <label className="form-check-label" htmlFor="allowNotificationsCheck">
            Browser notifications?
          </label>
        </div>
        {/* <Form.Check
          className="mb-3"
          label="Auto start pomodoros and breaks?"
          checked={formState.autoStart}
          onChange={(e) =>
            setFormState((prevFormState) => ({
              ...prevFormState,
              autoStart: !prevFormState.autoStart,
            }))
          }
        />
        <div className="mb-3">
          <label htmlFor="pomodoro-goal">Pomodoro goal for the day</label>
          <input
            id="pomodoro-goal"
            className="ms-2"
            type="number"
            min={1}
            value={formState.pomodoroGoal}
            onChange={(e) =>
              setFormState((prevFormState) => ({
                ...prevFormState,
                pomodoroGoal: e.target.value,
              }))
            }
            style={{ width: 60 }}
          />
        </div> */}
      </fieldset>
      <Form.Group className="mb-3" controlId="sound-select">
        <Form.Label className="h2">Select Sound</Form.Label>
        <Form.Select
          aria-label="Alert Sound"
          htmlSize={5}
          value={alarmSoundFilename}
          onChange={handleChangeSelect(setAlarmSoundFilename)}
        >
          <option value="80sAlarm.mp3">80s Alarm</option>
          <option value="alarmclock.mp3">Alarm Clock</option>
          <option value="alarmwatch.mp3" ref={soundRef}>
            Wristwatch Alarm
          </option>
          <option value="ding.mp3">Elevator Ding</option>
          <option value="doorbell.mp3">Door Bell</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="volume-select">
        <Form.Label className="h2">Select Volume</Form.Label>
        <Form.Select
          aria-label="Alert Volume"
          htmlSize={5}
          value={alarmVolume}
          onChange={handleChangeSelect(setAlarmVolume)}
        >
          <option value={0}>Mute</option>
          <option value={0.25}>25%</option>
          <option value={0.5} ref={volumeRef}>
            50%
          </option>
          <option value={0.75}>75%</option>
          <option value={1}>100%</option>
        </Form.Select>
      </Form.Group>
      <fieldset className="mb-3">
        <legend className="h2">
          Set Custom Times <small>(in minutes)</small>
        </legend>
        <div className="d-flex gap-2">
          <Form.Group>
            <Form.Label htmlFor="pomodoro-time">Pomodoro</Form.Label>
            <Form.Control
              type="number"
              min={1}
              value={pomodoro}
              onChange={handleChangeNumber(setPomodoro)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="pomodoro-time">Short Break</Form.Label>
            <Form.Control
              type="number"
              min={1}
              value={shortBreak}
              onChange={handleChangeNumber(setShortBreak)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="pomodoro-time">Long Break</Form.Label>
            <Form.Control
              type="number"
              min={1}
              value={longBreak}
              onChange={handleChangeNumber(setLongBreak)}
            />
          </Form.Group>
        </div>
      </fieldset>
      <div className="d-flex gap-2">
        <Button type="submit" variant="primary">
          Save
        </Button>
        <Button type="reset" variant="primary" onClick={resetForm}>
          Reset
        </Button>
        <Button
          variant="primary"
          onClick={() => playAlarm(alarmSoundFilename, alarmVolume)}
        >
          Sound Test
        </Button>
      </div>
    </Form>
  );
}
