import React, { useState, useRef } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import playAlarm from "../utils/playAlarm";
import { defaultSettings, useSettings } from "../context/SettingsContext";

export default function SettingsForm({ handleClose }) {
  const [settings, setSettings] = useSettings();

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
      alarmSoundFilename,
      alarmVolume,
      timers: {
        pomodoro,
        shortBreak,
        longBreak,
      },
    });
    handleClose();
  }

  const soundRef = useRef(null);
  const volumeRef = useRef(null);

  function handleSelect(setValue) {
    return (e) => setValue(e.target.value);
  }

  function handleNumber(setValue) {
    return (e) => setValue(e.target.valueAsNumber);
  }

  function resetForm() {
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
      {/* <fieldset>
        <legend className="h2">User preferences</legend>
        <Form.Check
          className="mb-3"
          label="Timer indication in title?"
          checked={formState.timerInTitle}
          onChange={(e) =>
            setFormState((prevFormState) => ({
              ...prevFormState,
              timerInTitle: !prevFormState.timerInTitle,
            }))
          }
        />
        <Form.Check
          className="mb-3"
          label="Browser notifications?"
          checked={formState.allowNotifications}
          onChange={(e) =>
            setFormState((prevFormState) => ({
              ...prevFormState,
              allowNotifications: !prevFormState.allowNotifications,
            }))
          }
        />
        <Form.Check
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
        </div>
      </fieldset> */}
      <Form.Group className="mb-3" controlId="sound-select">
        <Form.Label className="h2">Select Sound</Form.Label>
        <Form.Select
          aria-label="Alert Sound"
          htmlSize={5}
          value={alarmSoundFilename}
          onChange={handleSelect(setAlarmSoundFilename)}
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
          onChange={handleSelect(setAlarmVolume)}
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
              onChange={handleNumber(setPomodoro)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="pomodoro-time">Short Break</Form.Label>
            <Form.Control
              type="number"
              min={1}
              value={shortBreak}
              onChange={handleNumber(setShortBreak)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="pomodoro-time">Long Break</Form.Label>
            <Form.Control
              type="number"
              min={1}
              value={longBreak}
              onChange={handleNumber(setLongBreak)}
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
