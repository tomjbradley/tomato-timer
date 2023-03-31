import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import playAlarm from "../utils/playAlarm";
import { defaultSettings, useSettings } from "../context/SettingsContext";

export default function SettingsForm({ handleClose }) {
  const [settings, setSettings] = useState(defaultSettings);
  const [globalSettings, setGlobalSettings] = useSettings();

  useEffect(() => {
    const savedSettings = JSON.parse(localStorage.getItem("settings"));

    if (savedSettings !== null) setSettings(savedSettings);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    localStorage.setItem("settings", JSON.stringify(settings));
    setGlobalSettings(settings);
    handleClose();
  }

  return (
    <Form onSubmit={handleSubmit}>
      <fieldset>
        <legend className="h2">User preferences</legend>
        <Form.Check
          className="mb-3"
          label="Timer indication in title?"
          checked={settings.timerInTitle}
          onChange={(e) =>
            setSettings((prevSettings) => ({
              ...prevSettings,
              timerInTitle: !prevSettings.timerInTitle,
            }))
          }
        />
        <Form.Check
          className="mb-3"
          label="Browser notifications?"
          checked={settings.notifications}
          onChange={(e) =>
            setSettings((prevSettings) => ({
              ...prevSettings,
              notifications: !prevSettings.notifications,
            }))
          }
        />
        <Form.Check
          className="mb-3"
          label="Auto start pomodoros and breaks?"
          checked={settings.autoStart}
          onChange={(e) =>
            setSettings((prevSettings) => ({
              ...prevSettings,
              autoStart: !prevSettings.autoStart,
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
            value={settings.pomodoroGoal}
            onChange={(e) =>
              setSettings((prevSettings) => ({
                ...prevSettings,
                pomodoroGoal: e.target.value,
              }))
            }
            style={{ width: 60 }}
          />
        </div>
      </fieldset>
      <Form.Group className="mb-3" controlId="sound-select">
        <Form.Label className="h2">Select Sound</Form.Label>
        <Form.Select
          aria-label="Alert Sound"
          htmlSize={5}
          value={settings.alarmSoundFilename}
          onChange={(e) =>
            setSettings((prevSettings) => ({
              ...prevSettings,
              alarmSoundFilename: e.target.value,
            }))
          }
        >
          <option value="80sAlarm.mp3">80s Alarm</option>
          <option value="alarmclock.mp3">Alarm Clock</option>
          <option value="alarmwatch.mp3">Wristwatch Alarm</option>
          <option value="ding.mp3">Elevator Ding</option>
          <option value="doorbell.mp3">Door Bell</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="volume-select">
        <Form.Label className="h2">Select Volume</Form.Label>
        <Form.Select
          aria-label="Alert Volume"
          htmlSize={5}
          value={settings.alarmVolume}
          onChange={(e) =>
            setSettings((prevSettings) => ({
              ...prevSettings,
              alarmVolume: e.target.value,
            }))
          }
        >
          <option value={0}>Mute</option>
          <option value={0.25}>25%</option>
          <option value={0.5}>50%</option>
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
              value={settings.pomodoroMinutes}
              onChange={(e) =>
                setSettings((prevSettings) => ({
                  ...prevSettings,
                  pomodoroMinutes: e.target.value,
                }))
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="pomodoro-time">Short Break</Form.Label>
            <Form.Control
              type="number"
              min={1}
              value={settings.shortBreakMinutes}
              onChange={(e) =>
                setSettings((prevSettings) => ({
                  ...prevSettings,
                  shortBreakMinutes: e.target.value,
                }))
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="pomodoro-time">Long Break</Form.Label>
            <Form.Control
              type="number"
              min={1}
              value={settings.longBreakMinutes}
              onChange={(e) =>
                setSettings((prevSettings) => ({
                  ...prevSettings,
                  longBreakMinutes: e.target.value,
                }))
              }
            />
          </Form.Group>
        </div>
      </fieldset>
      <div className="d-flex gap-2">
        <Button type="submit" variant="primary">
          Save
        </Button>
        <Button
          type="reset"
          variant="primary"
          onClick={() => setSettings(defaultSettings)}
        >
          Reset
        </Button>
        <Button
          variant="primary"
          onClick={() =>
            playAlarm(settings.alarmSoundFilename, settings.alarmVolume)
          }
        >
          Sound Test
        </Button>
      </div>
    </Form>
  );
}
