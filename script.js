function switchPage(name) {
  document.querySelectorAll('#sidebar button').forEach(btn => btn.classList.remove('active'));
  document.getElementById('menu-' + name).classList.add('active');
  loadPage(name);
}

// 初始化
loadPage('home');
loadTheme();
requestNotificationPermission();
setInterval(checkRemindersNotification, 60 * 1000);


// main function loader
function loadPage(name) {
  const pages = {
    tasks: initTasks,
    notes: initNotes,
    reminders: initReminders
  };
  if (pages[name]) pages[name]();
}

// 每日事务功能
function initTasks() {
  document.getElementById("app").innerHTML = `
    <h2 class="text-xl font-bold mb-4">📅 每日事务</h2>
    <input id="taskInput" class="border p-2 mr-2" placeholder="输入新任务..." />
    <button onclick="addTask()" class="bg-blue-500 text-white px-3 py-1 rounded">添加</button>
    <ul id="taskList" class="mt-4 space-y-2"></ul>
  `;

  const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  const taskList = document.getElementById("taskList");

  window.renderTasks = function () {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
      const li = document.createElement("li");
      li.className = "flex justify-between items-center bg-white p-2 rounded shadow";
      li.innerHTML = `
        <span>${task}</span>
        <button onclick="deleteTask(${index})" class="text-red-500">删除</button>
      `;
      taskList.appendChild(li);
    });
  };

  window.addTask = function () {
    const input = document.getElementById("taskInput");
    const val = input.value.trim();
    if (val) {
      tasks.push(val);
      input.value = "";
      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderTasks();
    }
  };

  window.deleteTask = function (index) {
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
  };

  renderTasks();
}

// 笔记功能
function initNotes() {
  document.getElementById("app").innerHTML = `
    <h2 class="text-xl font-bold mb-4">📝 笔记本</h2>
    <textarea id="noteArea" rows="10" class="w-full border p-3"></textarea>
    <button onclick="saveNote()" class="mt-2 bg-green-600 text-white px-3 py-1 rounded">保存笔记</button>
  `;

  const noteArea = document.getElementById("noteArea");
  noteArea.value = localStorage.getItem("note") || "";

  window.saveNote = function () {
    localStorage.setItem("note", noteArea.value);
    alert("已保存！");
  };
}

// 提醒功能
function initReminders() {
  document.getElementById("app").innerHTML = `
    <h2 class="text-xl font-bold mb-4">⏰ 提醒</h2>
    <input id="reminderInput" class="border p-2 mr-2" placeholder="输入提醒内容..." />
    <input id="reminderTime" type="time" class="border p-2 mr-2" />
    <button onclick="addReminder()" class="bg-purple-500 text-white px-3 py-1 rounded">添加</button>
    <ul id="reminderList" class="mt-4 space-y-2"></ul>
  `;

  const reminders = JSON.parse(localStorage.getItem("reminders") || "[]");
  const reminderList = document.getElementById("reminderList");

  window.renderReminders = function () {
    reminderList.innerHTML = "";
    reminders.forEach((item, index) => {
      const li = document.createElement("li");
      li.className = "flex justify-between items-center bg-white p-2 rounded shadow";
      li.innerHTML = `
        <span>${item.time} - ${item.text}</span>
        <button onclick="deleteReminder(${index})" class="text-red-500">删除</button>
      `;
      reminderList.appendChild(li);
    });
  };

  window.addReminder = function () {
    const text = document.getElementById("reminderInput").value;
    const time = document.getElementById("reminderTime").value;
    if (text && time) {
      reminders.push({ text, time });
      localStorage.setItem("reminders", JSON.stringify(reminders));
      renderReminders();
    }
  };

  window.deleteReminder = function (index) {
    reminders.splice(index, 1);
    localStorage.setItem("reminders", JSON.stringify(reminders));
    renderReminders();
  };

  renderReminders();
}

// 主题切换
function setTheme(theme) {
  if (theme === 'dark') {
    document.body.classList.add('dark');
    document.body.classList.remove('light');
  } else {
    document.body.classList.add('light');
    document.body.classList.remove('dark');
  }
  localStorage.setItem('theme', theme);
  document.getElementById('themeToggleBtn').textContent = theme === 'dark' ? '🌞 亮色模式' : '🌙 暗色模式';
}

function loadTheme() {
  const theme = localStorage.getItem('theme') || 'light';
  setTheme(theme);
}

// 主题按钮事件
function toggleTheme() {
  const current = localStorage.getItem('theme') || 'light';
  setTheme(current === 'dark' ? 'light' : 'dark');
}

// 数据导出
function exportData() {
  const data = {
    tasks: JSON.parse(localStorage.getItem('tasks') || '[]'),
    note: localStorage.getItem('note') || '',
    reminders: JSON.parse(localStorage.getItem('reminders') || '[]'),
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'mixup-backup.json';
  a.click();
  URL.revokeObjectURL(url);
}

// 数据导入
function importData(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const data = JSON.parse(e.target.result);
      if (data.tasks) localStorage.setItem('tasks', JSON.stringify(data.tasks));
      if (data.note !== undefined) localStorage.setItem('note', data.note);
      if (data.reminders) localStorage.setItem('reminders', JSON.stringify(data.reminders));
      alert('导入成功！请刷新页面查看更新');
    } catch {
      alert('导入失败，文件格式错误');
    }
  };
  reader.readAsText(file);
}

// 清除所有数据
function clearAllData() {
  if (confirm('确定要清除所有数据吗？此操作不可撤销！')) {
    localStorage.clear();
    alert('已清除所有数据，请刷新页面');
  }
}

// 搜索功能（任务和笔记）
function searchTasks(keyword) {
  const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  return tasks.filter(t => t.includes(keyword));
}

function searchNotes(keyword) {
  const note = localStorage.getItem('note') || '';
  return note.includes(keyword);
}

// 浏览器通知提醒
function requestNotificationPermission() {
  if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission();
  }
}

function checkRemindersNotification() {
  const reminders = JSON.parse(localStorage.getItem('reminders') || '[]');
  const now = new Date();
  reminders.forEach(rem => {
    const [hour, minute] = rem.time.split(':').map(Number);
    if (hour === now.getHours() && minute === now.getMinutes()) {
      if (Notification.permission === 'granted') {
        new Notification('杂铺 MixUp 提醒', { body: rem.text, icon: 'https://cdn-icons-png.flaticon.com/512/270/270798.png' });
      }
    }
  });
}

// 主加载函数
function loadPage(name) {
  const pages = {
    tasks: initTasks,
    notes: initNotes,
    reminders: initReminders,
    home: initHome
  };
  if (pages[name]) pages[name]();
}

// 首页显示及功能按钮添加
function initHome() {
  document.getElementById('app').innerHTML = `
    <h2 class="text-xl font-bold mb-4">欢迎使用「杂铺 MixUp」</h2>
    <button id="themeToggleBtn" onclick="toggleTheme()" class="mr-2 mb-2 px-3 py-1 rounded border">切换主题</button>
    <button onclick="exportData()" class="mr-2 mb-2 px-3 py-1 rounded border">导出数据</button>
    <label class="mr-2 mb-2 px-3 py-1 rounded border cursor-pointer">
      导入数据
      <input type="file" accept="application/json" onchange="importData(event)" style="display:none" />
    </label>
    <button onclick="clearAllData()" class="mr-2 mb-2 px-3 py-1 rounded border text-red-600">清除所有数据</button>
    <p>请选择左侧功能开始使用。</p>
  `;
  loadTheme();
  requestNotificationPermission();
  setInterval(checkRemindersNotification, 60 * 1000);
}

// 任务功能（带搜索）
function initTasks() {
  document.getElementById('app').innerHTML = `
    <h2 class="text-xl font-bold mb-4">📅 每日事务</h2>
    <input id="taskInput" class="border p-2 mr-2" placeholder="输入新任务..." />
    <button onclick="addTask()" class="bg-blue-500 text-white px-3 py-1 rounded">添加</button>
    <input id="taskSearch" class="border p-2 ml-4" placeholder="搜索任务..." oninput="renderTasks(this.value)" />
    <ul id="taskList" class="mt-4 space-y-2"></ul>
  `;

  const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  const taskList = document.getElementById('taskList');

  window.renderTasks = function (filter = '') {
    taskList.innerHTML = '';
    tasks
      .filter(task => task.includes(filter))
      .forEach((task, index) => {
        const li = document.createElement('li');
        li.className = 'flex justify-between items-center bg-white p-2 rounded shadow';
        li.innerHTML = `
          <span>${task}</span>
          <button onclick="deleteTask(${index})" class="text-red-500">删除</button>
        `;
        taskList.appendChild(li);
      });
  };

  window.addTask = function () {
    const input = document.getElementById('taskInput');
    const val = input.value.trim();
    if (val) {
      tasks.push(val);
      input.value = '';
      localStorage.setItem('tasks', JSON.stringify(tasks));
      renderTasks();
    }
  };

  window.deleteTask = function (index) {
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
  };

  renderTasks();
}

// 笔记功能（带搜索）
function initNotes() {
  document.getElementById('app').innerHTML = `
    <h2 class="text-xl font-bold mb-4">📝 笔记本</h2>
    <textarea id="noteArea" rows="10" class="w-full border p-3" placeholder="请输入笔记内容..."></textarea>
    <button onclick="saveNote()" class="mt-2 bg-green-600 text-white px-3 py-1 rounded">保存笔记</button>
    <input id="noteSearch" class="border p-2 mt-4 w-full" placeholder="搜索笔记内容..." oninput="searchNoteRender(this.value)" />
    <div id="noteSearchResult" class="mt-2"></div>
  `;

  const noteArea = document.getElementById('noteArea');
  noteArea.value = localStorage.getItem('note') || '';

  window.saveNote = function () {
    localStorage.setItem('note', noteArea.value);
    alert('已保存！');
  };

  window.searchNoteRender = function (keyword) {
    const note = localStorage.getItem('note') || '';
    const resultDiv = document.getElementById('noteSearchResult');
    if (keyword.trim() === '') {
      resultDiv.textContent = '';
      return;
    }
    if (note.includes(keyword)) {
      // 简单高亮展示
      const regex = new RegExp(`(${keyword})`, 'gi');
      const highlighted = note.replace(regex, '<mark>$1</mark>');
      resultDiv.innerHTML = `<p>搜索结果:</p><pre class="whitespace-pre-wrap bg-yellow-100 p-2 rounded">${highlighted}</pre>`;
    } else {
      resultDiv.textContent = '未找到匹配内容';
    }
  };
}

// 提醒功能（带推送和分类）
function initReminders() {
  document.getElementById('app').innerHTML = `
    <h2 class="text-xl font-bold mb-4">⏰ 提醒</h2>
    <input id="reminderInput" class="border p-2 mr-2" placeholder="输入提醒内容..." />
    <input id="reminderTag" class="border p-2 mr-2" placeholder="标签（选填）" />
    <input id="reminderTime" type="time" class="border p-2 mr-2" />
    <button onclick="addReminder()" class="bg-purple-500 text-white px-3 py-1 rounded">添加</button>
    <ul id="reminderList" class="mt-4 space-y-2"></ul>
  `;

  const reminders = JSON.parse(localStorage.getItem('reminders') || '[]');
  const reminderList = document.getElementById('reminderList');

  window.renderReminders = function (filter = '') {
    reminderList.innerHTML = '';
    reminders
      .filter(rem => rem.text.includes(filter) || (rem.tag && rem.tag.includes(filter)))
      .forEach((item, index) => {
        const li = document.createElement('li');
        li.className = 'flex justify-between items-center bg-white p-2 rounded shadow';
        li.innerHTML = `
          <span>[${item.tag || '无标签'}] ${item.time} - ${item.text}</span>
          <button onclick="deleteReminder(${index})" class="text-red-500">删除</button>
        `;
        reminderList.appendChild(li);
      });
  };

  window.addReminder = function () {
    const text = document.getElementById('reminderInput').value.trim();
    const tag = document.getElementById('reminderTag').value.trim();
    const time = document.getElementById('reminderTime').value;
    if (text && time) {
      reminders.push({ text, tag, time });
      localStorage.setItem('reminders', JSON.stringify(reminders));
      renderReminders();
    }
  };

  window.deleteReminder = function (index) {
    reminders.splice(index, 1);
    localStorage.setItem('reminders', JSON.stringify(reminders));
    renderReminders();
  };

  renderReminders();
}

// 初始化默认首页
loadPage('home');
loadTheme();
requestNotificationPermission();
setInterval(checkRemindersNotification, 60 * 1000);
