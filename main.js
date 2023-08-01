// Constants
const DEFAULT_TITLE = "Tomato Timer - Online Pomodoro Timer App";

const DEFAULT_SETTINGS = {
  showTimeInTitle: true,
  browserNotifications: true,
  autoStartTimers: false,
  pomodoroGoal: 1,
  alarmSoundFilename: "alarmwatch.mp3",
  alarmVolume: 0.5,
  pomodoro: 25,
  shortBreak: 5,
  longBreak: 10,
};

// User Interface
const timer = document.getElementById("timer");
const settingsForm = document.getElementById("settings-form");
const settingsFormInputs = settingsForm.querySelectorAll(
  "input[type='number']"
);
const settingsFormCheckboxes = settingsForm.querySelectorAll(
  "input[type='checkbox']"
);
const settingsFormSelects = settingsForm.querySelectorAll("select");
const logTableBody = document.querySelector("#log-table tbody");
const pomodoroGoal = document.getElementById("pomodoro-goal");

const timerButtons = Array.from(
  document.getElementById("timer-buttons").children
);
const startButton = document.getElementById("start-button");
const stopButton = document.getElementById("stop-button");
const resetButton = document.getElementById("reset-button");
const toggleModalButtons = document.querySelectorAll("[data-toggle='modal']");
const clearLogButton = document.getElementById("clear-log-button");
const clearTodaysSessionsButton = document.getElementById(
  "clear-todays-sessions-button"
);
const soundTestButton = document.getElementById("sound-test-button");
const enableNotificationsButton = document.getElementById(
  "enable-notifications-button"
);

document.addEventListener("DOMContentLoaded", () => {
  const settings = getSettings();

  // Load Timer
  setTimer(settings[currentTimer] * 60);

  // Load Sessions
  const sessions = getSessions();
  sessions.forEach((session) => addLogRow(session));

  // Load Pomodoro Goal Indicator
  const { pomodoroGoal } = getSettings();
  setGoalIndicator(pomodoroGoal);

  // Autofill Form
  settingsFormInputs.forEach((input) => {
    input.defaultValue = DEFAULT_SETTINGS[input.name];
    input.value = settings[input.name];
  });

  settingsFormCheckboxes.forEach((checkbox) => {
    checkbox.defaultChecked = DEFAULT_SETTINGS[checkbox.name];
    checkbox.checked = settings[checkbox.name];
  });

  settingsFormSelects.forEach((select) => {
    const options = select.querySelectorAll(`option`);
    options.forEach((option) => {
      if (option.getAttribute("value") === DEFAULT_SETTINGS[select.name]) {
        option.defaultSelected = true;
      }
    });
    select.value = settings[select.name];
  });
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
  modal
    .querySelector("form[method='dialog']")
    ?.addEventListener("submit", (event) => {
      event.preventDefault();
      modal.close();
    });
});

settingsForm.addEventListener("submit", (event) => {
  const settings = {};

  settingsFormInputs.forEach((input) => {
    if (input.type === "number") {
      return (settings[input.name] = +input.value);
    }
    settings[input.name] = input.value;
  });
  settingsFormCheckboxes.forEach(
    (checkbox) => (settings[checkbox.name] = checkbox.checked)
  );
  settingsFormSelects.forEach((select) => {
    if (select.getAttribute("type") === "number") {
      return (settings[select.name] = +select.value);
    }

    settings[select.name] = select.value;
  });

  setSettings(settings);

  setGoalIndicator(settings.pomodoroGoal);
  resetTimer();
});

addGlobalEventListener("#log-table tbody tr textarea", "input", (event) => {
  const logTableRowTextarea = event.target;
  const logTableRow = getGrandParents(logTableRowTextarea, 2);

  setSessionDescription(
    parseInt(logTableRow.getAttribute("key")),
    logTableRowTextarea.value
  );
});
clearLogButton.addEventListener("click", () => clearAllSessions());
clearTodaysSessionsButton.addEventListener("click", () => console.log(1));

const volumeSelect = document.getElementById("volume-select");
const soundSelect = document.getElementById("sound-select");

soundTestButton.addEventListener("click", () =>
  playAlarmSound(soundSelect.value, volumeSelect.value)
);

enableNotificationsButton.addEventListener("click", () =>
  requestNotificationPermission()
);

// Rendering Helpers
function setTimerSeconds(seconds) {
  timer.textContent = seconds;
}

function addLogRow(session) {
  console.log(session);
  const logTableRow = document.createElement("tr");
  logTableRow.setAttribute("key", session.id);
  logTableRow.innerHTML = `
    <td>${session.type}</td>
    <td>${formatDate(session.startTime)}</td>
    <td>${formatDate(session.endTime)}</td>
    <td><textarea>${session.description}</textarea></td>
  `;

  logTableBody.append(logTableRow);
}

function clearLog() {
  logTableBody.innerHTML = "";
}

function setGoalIndicator(number) {
  let goalIndicatorInner = ``;
  loop(number, () => {
    goalIndicatorInner += "<span></span>";
  });
  pomodoroGoal.innerHTML = goalIndicatorInner;
}

function activateGoalIndicators(number) {
  const pomodoroGoalIndicators = Array.from(pomodoroGoal.children);

  pomodoroGoalIndicators.every((index, goalIndicator) => {
    if (!goalIndicator.classList.contains("active")) {
      goalIndicator.classList.add("active");
    }

    return index < number ? true : false;
  });
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secondsInMinute = seconds % 60;

  return `${minutes}:${
    secondsInMinute < 10 ? "0" + secondsInMinute : secondsInMinute
  }`;
}

function formatDate(date) {
  const dateFormatter = new Intl.DateTimeFormat(undefined, {
    dateStyle: "full",
    timeStyle: "short",
  });

  return dateFormatter.format(date);
}

// Data
let isRunning = false;
let settings = getSettings();
let timerSeconds = settings.pomodoro * 60;
let currentTimer = "pomodoro";
let sessions = getSessions();
let currentSession = {};

function setTitle(newTitle) {
  document.title = newTitle;
}

function setTimer(seconds) {
  timerSeconds = seconds;
  timer.textContent = formatTime(seconds);
}

function getSettings() {
  return JSON.parse(localStorage.getItem("settings")) ?? DEFAULT_SETTINGS;
}

function setSettings(newSettings) {
  settings = newSettings;
  localStorage.setItem("settings", JSON.stringify(newSettings));
}

function getSessions() {
  const sessions = JSON.parse(localStorage.getItem("sessions")) ?? [];
  sessions.forEach((session) => {
    session.startTime = new Date(session.startTime);
    session.endTime = new Date(session.endTime);
  });
  return sessions;
}

function setSessions(sessions) {
  localStorage.setItem("sessions", JSON.stringify(sessions));
}

function addSession(session) {
  session.endTime = new Date();

  addLogRow(session);

  sessions.push(session);
  setSessions(sessions);
}

function clearAllSessions() {
  clearLog();
  localStorage.removeItem("sessions");
}

function setSessionDescription(id, description) {
  const session = sessions.find((session) => {
    return session.id === id;
  });

  session.description = description;
  setSessions(sessions);
}

let interval;
function startTimer() {
  if (!isRunning) {
    currentSession = new Session(currentTimer);

    isRunning = true;
    interval = setInterval(() => {
      setTimer(timerSeconds - 1);

      if (settings.showTimeInTitle)
        setTitle(`(${formatTime(timerSeconds)}) TomatoTimer`);

      if (timerSeconds <= 0) {
        clearInterval(interval);
        setTitle("Buzzzzz!");
        triggerNotification();
        playAlarmSound(settings.alarmSoundFilename, settings.alarmVolume);
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
  setTimer(settings[currentTimer] * 60);
  setTitle(DEFAULT_TITLE);
}
function changeTimer(nextTimer) {
  currentTimer = nextTimer;
  resetTimer();
  startTimer();
}

// Objects
function Session(type) {
  this.id = sessions.length + 1;
  this.type = type;
  this.startTime = new Date();
  this.endTime = null;
  this.description = "";
}

// Web APIs
function requestNotificationPermission() {
  Notification.requestPermission();
}

function triggerNotification() {
  if (Notification.permission === "granted" && settings.browserNotifications) {
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

function addGlobalEventListener(selector, type, callback) {
  document.addEventListener(type, (event) => {
    if (event.target.matches(selector)) callback(event);
  });
}

function getGrandParents(element, order) {
  if (order === 0) return element;

  return getGrandParents(element.parentNode, order - 1);
}
