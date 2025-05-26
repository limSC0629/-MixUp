// 切换页面
function showPage(id) {
  document.querySelectorAll("section").forEach(s => s.classList.remove("active"));
  document.querySelectorAll("nav button").forEach(b => b.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  event.target.classList.add("active");
}

// 本地笔记
const notesInput = document.getElementById('notesInput');
notesInput.value = localStorage.getItem('notes') || '';
notesInput.addEventListener('input', () => {
  localStorage.setItem('notes', notesInput.value);
});

// 任务系统
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

// 提醒系统
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

let notes = JSON.parse(localStorage.getItem('notesList') || '[]');
let editingIndex = -1;

const noteTitle = document.getElementById('noteTitle');
const noteContent = document.getElementById('noteContent');
const notesList = document.getElementById('notesList');

function renderNotes() {
  notesList.innerHTML = '';
  notes.forEach((note, i) => {
    const div = document.createElement('div');
    div.className = 'note-card';
    div.innerHTML = `
      <h3>${note.title || '无标题'}</h3>
      <p>${note.content}</p>
      <div class="note-actions">
        <button class="edit" onclick="editNote(${i})">编辑</button>
        <button onclick="deleteNote(${i})">删除</button>
      </div>`;
    notesList.appendChild(div);
  });
}

function saveNote() {
  const title = noteTitle.value.trim();
  const content = noteContent.value.trim();
  if (!content) return alert("请输入内容");

  if (editingIndex >= 0) {
    notes[editingIndex] = { title, content };
    editingIndex = -1;
  } else {
    notes.push({ title, content });
  }

  localStorage.setItem('notesList', JSON.stringify(notes));
  noteTitle.value = '';
  noteContent.value = '';
  renderNotes();
}

function editNote(i) {
  noteTitle.value = notes[i].title;
  noteContent.value = notes[i].content;
  editingIndex = i;
  noteContent.scrollIntoView({ behavior: 'smooth' });
}

function deleteNote(i) {
  if (confirm("确认删除该笔记？")) {
    notes.splice(i, 1);
    localStorage.setItem('notesList', JSON.stringify(notes));
    renderNotes();
  }
}

renderNotes();

