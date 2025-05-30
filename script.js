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
  const titleInput = document.getElementById('note-title');
  const contentInput = document.getElementById('note-input');
  const title = titleInput.value.trim();
  const content = contentInput.value.trim();

  if (title && content) {
    const noteDiv = document.createElement('div');
    noteDiv.classList.add('note-item');

    const titleElem = document.createElement('h4');
    titleElem.textContent = title;

    const contentElem = document.createElement('p');
    contentElem.textContent = content;

    noteDiv.appendChild(titleElem);
    noteDiv.appendChild(contentElem);

    noteDiv.onclick = () => {
      if (confirm('确定要删除这条笔记吗？')) {
        noteDiv.remove();
      }
    };

    document.getElementById('note-list').appendChild(noteDiv);

    titleInput.value = '';
    contentInput.value = '';
  }
}

// 搜索功能
document.getElementById('note-search').addEventListener('input', function () {
  const keyword = this.value.toLowerCase();
  const notes = document.querySelectorAll('#note-list .note-item');

  notes.forEach(note => {
    const title = note.querySelector('h4').textContent.toLowerCase();
    note.style.display = title.includes(keyword) ? 'block' : 'none';
  });
});


