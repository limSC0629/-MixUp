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

// 计划功能
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

// 笔记功能
let notes = JSON.parse(localStorage.getItem('notes') || '[]');
const noteList = document.getElementById('note-list');

function renderNotes(filter = '') {
  noteList.innerHTML = '';
  notes
    .filter(n => n.content.includes(filter))
    .forEach((note, index) => {
      const div = document.createElement('div');
      div.className = 'note-item';

      const textarea = document.createElement('textarea');
      textarea.value = note.content;
      textarea.onchange = () => updateNote(index, textarea.value);

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = '删除';
      deleteBtn.onclick = () => deleteNote(index);

      div.appendChild(textarea);
      div.appendChild(deleteBtn);
      noteList.appendChild(div);
    });
  localStorage.setItem('notes', JSON.stringify(notes));
}

function addNote() {
  const input = document.getElementById('note-input');
  const content = input.value.trim();
  if (content) {
    notes.push({ content });
    input.value = '';
    renderNotes();
  }
}

function updateNote(index, content) {
  notes[index].content = content;
  localStorage.setItem('notes', JSON.stringify(notes));
}

function deleteNote(index) {
  notes.splice(index, 1);
  renderNotes();
}

function clearAllNotes() {
  if (confirm('确定清空所有笔记吗？')) {
    notes = [];
    renderNotes();
  }
}

document.getElementById('note-search').addEventListener('input', e => {
  renderNotes(e.target.value.trim());
});

renderNotes();
