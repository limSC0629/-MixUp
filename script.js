async function loadPage(name) {
  const res = await fetch(`js/${name}.js`);
  const jsCode = await res.text();
  eval(jsCode);
}
document.getElementById("app").innerHTML = `
  <h2 class="text-xl font-bold mb-4">📅 每日事务</h2>
  <input id="taskInput" class="border p-2 mr-2" placeholder="输入新任务..." />
  <button onclick="addTask()" class="bg-blue-500 text-white px-3 py-1 rounded">添加</button>
  <ul id="taskList" class="mt-4 space-y-2"></ul>
`;

const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
const taskList = document.getElementById("taskList");

function renderTasks() {
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
}

function addTask() {
  const input = document.getElementById("taskInput");
  const val = input.value.trim();
  if (val) {
    tasks.push(val);
    input.value = "";
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
  }
}

function deleteTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

renderTasks();
