// 显示当前时间
function updateTime() {
  const now = new Date();
  const timeStr = now.toLocaleString('zh-CN', { hour12: false });
  document.getElementById('timeDisplay').textContent = '当前时间：' + timeStr;
}
setInterval(updateTime, 1000);
updateTime();

// 学习笔记自动保存
const notes = document.getElementById('notes');
notes.value = localStorage.getItem('studyNotes') || '';
notes.addEventListener('input', () => {
  localStorage.setItem('studyNotes', notes.value);
});

// 每日计划任务逻辑
const datepicker = document.getElementById('datepicker');
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const clearAllBtn = document.getElementById('clearAllBtn');
const taskListContainer = document.getElementById('taskListContainer');

let tasks = JSON.parse(localStorage.getItem('studyTasks')) || [];

// 保存任务
function saveTasks() {
  localStorage.setItem('studyTasks', JSON.stringify(tasks));
}

// 渲染任务，按日期分组
function renderTasks() {
  taskListContainer.innerHTML = '';

  if (tasks.length === 0) {
    taskListContainer.textContent = '暂无任务';
    return;
  }

  // 按日期排序和分组
  const grouped = tasks.reduce((acc, task) => {
    if (!acc[task.date]) acc[task.date] = [];
    acc[task.date].push(task);
    return acc;
  }, {});

  // 日期排序升序
  const sortedDates = Object.keys(grouped).sort();

  sortedDates.forEach(date => {
    const groupDiv = document.createElement('div');
    groupDiv.className = 'task-date-group';

    // 日期标题
    const dateTitle = document.createElement('h3');
    dateTitle.textContent = date;
    groupDiv.appendChild(dateTitle);

    // 任务列表
    const ul = document.createElement('ul');
    ul.className = 'task-list';

    grouped[date].forEach((task, index) => {
      const li = document.createElement('li');
      li.className = task.completed ? 'completed' : '';

      // 复选框
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = task.completed;
      checkbox.addEventListener('change', () => {
        // 更新对应任务完成状态
        const globalIndex = tasks.findIndex(t => t.id === task.id);
        if (globalIndex !== -1) {
          tasks[globalIndex].completed = checkbox.checked;
          saveTasks();
          renderTasks();
        }
      });

      li.appendChild(checkbox);

      // 任务文本
      const span = document.createElement('span');
      span.textContent = task.text;
      li.appendChild(span);

      // 删除按钮
      const delBtn = document.createElement('button');
      delBtn.textContent = '删除';
      delBtn.title = '删除任务';
      delBtn.addEventListener('click', e => {
        e.stopPropagation();
        const globalIndex = tasks.findIndex(t => t.id === task.id);
        if (globalIndex !== -1) {
          tasks.splice(globalIndex, 1);
          saveTasks();
          renderTasks();
        }
      });
      li.appendChild(delBtn);

      ul.appendChild(li);
    });

    groupDiv.appendChild(ul);
    taskListContainer.appendChild(groupDiv);
  });
}

// 添加任务
addTaskBtn.addEventListener('click', () => {
  const date = datepicker.value;
  const text = taskInput.value.trim();
  if (!date) {
    alert('请选择日期！');
    return;
  }
  if (!text) {
    alert('请输入任务内容！');
    return;
  }
  tasks.push({
    id: Date.now(),
    date,
    text,
    completed: false,
  });
  saveTasks();
  renderTasks();
  taskInput.value = '';
  datepicker.value = '';
  taskInput.focus();
});

// 支持回车键添加任务（任务输入框或日期选中时）
taskInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    addTaskBtn.click();
  }
});
datepicker.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    addTaskBtn.click();
  }
});

// 清空所有任务
clearAllBtn.addEventListener('click', () => {
  if (confirm('确认清空所有任务吗？')) {
    tasks = [];
    saveTasks();
    renderTasks();
  }
});

renderTasks();
