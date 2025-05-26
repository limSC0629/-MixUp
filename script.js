// 页面切换功能
const buttons = document.querySelectorAll('nav button');
const sections = document.querySelectorAll('section');

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    sections.forEach(s => s.classList.remove('active'));
    document.getElementById(btn.dataset.section).classList.add('active');
  });
});

// 1. 笔记管理
const notes = document.getElementById('notes');
const saveNotesBtn = document.getElementById('saveNotesBtn');
const notesStatus = document.getElementById('notesStatus');
notes.value = localStorage.getItem('notes') || '';
saveNotesBtn.addEventListener('click', () => {
  localStorage.setItem('notes', notes.value);
  notesStatus.textContent = '笔记已保存！';
  setTimeout(() => notesStatus.textContent = '', 2000);
});

// 2. 任务清单
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, i) => {
    const li = document.createElement('li');
    li.textContent = task;

    const delBtn = document.createElement('button');
    delBtn.textContent = '删除';
    delBtn.onclick = () => {
      tasks.splice(i, 1);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      renderTasks();
    };
    li.appendChild(delBtn);
    taskList.appendChild(li);
  });
}
renderTasks();

taskInput.addEventListener('keydown', e => {
  if (e.key === 'Enter' && taskInput.value.trim()) {
    tasks.push(taskInput.value.trim());
    localStorage.setItem('tasks', JSON.stringify(tasks));
    taskInput.value = '';
    renderTasks();
  }
});

// 3. 简易日历提醒
const calendar = document.getElementById('calendar');
const eventDate = document.getElementById('eventDate');
const eventDesc = document.getElementById('eventDesc');
const addEventBtn = document.getElementById('addEventBtn');
const eventList = document.getElementById('eventList');
let events = JSON.parse(localStorage.getItem('events')) || [];

function renderEvents() {
  eventList.innerHTML = '';
  events.forEach((ev, i) => {
    const li = document.createElement('li');
    li.textContent = `${ev.date}: ${ev.desc}`;

    const delBtn = document.createElement('button');
    delBtn.textContent = '删除';
    delBtn.onclick = () => {
      events.splice(i, 1);
      localStorage.setItem('events', JSON.stringify(events));
      renderEvents();
    };
    li.appendChild(delBtn);
    eventList.appendChild(li);
  });
}
renderEvents();

addEventBtn.onclick = () => {
  if (!eventDate.value || !eventDesc.value.trim()) return alert('请选择日期并输入事件描述');
  events.push({ date: eventDate.value, desc: eventDesc.value.trim() });
  localStorage.setItem('events', JSON.stringify(events));
  eventDate.value = '';
  eventDesc.value = '';
  renderEvents();
};

// 4. 收藏夹
const bookmarkName = document.getElementById('bookmarkName');
const bookmarkURL = document.getElementById('bookmarkURL');
const addBookmarkBtn = document.getElementById('addBookmarkBtn');
const bookmarkList = document.getElementById('bookmarkList');
let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];

function renderBookmarks() {
  bookmarkList.innerHTML = '';
  bookmarks.forEach((bm, i) => {
    const li = document.createElement('li');
    const a = document.create