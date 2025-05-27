// 页面切换逻辑
function showPage(id, btn) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.querySelectorAll("nav button").forEach(b => b.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  btn.classList.add("active");
}

// 主题切换
function toggleDarkMode() {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
}

function loadTheme() {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
}

// 安全转义 防XSS
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

// 任务管理
let tasks = [];
const taskList = document.getElementById("taskList");
const taskInput = document.getElementById("taskInput");
const taskDueDate = document.getElementById("taskDueDate");
const taskPriority = document.getElementById("taskPriority");
const taskSearch = document.getElementById("taskSearchInput");
const taskStats = document.getElementById("taskStats");

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const data = localStorage.getItem("tasks");
  if (data) tasks = JSON.parse(data);
}

function renderTasks() {
  if (!taskList) return;
  const keyword = taskSearch.value.trim().toLowerCase();
  taskList.innerHTML = "";
  tasks.forEach((task, i) => {
    const textMatch = task.text.toLowerCase().includes(keyword);
    const priorityMatch = task.priority.toLowerCase().includes(keyword);
    if (keyword && !textMatch && !priorityMatch) return;
    const div = document.createElement("div");
    div.className = "task" + (task.completed ? " completed" : "");
    div.innerHTML = 
      <label>
        <input type="checkbox" ${task.completed ? "checked" : ""} onchange="toggleTask(${i})" />
        <strong>[${escapeHtml(task.priority)}]</strong> 
        <span>${escapeHtml(task.text)}</span> 
        <small>（截止：${task.dueDate || "无"}）</small>
      </label>
      <button onclick="deleteTask(${i})">删除</button>
    ;
    taskList.appendChild(div);
  });
  updateTaskStats();
}

function updateTaskStats() {
  if (!taskStats) return;
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  taskStats.textContent = 共 ${total} 个任务，已完成 ${completed} 个;
}

function addTask() {
  const text = taskInput.value.trim();
  const dueDate = taskDueDate.value;
  const priority = taskPriority.value;
  if (!text) {
    alert("任务内容不能为空！");
    return;
  }
  tasks.push({ text, dueDate, priority, completed: false });
  saveTasks();
  renderTasks();
  taskInput.value = "";
  taskDueDate.value = "";
  taskPriority.value = "中";
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  if (!confirm("确定删除该任务吗？")) return;
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

taskSearch.addEventListener("input", renderTasks);
document.getElementById("addTaskBtn").addEventListener("click", addTask);

// 提醒管理
let reminders = [];
const reminderList = document.getElementById("reminderList");
const reminderInput = document.getElementById("reminderInput");
const reminderTime = document.getElementById("reminderTime");
const reminderSearch = document.getElementById("reminderSearchInput");
const reminderStats = document.getElementById("reminderStats");

function saveReminders() {
  localStorage.setItem("reminders", JSON.stringify(reminders));
}

function loadReminders() {
  const data = localStorage.getItem("reminders");
  if (data) reminders = JSON.parse(data);
}

function renderReminders() {
  if (!reminderList) return;
  const keyword = reminderSearch.value.trim().toLowerCase();
  reminderList.innerHTML = "";
  reminders.forEach((reminder, i) => {
    if (keyword && !reminder.text.toLowerCase().includes(keyword)) return;
    const div = document.createElement("div");
    div.className = "task";
    div.innerHTML = 
      <span>${escapeHtml(reminder.text)}</span> 
      <small>（提醒时间：${reminder.time || "无"}）</small>
      <button onclick="deleteReminder(${i})">删除</button>
    ;
    reminderList.appendChild(div);
  });
  updateReminderStats();
}

function updateReminderStats() {
  if (!reminderStats) return;
  reminderStats.textContent = 共 ${reminders.length} 个提醒;
}

function addReminder() {
  const text = reminderInput.value.trim();
  const time = reminderTime.value;
  if (!text) {
    alert("提醒内容不能为空！");
    return;
  }
  reminders.push({ text, time });
  saveReminders();
  renderReminders();
  reminderInput.value = "";
  reminderTime.value = "";
}

function deleteReminder(index) {
  if (!confirm("确定删除该提醒吗？")) return;
  reminders.splice(index, 1);
  saveReminders();
  renderReminders();
}

reminderSearch.addEventListener("input", renderReminders);
document.getElementById("addReminderBtn").addEventListener("click", addReminder);

// 笔记管理
let notes = [];
const noteInput = document.getElementById("noteInput");
const noteTags = document.getElementById("noteTags");
const noteSearch = document.getElementById("noteSearchInput");
const savedNotesList = document.getElementById("savedNotesList");
const saveBtn = document.getElementById("saveBtn");
const clearBtn = document.getElementById("clearBtn");

function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

function loadNotes() {
  const data = localStorage.getItem("notes");
  if (data) notes = JSON.parse(data);
}

function renderNotes() {
  if (!savedNotesList) return;
  const keyword = noteSearch.value.trim().toLowerCase();
  savedNotesList.innerHTML = "";
  notes.forEach((note, i) => {
    const contentMatch = note.content.toLowerCase().includes(keyword);
    const tagsMatch = note.tags.some(t => t.toLowerCase().includes(keyword));
    if (keyword && !contentMatch && !tagsMatch) return;
    const div = document.createElement("div");
    div.className = "note-item";
    div.innerHTML = 
      <div class="note-preview">
        <p>${escapeHtml(note.content.length > 50 ? note.content.slice(0, 50) + "..." : note.content)}</p>
        <small>标签: ${note.tags.join(", ")}</small>
        <div class="note-actions">
          <button onclick="editNote(${i})">编辑</button>
          <button onclick="deleteNote(${i})">删除</button>
        </div>
      </div>
    ;
    savedNotesList.appendChild(div);
  });
}

function saveNote() {
  const content = noteInput.value.trim();
  const tagsRaw = noteTags.value.trim();
  if (!content) {
    alert("笔记内容不能为空！");
    return;
  }
  const tags = tagsRaw ? tagsRaw.split(",").map(t => t.trim()).filter(t => t) : [];
  // 判断是新建还是编辑
  if (saveBtn.dataset.editIndex !== undefined) {
    const idx = parseInt(saveBtn.dataset.editIndex, 10);
    notes[idx] = { content, tags };
    delete saveBtn.dataset.editIndex;
  } else {
    notes.push({ content, tags });



