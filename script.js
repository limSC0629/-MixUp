// 页面切换
function showPage(id, btn) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.querySelectorAll("nav button").forEach(b => b.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  btn.classList.add("active");
}

// 深色模式切换
function toggleTheme() {
  document.body.classList.toggle("dark");
  // 记忆主题偏好
  if(document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
}
window.addEventListener("load", () => {
  const theme = localStorage.getItem("theme");
  if(theme === "dark") {
    document.body.classList.add("dark");
  }
});

// 防XSS转义文本
function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

/* ========== 每日计划 ========== */

let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

const taskInput = document.getElementById("taskInput");
const taskPriority = document.getElementById("taskPriority");
const taskDueDate = document.getElementById("taskDueDate");
const taskList = document.getElementById("taskList");
const taskSearch = document.getElementById("taskSearch");

function renderTasks() {
  if (!taskList) return;
  const keyword = taskSearch.value.trim().toLowerCase();
  taskList.innerHTML = "";
  tasks.forEach((task, i) => {
    if(keyword && !task.text.toLowerCase().includes(keyword) && !task.priority.includes(keyword)) {
      return;
    }
    const div = document.createElement("div");
    div.className = "task" + (task.completed ? " completed" : "");
    div.innerHTML = `
      <label>
        <input type="checkbox" ${task.completed ? "checked" : ""} onchange="toggleTask(${i})" />
        <strong>[${escapeHtml(task.priority)}]</strong> 
        <span>${escapeHtml(task.text)}</span> 
        <small>（截止：${task.dueDate || "无"}）</small>
      </label>
      <button onclick="deleteTask(${i})">删除</button>
    `;
    taskList.appendChild(div);
  });
}
function addTask() {
  const text = taskInput.value.trim();
  const priority = taskPriority.value;
  const dueDate = taskDueDate.value;
  if (!text) return alert("请填写任务内容");
  tasks.push({ text, priority, dueDate, completed: false });
  saveTasks();
  taskInput.value = "";
  taskDueDate.value = "";
  renderTasks();
}
function toggleTask(i) {
  tasks[i].completed = !tasks[i].completed;
  saveTasks();
  renderTasks();
}
function deleteTask(i) {
  tasks.splice(i, 1);
  saveTasks();
  renderTasks();
}
function clearTasks() {
  if (confirm("确定清空所有任务吗？")) {
    tasks = [];
    saveTasks();
    renderTasks();
  }
}
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
function exportTasks() {
  const dataStr = JSON.stringify(tasks, null, 2);
  const blob = new Blob([dataStr], {type: "application/json"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "tasks.json";
  a.click();
  URL.revokeObjectURL(url);
}
function importTasks() {
  document.getElementById("importTasksFile").click();
}
function handleImportTasks(event) {
  const file = event.target.files[0];
  if(!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    try {
      const imported = JSON.parse(e.target.result);
      if(Array.isArray(imported)) {
        tasks = imported;
        saveTasks();
        renderTasks();
        alert("任务导入成功");
      } else {
        alert("导入文件格式不正确");
      }
    } catch {
      alert("导入文件格式不正确");
    }
  };
  reader.readAsText(file);
  event.target.value = "";
}
renderTasks();

/* ========== 提醒事项 ========== */

let reminders = JSON.parse(localStorage.getItem("reminders") || "[]");

const reminderInput = document.getElementById("reminderInput");
const reminderTime = document.getElementById("reminderTime");
const reminderList = document.getElementById("reminderList");
const reminderSearch = document.getElementById("reminderSearch");

function renderReminders() {
  if (!reminderList) return;
  const keyword = reminderSearch.value.trim().toLowerCase();
  reminderList.innerHTML = "";
  reminders.forEach((reminder, i) => {
    if(keyword && !reminder.text.toLowerCase().includes(keyword)) return;
    const div = document.createElement("div");
    div.className = "task";
    div.innerHTML = `
      <span>${escapeHtml(reminder.text)}</span> 
      <small>（提醒时间：${reminder.time || "无"}）</small>
      <button onclick="deleteReminder(${i})">删除</button>
    `;
    reminderList.appendChild(div);
  });
}
function addReminder() {
  const text = reminderInput.value.trim();
  const time = reminderTime.value;
  if (!text) return alert("请填写提醒内容");
  reminders.push({ text, time });
  saveReminders();
  reminderInput.value = "";
  reminderTime.value = "";
  renderReminders();
}
function deleteReminder(i) {
  reminders.splice(i, 1);
  saveReminders();
  renderReminders();
}
function clearReminders() {
  if (confirm("确定清空所有提醒吗？")) {
    reminders = [];
    saveReminders();
    renderReminders();
  }
}
function saveReminders() {
  localStorage.setItem("reminders", JSON.stringify(reminders));
}
function exportReminders() {
  const dataStr = JSON.stringify(reminders, null, 2);
  const blob = new Blob([dataStr], {type: "application/json"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "reminders.json";
  a.click();
  URL.revokeObjectURL(url);
}
function importReminders() {
  document.getElementById("importRemindersFile").click();
}
function handleImportReminders(event) {
  const file = event.target.files[0];
  if(!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    try {
      const imported = JSON.parse(e.target.result);
      if(Array.isArray(imported)) {
        reminders = imported;
        saveReminders();
        renderReminders();
        alert("提醒导入成功");
      } else {
        alert("导入文件格式不正确");
      }
    } catch {
      alert("导入文件格式不正确");
    }
  };
  reader.readAsText(file);
  event.target.value = "";
}
renderReminders();

/* ========== 笔记功能 ========== */

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

function getNotes() {
  return JSON.parse(localStorage.getItem("allNotes") || "[]");
}

function saveNotes(notes) {
  localStorage.setItem("allNotes", JSON.stringify(notes));
}

const noteInput = document.getElementById("noteInput");
const noteTags = document.getElementById("noteTags");
const savedNotesList = document.getElementById("savedNotesList");
const noteSearch = document.getElementById("noteSearch");

function renderSavedNotes() {
  const notes = getNotes();
  const keyword = noteSearch.value.trim().toLowerCase();
  if (!savedNotesList) return;
  savedNotesList.innerHTML = "";

  const filtered = notes.filter(note => 
    note.title.toLowerCase().includes(keyword) ||
    note.content.toLowerCase().includes(keyword) ||
    (note.tags && note.tags.some(tag => tag.toLowerCase().includes(keyword)))
  );

  if (filtered.length === 0) {
    savedNotesList.innerHTML = "<p>（暂无符合条件的笔记）</p>";
    return;
  }

  filtered.forEach(note => {
    const div = document.createElement("div");
    div.className = "note-item";
    div.innerHTML = `
      <div class="note-preview">
        <strong>${escapeHtml(note.title)}</strong> 
        <em>[标签：${escapeHtml(note.tags ? note.tags.join(", ") : "")}]</em>
        <div class="note-actions">
          <button onclick="loadNote('${note.id}')">📂 载入</button>
          <button onclick="delete
