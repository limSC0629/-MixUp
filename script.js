// 时间显示
function updateTime() {
  const now = new Date();
  const timeStr = now.toLocaleString('zh-CN', { hour12: false });
  document.getElementById('timeDisplay').textContent = '当前时间：' + timeStr;
}
setInterval(updateTime, 1000);
updateTime();

// ------------- 待办事项 ----------------
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const clearTasksBtn = document.getElementById('clearTasksBtn');
const taskList = document.getElementById('taskList');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.textContent = task.text;
    li.className = task.completed ? 'completed' : '';

    // 点击切换完成状态
    li.addEventListener('click', () => {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
    });

    // 删除按钮
    const delBtn = document.createElement('button');
    delBtn.textContent = '删除';
    delBtn.title = '删除任务';
    delBtn.addEventListener('click', e => {
      e.stopPropagation();
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    li.appendChild(delBtn);
    taskList.appendChild(li);
  });
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

addTaskBtn.addEventListener('click', () => {
  const val = taskInput.value.trim();
  if (val) {
    tasks.push({ text: val, completed: false });
    saveTasks();
    renderTasks();
    taskInput.value = '';
    taskInput.focus();
  }
});

taskInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') addTaskBtn.click();
});

// 清空所有任务按钮
clearTasksBtn.addEventListener('click', () => {
  if (confirm('确定要清空所有任务吗？')) {
    tasks = [];
    saveTasks();
    renderTasks();
  }
});

renderTasks();

// ----------- 日历提醒 ------------------

// 记得你需要引入Pikaday的js和css，或者用浏览器自带的<input type="date">

// 这里用浏览器自带日期选择，避免额外依赖
const datepicker = document.getElementById('datepicker');
datepicker.type = 'date';

const eventInput = document.getElementById('eventInput');
const addEventBtn = document.getElementById('addEventBtn');
const eventList = document.getElementById('eventList');

let events = JSON.parse(localStorage.getItem('events')) || {};

function renderEvents() {
  eventList.innerHTML = '';

  const dates = Object.keys(events).sort();
  dates.forEach(date => {
    events[date].forEach((eventText, idx) => {
      const li = document.createElement('li');
      li.textContent = `${date} - ${eventText}`;

      const delBtn = document.createElement('button');
      delBtn.textContent = '删除';
      delBtn.title = '删除事件';
      delBtn.addEventListener('click', () => {
        events[date].splice(idx, 1);
        if (events[date].length === 0) delete events[date];
        saveEvents();
        renderEvents();
      });

      li.appendChild(delBtn);
      eventList.appendChild(li);
    });
  });
}

function saveEvents() {
  localStorage.setItem('events', JSON.stringify(events));
}

addEventBtn.addEventListener('click', () => {
  const date = datepicker.value.trim();
  const text = eventInput.value.trim();

  if (!date) {
    alert('请选择日期');
    return;
  }
  if (!text) {
    alert('请输入事件内容');
    return;
  }

  if (!events[date]) events[date] = [];
  events[date].push(text);

  saveEvents();
  renderEvents();

  eventInput.value = '';
  eventInput.focus();
});

renderEvents();
