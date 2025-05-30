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
let notes = JSON.parse(localStorage.getItem('notes')) || [];

function saveNotesToLocal() {
  localStorage.setItem('notes', JSON.stringify(notes));
}

function renderNotes() {
  const noteList = document.getElementById('note-list');
  noteList.innerHTML = '';

  if (notes.length === 0) {
    noteList.innerHTML = '<p class="note-empty">暂无笔记</p>';
    return;
  }

  notes.forEach((note, index) => {
    const noteDiv = document.createElement('div');
    noteDiv.classList.add('note-item');

    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.value = note.title;
    titleInput.classList.add('note-title');

    const contentInput = document.createElement('textarea');
    contentInput.value = note.content;
    contentInput.classList.add('note-content');

    const saveBtn = document.createElement('button');
    saveBtn.innerHTML = '✅';
    saveBtn.className = 'save-note';
    saveBtn.onclick = () => {
      notes[index].title = titleInput.value.trim();
      notes[index].content = contentInput.value.trim();
      saveNotesToLocal();
      renderNotes();
    };

    const delBtn = document.createElement('button');
    delBtn.innerHTML = '🗑️';
    delBtn.className = 'delete-note';
    delBtn.onclick = () => {
      if (confirm('确定删除这条笔记吗？')) {
        notes.splice(index, 1);
        saveNotesToLocal();
        renderNotes();
      }
    };

    const btnBar = document.createElement('div');
    btnBar.className = 'note-buttons';
    btnBar.appendChild(saveBtn);
    btnBar.appendChild(delBtn);

    noteDiv.appendChild(titleInput);
    noteDiv.appendChild(contentInput);
    noteDiv.appendChild(btnBar);
    noteList.appendChild(noteDiv);
  });
}

function addNote() {
  const titleInput = document.getElementById('note-title');
  const contentInput = document.getElementById('note-input');
  const title = titleInput.value.trim();
  const content = contentInput.value.trim();

  if (title && content) {
    notes.push({ title, content });
    saveNotesToLocal();
    renderNotes();
    titleInput.value = '';
    contentInput.value = '';
  }
}

renderNotes();
