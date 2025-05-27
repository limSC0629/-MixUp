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

// 夜间模式
const darkToggle = document.getElementById('darkModeToggle');
darkToggle.addEventListener('change', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('darkMode', document.body.classList.contains('dark'));
});

if (localStorage.getItem('darkMode') === 'true') {
  document.body.classList.add('dark');
  darkToggle.checked = true;
}

// 添加计划
function addPlan() {
  const input = document.getElementById('planInput');
  if (input.value.trim()) {
    const li = document.createElement('li');
    li.textContent = input.value;
    li.onclick = () => li.remove();
    document.getElementById('planList').appendChild(li);
    input.value = '';
  }
}

// 保存笔记
function saveNote() {
  const note = document.getElementById('noteInput').value.trim();
  if (note) {
    const div = document.createElement('div');
    div.textContent = note;
    div.onclick = () => div.remove();
    document.getElementById('notesContainer').appendChild(div);
    document.getElementById('noteInput').value = '';
  }
}


