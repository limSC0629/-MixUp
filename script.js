// 页面切换
document.querySelectorAll("nav button").forEach(btn => {
  btn.addEventListener("click", () => {
    const targetId = btn.dataset.target;
    if (!targetId) return;

    // 切换section
    document.querySelectorAll("section").forEach(s => s.classList.remove("active"));
    document.getElementById(targetId).classList.add("active");

    // 切换按钮激活状态
    document.querySelectorAll("nav button").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
  });
});

// ========== 每日计划功能 ==========
let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const addTaskBtn = document.getElementById('addTaskBtn');
const clearTasksBtn = document.getElementById('clearTasksBtn');

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, i) => {
    const div = document.createElement('div');
    div.className = 'task' + (task.completed ? ' completed' : '');
    div.innerHTML = `
      <label><input type="checkbox" ${task.completed ? 'checked' : ''} data-index="${i}" class="task-checkbox">
      <span>${task.text}</span></label>
      <button data-index="${i}" class="delete-task-btn">删除</button>
    `;
    taskList.appendChild(div);
  });
}

// 事件委托处理计划的勾选与删除
taskList.addEventListener('change', e => {
  if (e.target.classList.contains('task-checkbox')) {
    const i = e.target.dataset.index;
    tasks[i].completed = e.target.checked;
    saveTasks();
    renderTasks();
  }
});

taskList.addEventListener('click', e => {
  if (e.target.classList.contains('delete-task-btn')) {
    const i = e.target.dataset.index;
    tasks.splice(i, 1);
    saveTasks();
    renderTasks();
  }
});

addTaskBtn.onclick = () => {
  const text = taskInput.value.trim();
  if (!text) return alert("请输入计划内容！");
  tasks.push({ text, completed: false });
  saveTasks();
  taskInput.value = '';
  renderTasks();
};

clearTasksBtn.onclick = () => {
  if (confirm("确定清空所有计划？")) {
    tasks = [];
    saveTasks();
    renderTasks();
  }
};

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

renderTasks();

// ========== 提醒功能 ==========
let reminders = JSON.parse(localStorage.getItem('reminders') || '[]');

const reminderInput = document.getElementById('reminderInput');
const reminderList = document.getElementById('reminderList');
const addReminderBtn = document.getElementById('addReminderBtn');
const clearRemindersBtn = document.getElementById('clearRemindersBtn');

function renderReminders() {
  reminderList.innerHTML = '';
  reminders.forEach((text, i) => {
    const div = document.createElement('div');
    div.className = 'task';
    div.innerHTML = `<span>${text}</span><button data-index="${i}" class="delete-reminder-btn">删除</button>`;
    reminderList.appendChild(div);
  });
}

// 事件委托处理提醒删除
reminderList.addEventListener('click', e => {
  if (e.target.classList.contains('delete-reminder-btn')) {
    const i = e.target.dataset.index;
    reminders.splice(i, 1);
    saveReminders();
    renderReminders();
  }
});

addReminderBtn.onclick = () => {
  const text = reminderInput.value.trim();
  if (!text) return alert("请输入提醒内容！");
  reminders.push(text);
  saveReminders();
  reminderInput.value = '';
  renderReminders();
};

clearRemindersBtn.onclick = () => {
  if (confirm("确定清空所有提醒？")) {
    reminders = [];
    saveReminders();
    renderReminders();
  }
};

function saveReminders() {
  localStorage.setItem('reminders', JSON.stringify(reminders));
}

renderReminders();

// ========== 笔记功能 ==========
const noteInput = document.getElementById('noteInput');
const savedNotesList = document.getElementById('savedNotesList');
const saveBtn = document.getElementById('saveBtn');
const clearBtn = document.getElementById('clearBtn');

function generateId() {
  return Date.now().toString();
}

function getNotes() {
  return JSON.parse(localStorage.getItem("allNotes") || "[]");
}

function saveNotes(notes) {
  localStorage.setItem("allNotes", JSON.stringify(notes));
}

function escapeHtml(text) {
  return text.replace(/[&<>"']/g, function(m) {
    return {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[m];
  });
}

function renderSavedNotes() {
  const notes = getNotes();
  savedNotesList.innerHTML = "";

  if (notes.length === 0) {
    savedNotesList.innerHTML = "<p>（暂无保存的笔记）</p>";
    return;
  }

  notes.forEach(note => {
    const div = document.createElement("div");
    div.className = "note-item";
    div.innerHTML = `
      <div class="note-preview">
        <strong>${escapeHtml(note.title)}</strong>
        <div class="note-actions">
          <button class="load-note-btn" data-id="${note.id}">📂 载入</button>
          <button class="delete-note-btn" data-id="${note.id}">🗑️ 删除</button>
        </div>
      </div>
    `;
    savedNotesList.appendChild(div);
  });
}

// 事件委托处理笔记的载入与删除
savedNotesList.addEventListener('click', e => {
  if (e.target.classList.contains('load-note-btn')) {
    const id = e.target.dataset.id;
    loadNote(id);
  }
  if (e.target.classList.contains('delete-note-btn')) {
    const id = e.target.dataset.id;
    deleteNote(id);
  }
});

function saveNote() {
  const content = noteInput.value.trim();
  if (!content) {
    alert("⚠️ 请先输入笔记内容！");
    return;
  }
  const title = prompt("给这条笔记取个标题：", content.slice(0, 15) || "无标题");
  if (title === null) return; // 取消保存

  const notes = getNotes();
  notes.push({ id: generateId(), title: title.trim() || "无标题", content });
  saveNotes(notes);
  alert("✅ 已保存笔记！");
  noteInput.value = "";
  renderSavedNotes();
}

function loadNote(id) {
  const note = getNotes().find(n => n.id === id);
  if (!note) {
    alert("❌ 找不到该笔记");
    return;
  }
  noteInput.value = note.content;
  alert(`📂 已载入笔记「${note.title}」`);
}

function deleteNote(id) {
  if (!confirm("确定删除这条笔记吗？")) return;
  const notes = getNotes().filter(n => n.id !== id);
  saveNotes(notes);
  renderSavedNotes();
}

function clearInput() {
  noteInput.value = "";
}

saveBtn.onclick = saveNote;
clearBtn.onclick = clearInput;

renderSavedNotes();
