// 显示当前时间
function updateTime() {
  const now = new Date();
  const timeStr = now.toLocaleString('zh-CN', { hour12: false });
  document.getElementById('timeDisplay').textContent = '当前时间：' + timeStr;
}
setInterval(updateTime, 1000);
updateTime();

// ====== 待办事项 ======
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
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
    delBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // 阻止li点击事件
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

taskInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addTaskBtn.click();
});

renderTasks();


// ====== 日历提醒 ======
const picker = new Pikaday({
  field: document.getElementById('datepicker'),
  format: 'YYYY-MM-DD',
  toString(date, format) {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth()+1).toString().padStart(2,
