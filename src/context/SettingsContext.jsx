import React, { useContext, useState } from "react";

export const defaultSettings = {
  timerInTitle: true,
  notifications: true,
  autoStart: false,
  pomodoroGoal: 1,
  alarmSoundFilename: "alarmwatch.mp3",
  volumePercentage: 0.5,
  pomodoroMinutes: 25,
  shortBreakMinutes: 5,
  longBreakMinutes: 10,
};

const SettingsContext = React.createContext();

export function useSettings() {
  return useContext(SettingsContext);
}

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(defaultSettings);

  return (
    <SettingsContext.Provider value={[settings, setSettings]}>
      {children}
    </SettingsContext.Provider>
  );
}
