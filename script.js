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

