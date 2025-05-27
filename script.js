// 主题切换
const toggle = document.getElementById('darkModeToggle');
toggle.addEventListener('change', () => {
  document.body.classList.toggle('dark', toggle.checked);
  localStorage.setItem('darkMode', toggle.checked);
});
if (localStorage.getItem('darkMode') === 'true') {
  document.body.classList.add('dark');
  toggle.checked = true;
}

// 标签页切换
const tabs = document.querySelectorAll('.tab-btn');
const contents = document.querySelectorAll('.tab-content');

tabs.forEach((btn) => {
  btn.addEventListener('click', () => {
    // 切换按钮样式
    tabs.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    // 切换内容显示
    contents.forEach((c) => c.classList.remove('active'));
    const tabName = btn.dataset.tab;
    document.getElementById(tabName).classList.add('active');
  });
});

// 添加每日事务
const dailyInput = document.getElementById('dailyInput');
const dailyList = document.getElementById('dailyList');
const addTaskBtn = document.getElementById('addTaskBtn');

addTaskBtn.addEventListener('click', () => {
  const val = dailyInput.value.trim();
  if (!val) return;
  const li = document.createElement('li');
  li.textContent = val;
  li.title = "点击删除";
  li.onclick = () => {
    li.remove();
    saveAll();
  };
  dailyList.appendChild(li);
  dailyInput.value = '';
  saveAll();
});

// 添加提醒
const reminderInput = document.getElementById('reminderInput');
const reminderTime = document.getElementById('reminderTime');
const reminderList = document.getElementById('reminderList');
const addReminderBtn = document.getElementById('addReminderBtn');

addReminderBtn.addEventListener('click', () => {
  const content = reminderInput.value.trim();
  const time = reminderTime.value;
  if (!content || !time) return;
  const li = document.createElement('li');
  // 格式化时间显示
  const timeText = new Date(time).toLocaleString('zh-CN', {
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit'
  });
  li.textContent = `${content} @ ${timeText}`;
  li.title = "点击删除";
  li.onclick = () => {
    li.remove();
    saveAll();
  };
  reminderList.appendChild(li);
  reminderInput.value = '';
  reminderTime.value = '';
  saveAll();
});

// 保存笔记
const noteInput = document.getElementById('noteInput');
const notesContainer = document.getElementById('notesContainer');
const saveNoteBtn = document.getElementById('saveNoteBtn');

saveNoteBtn.addEventListener('click', () => {
  const text = noteInput.value.trim();
  if (!text) return;
  const div = document.createElement('div');
  div.textContent = text;
  div.title = "点击删除";
  div.onclick = () => {
    div.remove();
    saveAll();
  };
  notesContainer.appendChild(div);
  noteInput.value = '';
  saveAll();
});

// 导出数据
const exportDataBtn = document.getElementById('exportDataBtn');
exportDataBtn.addEventListener('click', () => {
  const data = {
    tasks: Array.from(dailyList.children).map(li => li.textContent),
    reminders: Array.from(reminderList.children).map(li => li.textContent),
    notes: Array.from(notesContainer.children).map(div => div.textContent),
    darkMode: document.body.classList.contains('dark')
  };
  const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'mixup_data.json';
  a.click();
});

// 导入数据
const importFile = document.getElementById('importFile');
const importDataBtn = document.getElementById('importDataBtn');

importDataBtn.addEventListener('click', () => {
  if (!importFile.files.length) return alert('请选择一个JSON文件');
  const file = importFile.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const data = JSON.parse(reader.result);
      loadData(data);
    } catch {
      alert('文件格式错误');
    }
  };
  reader.readAsText(file);
});

function loadData(data) {
  // 清空现有
  dailyList.innerHTML = '';
  reminderList.innerHTML = '';
  notesContainer.innerHTML = '';

  data.tasks?.forEach(text => {
    const li = document.createElement('li');
    li.textContent = text;
    li.title = "点击删除";
    li.onclick = () => {
      li.remove();
      saveAll();
    };
    dailyList.appendChild(li);
  });

  data.reminders?.forEach(text => {
    const li = document.createElement('li');
    li.textContent = text;
    li.title = "点击删除";
    li.onclick = () => {
      li.remove();
      saveAll();
    };
    reminderList.appendChild(li);
  });

  data.notes?.forEach(text => {
    const div = document.createElement('div');
    div.textContent = text;
    div.title = "点击删除";
    div.onclick = () => {
      div.remove();
      saveAll();
    };
    notesContainer.appendChild(div);
  });

  if (data.darkMode) {
    document.body.classList.add('dark');
    toggle.checked = true;
  } else {
    document.body.classList.remove('dark');
    toggle.checked = false;
  }

  saveAll();
}

// 保存到localStorage
function saveAll() {
  const data = {
    tasks: Array.from(dailyList.children).map(li => li.textContent),
    reminders: Array.from(reminderList.children).map(li => li.textContent),
    notes: Array.from(notesContainer.children).map(div => div.textContent),
    darkMode: document.body.classList.contains('dark')
  };
  localStorage.setItem('mixupData', JSON.stringify(data));
}

// 加载localStorage数据
window.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('mixupData');
  if (!saved) return;
  try {
    const data = JSON.parse(saved);
    loadData(data);
  } catch {
    console.warn('数据读取失败，可能是格式错误');
  }
});
