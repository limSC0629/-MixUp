// 主题切换相关
const toggleBtn = document.getElementById('toggle-theme');
const body = document.body;

// 初始化主题状态
if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark');
  toggleBtn.textContent = '☀️';
}

toggleBtn.addEventListener('click', () => {
  if (body.classList.contains('dark')) {
    body.classList.remove('dark');
    toggleBtn.textContent = '🌙';
    localStorage.setItem('theme', 'light');
  } else {
    body.classList.add('dark');
    toggleBtn.textContent = '☀️';
    localStorage.setItem('theme', 'dark');
  }
});

// 导航按钮切换页面
const navButtons = document.querySelectorAll('.nav-btn');
const contentSections = document.querySelectorAll('.content-section');

navButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // 切换导航样式
    navButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // 切换内容区显示
    const target = btn.getAttribute('data-page');
    contentSections.forEach(sec => {
      sec.classList.toggle('active', sec.id === target);
    });
  });
});

// 首页功能 - 输入弹窗
document.getElementById('showInputBtn').addEventListener('click', () => {
  const val = document.getElementById('userInput').value.trim();
  if (val) {
    alert

