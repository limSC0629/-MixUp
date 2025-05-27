// DOM Elements
const toggle = document.getElementById('darkModeToggle');
const navButtons = document.querySelectorAll('.nav-btn');
const pages = document.querySelectorAll('.page');

const dailyInput = document.getElementById('dailyInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const dailyList = document.getElementById('dailyList');

const reminderInput = document.getElementById('reminderInput');
const reminderTime = document.getElementById('reminderTime');
const addReminderBtn = document.getElementById('addReminderBtn');
const reminderList = document.getElementById('reminderList');

const noteInput = document.getElementById('noteInput');
const saveNoteBtn = document.getElementById('saveNoteBtn');
const notesContainer = document.getElementById('notesContainer');

const exportBtn = document.getElementById('exportBtn');
const importBtn = document.getElementById('importBtn');
const importFile = document.getElementById('importFile');

// 页面切换
navButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // 切换按钮激活状态
    navButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // 显示对应页面，隐藏其它
    const targetId = btn.getAttribute('data-target');
    pages.forEach(page => {
      page.classList.toggle('active', page.id === targetId);
    });
  });
});

// 深色模式切换
toggle.addEventListener('change', () => {
  document.body.classList.toggle('dark', toggle.checked);
  localStorage.setItem('darkMode', toggle.checked);
});
if (localStorage.getItem('darkMode') === 'true') {
  document.body.classList.add('dark');
  toggle.checked = true;
}

// 添加每日事务
addTaskBtn.addEventListener('click', addTask);
dailyInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') addTask();
});
function addTask() {
  const val = dailyInput.value.trim();
  if (!val) return;
  const li = document.createElement('li');
  li.textContent = val;
  li.title = '点击删除';
  li.addEventListener('click', () => {
    li.remove();
    saveAll();
  });
  dailyList.appendChild(li);
  dailyInput.value = '';
  saveAll();
}

// 添加提醒
addReminderBtn.addEventListener('click', addReminder);
reminderInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') addReminder();
});
function addReminder() {
  const content = reminderInput.value.trim();
  const time = reminderTime.value;
  if (!content || !time) return;
  const li = document.createElement('li');
  li.textContent = `${content} @ ${time.replace('T', ' ')}`;
  li.title = '点击删除';
  li.addEventListener('click', () => {
    li.remove();
    saveAll();
  });
  reminderList.appendChild(li);
  reminderInput.value = '';
  reminderTime.value = '';
  saveAll();
}

// 保存笔记
saveNoteBtn.addEventListener('click', () => {
  const text = noteInput.value.trim();
  if (!text) return;
  const div = document.createElement('div');
  div.textContent = text;
  div.title = '点击删除';
  div.addEventListener('click', () => {
    div.remove();
    saveAll();
  });
  notesContainer.appendChild(div);
  noteInput.value = '';
  saveAll();
});

// 导出数据
exportBtn.addEventListener('click', () => {
  const data = getAllData();
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'mixup_data.json';
  a.click();
  URL.revokeObjectURL(url);
});

// 导入数据
importBtn.addEventListener('click', () => {
  const file = importFile.files[0];
  if (!file) return alert('请选择一个 JSON 文件');
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const data = JSON.parse(reader.result);
      loadData(data);
      alert('导入成功！');
    } catch {
      alert('无效的 JSON 文件');
    }
  };
  reader.readAsText(file);
});

// 获取当前数据
function getAllData() {
  return {
    tasks: Array.from(dailyList.children).map(li => li.textContent),
    reminders: Array.from(reminderList.children).map(li => li.textContent),
    notes: Array.from(notesContainer.children).map(div => div.textContent),
    darkMode: document.body.classList.contains('dark'),
  };
}

// 加载数据到页面
function loadData(data) {
  dailyList.innerHTML = '';
  (data.tasks || []).forEach(text => {
    const li = document.createElement('li');
    li.textContent = text;
    li.title = '点击删除';
    li.addEventListener('click', () => {
      li.remove();
      saveAll();
    });
    dailyList.appendChild(li);
  });

  reminderList.innerHTML = '';
  (data.reminders || []).forEach(text => {
    const li = document.createElement('li');
    li.textContent = text;
    li.title = '点击删除';
    li.addEventListener('click', () => {
      li.remove();
      saveAll();
    });
    reminderList.appendChild(li);
  });

  notesContainer.innerHTML = '';
  (data.notes || []).forEach(text => {
    const div = document.createElement('div');
    div.textContent = text;
    div.title = '点击删除';
    div.addEventListener('click', () => {
      div.remove();
      saveAll();
    });
    notesContainer.appendChild(div);
  });

  // 设置深色模式
  document.body.classList.toggle('dark', data.darkMode);
  toggle.checked = data.darkMode;

  saveAll();
}

