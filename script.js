// 页面切换功能
function showPage(id, button) {
  // 隐藏所有页面
  document.querySelectorAll("section").forEach(s => s.classList.remove("active"));
  // 移除所有按钮的激活状态
  document.querySelectorAll("nav button").forEach(b => b.classList.remove("active"));

  // 显示目标页面，激活当前按钮
  document.getElementById(id).classList.add("active");
  button.classList.add("active");
}

// ========== 每日计划功能 ==========
let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, i) => {
    const div = document.createElement('div');
    div.className = 'task' + (task.completed ? ' completed' : '');
    div.innerHTML = `
      <label><input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${i})">
      <span>${task.text}</span></label>
      <button onclick="deleteTask(${i})">删除</button>`;
    taskList.appendChild(div);
  });
}
function addTask() {
  const text = taskInput.value.trim();
  if (text) {
    tasks.push({ text, completed: false });
    saveTasks();
    taskInput.value = '';
    renderTasks();
  }
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
  if (confirm("确定清空所有计划？")) {
    tasks = [];
    saveTasks();
    renderTasks();
  }
}
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
renderTasks();

// ========== 提醒功能 ==========
let reminders = JSON.parse(localStorage.getItem('reminders') || '[]');
const reminderInput = document.getElementById('reminderInput');
const reminderList = document.getElementById('reminderList');

function renderReminders() {
  reminderList.innerHTML = '';
  reminders.forEach((text, i) => {
    const div = document.createElement('div');
    div.className = 'task';
    div.innerHTML = `<span>${text}</span><button onclick="deleteReminder(${i})">删除</button>`;
    reminderList.appendChild(div);
  });
}
function addReminder() {
  const text = reminderInput.value.trim();
  if (text) {
    reminders.push(text);
    saveReminders();
    reminderInput.value = '';
    renderReminders();
  }
}
function deleteReminder(i) {
  reminders.splice(i, 1);
  saveReminders();
  renderReminders();
}
function clearReminders() {
  if (confirm("确定清空所有提醒？")) {
    reminders = [];
    saveReminders();
    renderReminders();
  }
}
function saveReminders() {
  localStorage.setItem('reminders', JSON.stringify(reminders));
}
renderReminders();

// ========== 笔记功能 ==========
function generateId() {
  return Date.now().toString();
}

function getNotes() {
  return JSON.parse(localStorage.getItem("allNotes") || "[]");
}

function saveNotes(notes) {
  localStorage.setItem("allNotes", JSON.stringify(notes));
}

function renderSavedNotes() {
  const notes = getNotes();
  const list = document.getElementById("savedNotesList");
  list.innerHTML = "";

  if (notes.length === 0) {
    list.innerHTML = "<p>（暂无保存的笔记）</p>";
    return;
  }

  notes.forEach(note => {
    const div = document.createElement("div");
    div.className = "note-item";
    div.innerHTML = `
      <div class="note-preview">
        <strong>${note.title}</strong>
        <div class="note-actions">
          <button onclick="loadNote('${note.id}')">📂 载入</button>
          <button onclick="deleteNote('${note.id}')">🗑️ 删除</button>
        </div>
      </div>
    `;
    list.appendChild(div);
  });
}

function saveNote() {
  const content = document.getElementById("noteInput").value.trim();
  if (!content) return alert("请先输入笔记内容！");
  const title = prompt("给这条笔记取个标题：", "无标题");
  if (title === null) return;

  const notes = getNotes();
  notes.push({ id: generateId(), title: title || "无标题", content });
  saveNotes(notes);
  alert("✅ 已保存！");
  document.getElementById("noteInput").value = "";
  renderSavedNotes();
}

function loadNote(id) {
  const note = getNotes().find(n => n.id === id);
  if (!note) return;
  document.getElementById("noteInput").value = note.content;
  alert(`📂 已载入笔记「${note.title}」`);
}

function deleteNote(id) {
  if (!confirm("确定要删除这条笔记吗？")) return;
  const notes = getNotes().filter(n => n.id !== id);
  saveNotes(notes);
  renderSavedNotes();
}

function clearEditor() {
  document.getElementById("noteInput").value = "";
}

// 初始化笔记列表
renderSavedNotes();
