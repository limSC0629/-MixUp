// 主题切换
const toggle = document.getElementById('darkModeToggle');
toggle.addEventListener('change', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('darkMode', document.body.classList.contains('dark'));
});
if (localStorage.getItem('darkMode') === 'true') {
  document.body.classList.add('dark');
  toggle.checked = true;
}

// 添加每日事务
function addTask() {
  const input = document.getElementById('dailyInput');
  if (input.value.trim()) {
    const li = document.createElement('li');
    li.textContent = input.value;
    li.onclick = () => li.remove();
    document.getElementById('dailyList').appendChild(li);
    input.value = '';
    saveAll();
  }
}

// 添加提醒
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
    saveAll();
  }
}

// 保存笔记
function saveNote() {
  const noteText = document.getElementById('noteInput').value;
  if (noteText.trim()) {
    const div = document.createElement('div');
    div.textContent = noteText;
    div.onclick = () => div.remove();
    document.getElementById('notesContainer').appendChild(div);
    document.getElementById('noteInput').value = '';
    saveAll();
  }
}

// 导出数据
function exportData() {
  const data = {
    tasks: Array.from(document.querySelectorAll('#dailyList li')).map(li => li.textContent),
    reminders: Array.from(document.querySelectorAll('#reminderList li')).map(li => li.textContent),
    notes: Array.from(document.querySelectorAll('#notesContainer div')).map(div => div.textContent),
    darkMode: document.body.classList.contains('dark')
  };
  const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'mixup_data.json';
  link.click();
}

// 导入数据
function importData() {
  const fileInput = document.getElementById('importFile');
  const file = fileInput.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    const data = JSON.parse(reader.result);

    // 清空原有内容
    document.getElementById('dailyList').innerHTML = '';
    document.getElementById('reminderList').innerHTML = '';
    document.getElementById('notesContainer').innerHTML = '';

    // 恢复数据
    data.tasks?.forEach(text => {
      const li = document.createElement('li');
      li.textContent = text;
      li.onclick = () => li.remove();
      document.getElementById('dailyList').appendChild(li);
    });

    data.reminders?.forEach(text => {
      const li = document.createElement('li');
      li.textContent = text;
      li.onclick = () => li.remove();
      document.getElementById('reminderList').appendChild(li);
    });

    data.notes?.forEach(text => {
      const div = document.createElement('div');
      div.textContent = text;
      div.onclick = () => div.remove();
      document.getElementById('notesContainer').appendChild(div);
    });

    // 设置深色模式
    document.body.classList.toggle('dark', data.darkMode);
    toggle.checked = data.darkMode;
    localStorage.setItem('darkMode', data.darkMode);
  };
  reader.readAsText(file);
}

// 保存全部数据到 localStorage（刷新后保持）
function saveAll() {
  const data = {
    tasks: Array.from(document.querySelectorAll('#dailyList li')).map(li => li.textContent),
    reminders: Array.from(document.querySelectorAll('#reminderList li')).map(li => li.textContent),
    notes: Array.from(document.querySelectorAll('#notesContainer div')).map(div => div.textContent),
    darkMode: document.body.classList.contains('dark')
  };
  localStorage.setItem('mixupData', JSON.stringify(data));
}

// 页面加载时还原数据
window.onload = () => {
  const saved = JSON.parse(localStorage.getItem('mixupData'));
  if (!saved) return;

  saved.tasks?.forEach(text => {
    const li = document.createElement('li');
    li.textContent = text;
    li.onclick = () => li.remove();
    document.getElementById('dailyList').appendChild(li);
  });

  saved.reminders?.forEach(text => {
    const li = document.createElement('li');
    li.textContent = text;
    li.onclick = () => li.remove();
    document.getElementById('reminderList').appendChild(li);
  });

  saved.notes?.forEach(text => {
    const div = document.createElement('div');
    div.textContent = text;
    div.onclick = () => div.remove();
    document.getElementById('notesContainer').appendChild(div);
  });
};


