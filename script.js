// 页面切换
document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const page = btn.getAttribute('data-page');
    document.querySelectorAll('.page').forEach(sec => {
      sec.classList.remove('active');
    });
    document.getElementById(page).classList.add('active');
  });
});

// 夜间模式切换
const toggle = document.getElementById('darkModeToggle');
toggle.addEventListener('change', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('darkMode', document.body.classList.contains('dark'));
});
if (localStorage.getItem('darkMode') === 'true') {
  document.body.classList.add('dark');
  toggle.checked = true;
}

// 每日事务
function addTask() {
  const input = document.getElementById('taskInput');
  if (input.value.trim()) {
    const li = document.createElement('li');
    li.textContent = input.value;
    li.onclick = () => li.remove();
    document.getElementById('taskList').appendChild(li);
    input.value = '';
  }
}

// 计划与提醒
function addReminder() {
  const content = document.getElementById('reminderInput').value;
  const time = document.getElementById('reminderTime').value;
  if (content && time) {
    const li = document.createElement('li');
    li.textContent = `${content} @ ${time}`;
    li.onclick = () => li.remove();
    document.getElementById('reminderList').appendChild(li);
    document.getElementById('reminderInput').value = '';
    document.getElementById('reminderTime').value = '';
  }
}

// 笔记
function saveNote() {
  const noteText = document.getElementById('noteInput').value;
  if (noteText.trim()) {
    const div = document.createElement('div');
    div.textContent = noteText;
    div.onclick = () => div.remove();
    document.getElementById('notesContainer').appendChild(div);
    document.getElementById('noteInput').value = '';
  }
}



