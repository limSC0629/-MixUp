// 页面切换
document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const page = btn.getAttribute('data-page');
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(page + '-page').classList.add('active');
  });
});

// 夜间模式
const darkToggle = document.getElementById('dark-mode-toggle');
darkToggle.addEventListener('change', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('darkMode', document.body.classList.contains('dark'));
});

if (localStorage.getItem('darkMode') === 'true') {
  document.body.classList.add('dark');
  darkToggle.checked = true;
}

// 添加计划
function addTask() {
  const input = document.getElementById('task-input');
  const task = input.value.trim();
  if (task) {
    const li = document.createElement('li');
    li.textContent = task;
    li.onclick = () => li.remove();
    document.getElementById('task-list').appendChild(li);
    input.value = '';
  }
}

// 添加笔记
function addNote() {
  const input = document.getElementById('note-input');
  const note = input.value.trim();
  if (note) {
    const div = document.createElement('div');
    div.textContent = note;
    div.onclick = () => div.remove();
    document.getElementById('note-list').appendChild(div);
    input.value = '';
  }
}



