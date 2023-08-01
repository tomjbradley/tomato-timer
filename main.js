// Constants
const POMODORO = 25 * 60;
const SHORT_BREAK = 5 * 60;
const LONG_BREAK = 10 * 60;

const timerDictionary = {
  pomodoro: POMODORO,
  shortBreak: SHORT_BREAK,
  longBreak: LONG_BREAK,
};

const defaultSettings = {
  pomodoroGoal: 5,
};

// User Interface
const timer = document.getElementById("timer");
const logTableBody = document.querySelector("#log-table tbody");

const timerButtons = Array.from(
  document.getElementById("timer-buttons").children
);
const startButton = document.getElementById("start-button");
const stopButton = document.getElementById("stop-button");
const resetButton = document.getElementById("reset-button");
const toggleModalButtons = document.querySelectorAll("[data-toggle='modal']");
const pomodoroGoal = document.getElementById("pomodoro-goal");
const clearLogButton = document.getElementById("clear-log-button");
const clearTodaysSessionsButton = document.getElementById(
  "clear-todays-sessions-button"
);
const soundTestButton = document.getElementById("sound-test-button");
const soundSelect = document.getElementById("sound-select");
const volumeSelect = document.getElementById("volume-select");
const enableNotificationsButton = document.getElementById(
  "enable-notifications-button"
);

document.addEventListener("DOMContentLoaded", () => {
  const sessions = JSON.parse(localStorage.getItem("sessions")) ?? [];
  sessions.forEach((session) => addLogRow(session));

  const pomodoroGoal = 12 ?? defaultSettings.pomodoroGoal;
  loop(pomodoroGoal, addGoalIndicator);
  const todaysDate = new Date().getDate();
  const todaysPomodoros = sessions.filter(
    (session) =>
      !(session.type === pomodoro && session.startTime.getDate() === todaysDate)
  );
  loop(todaysPomodoros.length, activateNextGoalIndicator);
});

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

timerButtons.forEach((timerButton) => {
  timerButton.addEventListener("click", () =>
    changeTimer(timerButton.dataset.value)
  );
});
addKeyboardShortcut("KeyP", { altKey: true }, () => changeTimer("pomodoro"));
addKeyboardShortcut("KeyS", { altKey: true }, () => changeTimer("shortBreak"));
addKeyboardShortcut("KeyL", { altKey: true }, () => changeTimer("longBreak"));

toggleModalButtons.forEach((toggleButton) => {
  const modal = document.getElementById(toggleButton.dataset.target);
  const closeModalButton = modal.querySelector("[data-dismiss='modal'");

  toggleButton.addEventListener("click", () => modal.showModal());
  closeModalButton.addEventListener("click", () => modal.close());
  modal.addEventListener("click", (event) => {
    const dialogDimensions = modal.getBoundingClientRect();
    if (
      event.clientX < dialogDimensions.left ||
      event.clientX > dialogDimensions.right ||
      event.clientY < dialogDimensions.top ||
      event.clientY > dialogDimensions.bottom
    ) {
      modal.close();
    }
  });
});

clearLogButton.addEventListener("click", () => clearLog());
clearTodaysSessionsButton.addEventListener("click", () =>
  clearTodaysSessions()
);

soundTestButton.addEventListener("click", () => triggerSoundTest());

enableNotificationsButton.addEventListener("click", () =>
  requestNotificationPermission()
);

// Rendering Helpers
function addLogRow(session) {
  const logTableRow = document.createElement("tr");
  logTableRow.setAttribute("key", session.id);
  logTableRow.innerHTML = `
    <td>${session.type}</td>
    <td>${formatDate(session.startTime)}</td>
    <td>${formatDate(session.endTime)}</td>
    <td><textarea value='${session.description}'></textarea></td>
  `;

  logTableBody.append(logTableRow);
}
function addGoalIndicator() {
  const goalIndicator = document.createElement("span");
  pomodoroGoal.append(goalIndicator);
}
function activateNextGoalIndicator() {
  const pomodoroGoalIndicators = Array.from(pomodoroGoal.children);

  pomodoroGoalIndicators.every((goalIndicator) => {
    if (!goalIndicator.classList.contains("active")) {
      goalIndicator.classList.add("active");
      return false;
    }

    return true;
  });
}
function removeLogRow(id) {
  const logTableRow = document.querySelector(`[key='${id}']`);
  logTableRow.remove();
}

// Logic
let isRunning = false;
let timerSeconds = 25 * 60;
let currentTimer = "pomodoro";
let sessions = JSON.parse(localStorage.getItem("sessions")) ?? [];

function updateTimerSeconds(seconds) {
  timerSeconds = seconds;
  timer.textContent = formatTime(seconds);
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secondsInMinute = seconds % 60;

  return `${minutes}:${
    secondsInMinute < 10 ? "0" + secondsInMinute : secondsInMinute
  }`;
}

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "full",
  timeStyle: "short",
});
function formatDate(date) {
  return dateFormatter.format(date);
}

// Core Functionality
let currentSession = {};
function clearLog() {
  localStorage.removeItem("sessions");
  logTableBody.innerHTML = "";
}
function clearTodaysSessions() {
  const todaysDate = new Date().getDate();
  const todaysSessions = sessions.filter(
    (session) => new Date(session.startTime).getDate() === todaysDate
  );

  todaysSessions.forEach((session) => removeLogRow(session.id));

  sessions = sessions.filter((session) => todaysSessions.indexOf(session) < 0);
  localStorage.setItem("sessions", JSON.stringify(sessions));
}
function addSession(session) {
  session.endTime = Date.now();
  session.description = "";

  addLogRow(session);
  activateNextGoalIndicator();

  sessions.push(session);
  localStorage.setItem("sessions", JSON.stringify(sessions));

  currentSession = {};
}

let interval;
function startTimer() {
  if (!isRunning) {
    currentSession.id = sessions.length + 1;
    currentSession.type = currentTimer;
    currentSession.startTime = Date.now();

    isRunning = true;
    interval = setInterval(() => {
      updateTimerSeconds(timerSeconds - 1);

      if (timerSeconds <= 0) {
        clearInterval(interval);
        triggerNotification();
        playAlarmSound("alarmwatch.mp3", 0.5);
        addSession(currentSession);
      }
    }, 10);
  }
}
function stopTimer() {
  isRunning = false;
  clearInterval(interval);
}
function resetTimer() {
  stopTimer();
  updateTimerSeconds(timerDictionary[currentTimer]);
}
function changeTimer(nextTimer) {
  currentTimer = nextTimer;
  resetTimer();
  startTimer();
}
function triggerSoundTest() {
  playAlarmSound(soundSelect.value, volumeSelect.value);
}

// Web APIs
function requestNotificationPermission() {
  Notification.requestPermission();
}

function triggerNotification() {
  if (Notification.permission === "granted") {
    const notification = new Notification("TomatoTimer", {
      icon: "/logo.png",
      body: "Your time is up!!",
    });

    setTimeout(() => notification.close(), 5000);
  }
}

function playAlarmSound(filename, volume) {
  const audio = new Audio("/assets/audio/" + filename);
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

function loop(times, callback) {
  for (let i = 0; i < times; i++) {
    callback();
  }
}
