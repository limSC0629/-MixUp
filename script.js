function setTheme(theme) {
  if (theme === 'dark') {
    document.body.classList.add('dark');
    document.body.classList.remove('light');
    document.getElementById('themeToggleBtn').textContent = '🌞 亮色模式';
  } else {
    document.body.classList.add('light');
    document.body.classList.remove('dark');
    document.getElementById('themeToggleBtn').textContent = '🌙 暗色模式';
  }
  localStorage.setItem('theme', theme);
}

function toggleTheme() {
  const isDark = document.body.classList.contains('dark');
  setTheme(isDark ? 'light' : 'dark');
}

function fadeOutIn(element, newContent) {
  element.classList.add('fade-out');
  setTimeout(() => {
    element.innerHTML = newContent;
    element.classList.remove('fade-out');
  }, 400);
}

function switchPage(page) {
  const app = document.getElementById('app');
  let content = '';
  switch(page) {
    case 'home':
      content = `<div class="border">
        <h2>首页</h2>
        <p>欢迎使用杂铺 MixUp！</p>
      </div>`;
      break;
    case 'tasks':
      content = `<div class="border">
        <h2>每日事务</h2>
        <p>这里是每日事务管理（功能开发中）</p>
      </div>`;
      break;
    case 'notes':
      content = `<div class="border">
        <h2>笔记本</h2>
        <p>这里是笔记本页面（功能开发中）</p>
      </div>`;
      break;
    case 'reminders':
      content = `<div class="border">
        <h2>提醒</h2>
        <p>这里是提醒管理（功能开发中）</p>
      </div>`;
      break;
    default:
      content = `<div class="border"><p>未知页面</p></div>`;
  }

  fadeOutIn(app, content);

  // 菜单高亮切换
  document.querySelectorAll('#sidebar button').forEach(btn => btn.classList.remove('active'));
  const currentBtn = document.getElementById(`menu-${page}`);
  if (currentBtn) currentBtn.classList.add('active');
}

window.onload = () => {
  const savedTheme = localStorage.getItem('theme') || 'light';
  setTheme(savedTheme);
  switchPage('home');
};

