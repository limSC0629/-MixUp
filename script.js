// 页面切换
function showPage(pageId) {
  document.querySelectorAll("section").forEach(s => s.classList.remove("active"));
  document.querySelectorAll("nav button").forEach(b => b.classList.remove("active"));
  document.getElementById(pageId).classList.add("active");
  event.target.classList.add("active");
}

// 笔记本地存储
const notesInput = document.getElementById('notesInput');
notesInput.value = localStorage.getItem('notes') || '';
notesInput.addEventListener('input', () => {
  localStorage.setItem('notes', notesInput.value);
});

// 任务管理功能
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const div = document.createElement('div');
    div.className = 'task' + (task.completed ? ' completed' : '');
    div.innerHTML = `
      <label>
        <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${index})">
        <span>${task.text}</span>
      </label>
      <button onclick="deleteTask(${index})">删除</button>
    `;
    taskList.appendChild(div);
  });
}

function addTask() {
  const text = taskInput.value.trim();
  if (text) {
    tasks.push({ text, completed: false });
    taskInput.value = '';
    saveTasks();
    renderTasks();
  }
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function clearTasks() {
  if (confirm("确定要清空所有任务？")) {
    tasks = [];
    saveTasks();
    renderTasks();
  }
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

renderTasks();
