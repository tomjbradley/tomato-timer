import React, { useContext, useEffect } from "react";

import useLocalStorage from "../hooks/useLocalStorage";

export const defaultSettings = {
  timerInTitle: true,
  allowNotifications: true,
  autoStart: false,
  pomodoroGoal: 1,
  alarmSoundFilename: "alarmwatch.mp3",
  alarmVolume: 0.5,
  pomodoroMinutes: 25,
  shortBreakMinutes: 5,
  longBreakMinutes: 10,
};

const SettingsContext = React.createContext();

export function useSettings() {
  return useContext(SettingsContext);
}

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useLocalStorage("settings", defaultSettings);

  return (
    <SettingsContext.Provider value={[settings, setSettings]}>
      {children}
    </SettingsContext.Provider>
  );
}
