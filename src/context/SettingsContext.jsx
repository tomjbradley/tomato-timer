import React, { useContext } from "react";

import useLocalStorage from "../hooks/useLocalStorage";

export const defaultSettings = {
  alarmSoundFilename: "alarmwatch.mp3",
  alarmVolume: 0.5,
  timers: {
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 10,
  },
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
