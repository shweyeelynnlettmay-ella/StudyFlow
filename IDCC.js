let totalSeconds = 25 * 60;
let remainingSeconds = totalSeconds;
let timerInterval = null;

const displayEl = document.getElementById("time-display");
const startBtn = document.getElementById("start-btn");

function updateTimerDisplay() {
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  displayEl.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function setTimerMode(minutes) {
  pauseTimer();
  totalSeconds = minutes * 60;
  remainingSeconds = totalSeconds;
  updateTimerDisplay();

  document.getElementById("mode-study").classList.toggle("active", minutes === 25);
  document.getElementById("mode-break").classList.toggle("active", minutes === 5);
}

function startTimer() {
  if (timerInterval) return; // Prevent multiple intervals

  timerInterval = setInterval(() => {
    if (remainingSeconds > 0) {
      remainingSeconds--;
      updateTimerDisplay();
    } else {
      clearInterval(timerInterval);
      timerInterval = null;
      alert("Session completed! Great work.");
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function resetTimer() {
  pauseTimer();
  remainingSeconds = totalSeconds;
  updateTimerDisplay();
}
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const completedCountEl = document.getElementById("completed-count");
const remainingCountEl = document.getElementById("remaining-count");

let tasks = [
  { id: 1, text: "Review Pure Mathematics formula sheet", completed: false },
  { id: 2, text: "Complete Physics Unit 2 practice questions", completed: true }
];

function renderTasks() {
  taskList.innerHTML = "";
  let completed = 0;

  tasks.forEach((task) => {
    if (task.completed) completed++;

    const li = document.createElement("li");
    li.className = `task-item ${task.completed ? "done" : ""}`;
    li.innerHTML = `
      <label style="display: flex; align-items: center; gap: 0.6rem; cursor: pointer;">
        <input type="checkbox" ${task.completed ? "checked" : ""} onchange="toggleTask(${task.id})">
        <span>${task.text}</span>
      </label>
      <button class="delete-btn" onclick="deleteTask(${task.id})">✕</button>
    `;
    taskList.appendChild(li);
  });

  completedCountEl.textContent = completed;
  remainingCountEl.textContent = tasks.length - completed;
}

function handleAddTask(e) {
  e.preventDefault();
  const text = taskInput.value.trim();
  if (!text) return;

  tasks.push({ id: Date.now(), text, completed: false });
  taskInput.value = "";
  renderTasks();
}

function toggleTask(id) {
  tasks = tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t));
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter((t) => t.id !== id);
  renderTasks();
}

updateTimerDisplay();
renderTasks();
