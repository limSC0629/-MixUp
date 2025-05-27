// 页面切换（按钮使用 data-page 属性）
document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const page = btn.getAttribute('data-page');
    document.querySelectorAll('.page').forEach(sec => {
      sec.classList.remove('active');
    });
    document.getElementById(page + '-page').classList.add('active');
  });
});

// 夜间模式切换（并使用 localStorage 记住设置）
const darkToggle = document.getElementById('dark-mode-toggle');
darkToggle.addEventListener('change', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('darkMode', document.body.classList.contains('dark'));
});

// 页面加载时恢复夜间模式设置
if (localStorage.getItem('darkMode') === 'true') {
  document.body.classList.add('dark');
  darkToggle.checked = true;
}

// 添加计划任务（点击可删除）
function addTask() {
  const input = document.getElementById('task-input');
  const task = input.value.trim();
  if (task) {
    const li = document.createElement('li');
    li.textContent = task;
    li.onclick = () => li.remove(); // 点击删除
    document.getElementById('task-list').appendChild(li);
    input.value = '';
  }
}

// 添加笔记（点击可删除）
function addNote() {
  const input = document.getElementById('note-input');
  const note = input.value.trim();
  if (note) {
    const li = document.createElement('li');
    li.textContent = note;
    li.onclick = () => li.remove(); // 点击删除
    document.getElementById('note-list').appendChild(li);
    input.value = '';
  }
}


