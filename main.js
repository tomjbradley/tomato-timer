// Constants/Magic
const POMODORO = 25 * 60;
const SHORT_BREAK = 5 * 60;
const LONG_BREAK = 10 * 60;

// Dictionaries
const timerDictionary = {
  pomodoro: POMODORO,
  shortBreak: SHORT_BREAK,
  longBreak: LONG_BREAK,
};

// DOM Elements
const timer = document.getElementById("timer");
const timerButtons = Array.from(
  document.getElementById("timer-buttons").children
);
const startButton = document.getElementById("start-button");
const stopButton = document.getElementById("stop-button");
const resetButton = document.getElementById("reset-button");
const enableNotificationsButton = document.getElementById(
  "enable-notifications-button"
);

// User Interactions
timerButtons.forEach((timerButton) => {
  timerButton.addEventListener("click", () =>
    changeTimer(timerButton.dataset.value)
  );
});
addKeyboardShortcut("KeyP", { altKey: true }, () => changeTimer("pomodoro"));
addKeyboardShortcut("KeyS", { altKey: true }, () => changeTimer("shortBreak"));
addKeyboardShortcut("KeyL", { altKey: true }, () => changeTimer("longBreak"));

startButton.addEventListener("click", () => startTimer());
stopButton.addEventListener("click", () => stopTimer());
addKeyboardShortcut("Space", {}, () => {
  if (!isRunning) {
    startTimer();
  } else {
    stopTimer();
  }
});

resetButton.addEventListener("click", () => resetTimer());
addKeyboardShortcut("KeyR", { altKey: true }, () => resetTimer());

enableNotificationsButton.addEventListener("click", () =>
  Notification.requestPermission()
);

// App State
let isRunning = false;

const state = { timerSeconds: 25 * 60, currentTimer: "pomodoro" };

// UI Updaters
function updateTimerSeconds(seconds) {
  state.timerSeconds = seconds;
  timer.textContent = formatTime(seconds);
}

// Data Formatters
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secondsInMinute = seconds % 60;

  return `${minutes}:${
    secondsInMinute < 10 ? "0" + secondsInMinute : secondsInMinute
  }`;
}

// Core Functionality
let interval;
function startTimer() {
  if (!isRunning) {
    isRunning = true;
    interval = setInterval(() => {
      updateTimerSeconds(state.timerSeconds - 1);

      if (state.timerSeconds <= 0) {
        clearInterval(interval);
        triggerNotification();
        playAlarmSound("alarmwatch.mp3", 0.5);
      }
    }, 1000);
  }
}
function stopTimer() {
  isRunning = false;
  clearInterval(interval);
}
function resetTimer() {
  stopTimer();
  updateTimerSeconds(timerDictionary[state.currentTimer]);
}
function changeTimer(nextTimer) {
  state.currentTimer = nextTimer;
  resetTimer();
  startTimer();
}

// Web APIs
function triggerNotification() {
  if (Notification.permission === "granted") {
    const notification = new Notification("TomatoTimer", {
      icon: "/logo192.png",
      body: "Your time is up!!",
    });

    setTimeout(() => notification.close(), 5000);
  }
}

function playAlarmSound(filename, volume) {
  const audio = Audio("/assets/audio/" + filename);
  audio.volume = volume;
  audio.play();
}

// Utility Functions
function addKeyboardShortcut(keyCode, modifiers, callback) {
  document.addEventListener("keydown", (event) => {
    if (
      event.code === keyCode &&
      event.shiftKey === (modifiers.shiftKey ?? false) &&
      event.altKey === (modifiers.altKey ?? false) &&
      event.ctrlKey === (modifiers.ctrlKey ?? false)
    ) {
      callback();
    }
  });
}
