// == 页面切换 ==
function showPage(id, btn) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.querySelectorAll("nav button").forEach(b => b.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  btn.classList.add("active");
}

// == 主题切换 ==
function toggleDarkMode() {
  document.body.classList.toggle("dark");
  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
}
function loadTheme() {
  const theme = localStorage.getItem("theme") || "light";
  if (theme === "dark") {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
}

// == 任务 (Tasks) ==
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
  updateTaskStats();
}

function updateTaskStats() {
  if (!taskStats) return;
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  taskStats.textContent = `共 ${total} 个任务，已完成 ${completed} 个`;
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

// == 提醒 (Reminders) ==
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
    div.innerHTML = `
      <span>${escapeHtml(reminder.text)}</span> 
      <small>（提醒时间：${reminder.time || "无"}）</small>
      <button onclick="deleteReminder(${i})">删除</button>
    `;
    reminderList.appendChild(div);
  });
  updateReminderStats();
}

function updateReminderStats() {
  if (!reminderStats) return;
  const total = reminders.length;
  reminderStats.textContent = `共 ${total} 个提醒`;
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

// == 笔记 (Notes) ==
const noteInput = document.getElementById("noteInput");
const noteTags = document.getElementById("noteTags");
const savedNotesList = document.getElementById("savedNotesList");
const noteSearch = document.getElementById("noteSearchInput");

function getNotes() {
  const data = localStorage.getItem("notes");
  return data ? JSON.parse(data) : [];
}

function saveNotes(notes) {
  localStorage.setItem("notes", JSON.stringify(notes));
}

function generateId() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

function renderSavedNotes() {
  if (!savedNotesList) return;
  const notes = getNotes();
  const keyword = noteSearch.value.trim().toLowerCase();
  savedNotesList.innerHTML = "";
  const filtered = notes.filter(note => {
    const title = note.title || "";
    const content = note.content || "";
    const tags = note.tags || [];
    return title.toLowerCase().includes(keyword)
      || content.toLowerCase().includes(keyword)
      || tags.some(tag => tag.toLowerCase().includes(keyword));
  });

  if (filtered.length === 0) {
    savedNotesList.innerHTML = "<p>（暂无符合条件的笔记）</p>";
    return;
  }

  filtered.forEach(note => {
    const div = document.createElement("div");
    div.className = "note-item";
    div.innerHTML = `
      <div class="note-preview">
        <strong>${escapeHtml(note.title || "无标题")}</strong> 
        <em>[标签：${escapeHtml(note.tags ? note.tags.join(", ") : "")}]</em>
        <div class="note-actions">
          <button onclick="loadNote('${note.id}')">📂 载入</button>
          <button onclick="deleteNote('${note.id}')">🗑️ 删除</button>
        </div>
      </div>
      <p>${escapeHtml(note.content.substring(0, 100))}${note.content.length > 100 ? "..." : ""}</p>
    `;
    savedNotesList.appendChild(div);
  });
}

function saveNote() {
  const content = noteInput.value.trim();
  if (!content) {
    alert("笔记内容不能为空！");
    return;
  }
  const title = prompt("请输入笔记标题：") || "无标题";
  const tags = noteTags.value.split(",").map(t => t.trim()).filter(t => t);
  const notes = getNotes();

  // 是否是编辑模式
  const editingId = noteInput.dataset.editingId;
  if (editingId) {
    const idx = notes.findIndex(n => n.id === editingId);
    if (idx !== -1) {
      notes[idx].title = title;
      notes[idx].content = content;
      notes[idx].tags = tags;
    }
    delete noteInput.dataset.editingId;
  } else {
    notes.push({ id: generateId(), title, content, tags });
  }

  saveNotes(notes);
  renderSavedNotes();
  clearNoteInput();
}

function clearNoteInput() {
  noteInput.value = "";
  noteTags.value = "";
  delete noteInput.dataset.editingId;
}

function loadNote(id) {
  const notes = getNotes();
  const note = notes.find(n => n.id === id);
  if (!note) {
    alert("找不到该笔记");
    return;
  }
  noteInput.value = note.content;
  noteTags.value = note.tags ? note.tags.join(", ") : "";
  noteInput.dataset.editingId = id;
}

function deleteNote(id) {
  if (!confirm("确定删除该笔记吗？")) return;
  let notes = getNotes();
  notes = notes.filter(n => n.id !== id);
  saveNotes(notes);
  renderSavedNotes();
  clearNoteInput();
}

// == 导入导出 ==
function exportData(type) {
  let data = [];
  let filename = "";
  if (type === "tasks") {
    data = tasks;
    filename = "tasks.json";
  } else if (type === "reminders") {
    data = reminders;
    filename = "reminders.json";
  } else if (type === "notes") {
    data = getNotes();
    filename = "notes.json";
  } else {
    alert("未知导出类型");
    return;
  }

  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function importData(event, type) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    try {
      const imported = JSON.parse(e.target.result);
      if (!Array.isArray(imported)) throw new Error("格式错误：必须是数组");
      if (type === "tasks") {
        tasks = imported;
        saveTasks();
        renderTasks();
      } else if (type === "reminders") {
        reminders = imported;
        saveReminders();
        renderReminders();
      } else if (type === "notes") {
        saveNotes(imported);
        renderSavedNotes();
      } else {
        alert("未知导入类型");
      }
      alert("导入成功！");
      event.target.value = ""; // 清空选择
    } catch (err) {
      alert("导入失败：" + err.message);
    }
  };
  reader.readAsText(file);
}

// == 工具函数: 防止XSS，转义HTML ==
function escapeHtml(text) {
  if (!text) return "";
  return text.replace(/[&<>"']/g, function (m) {
    return ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    })[m];
  });
}

// == 事件绑定 ==
document.getElementById("addTaskBtn").onclick = addTask;
taskSearch.oninput = renderTasks;

document.getElementById("addReminderBtn").onclick = addReminder;
reminderSearch.oninput = renderReminders;

document.getElementById("saveBtn").onclick = saveNote;
document.getElementById("clearBtn").onclick = clearNoteInput;
noteSearch.oninput = renderSavedNotes;

// 初始化加载
window.onload = () => {
  loadTheme();
  loadTasks();
  loadReminders();
  renderTasks();
  renderReminders();
  renderSavedNotes();
};
