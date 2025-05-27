@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC&display=swap');

:root {
  --blue-primary: #2196F3;
  --blue-dark: #0b7dda;
  --bg-light: #f9fbfc;
  --fg-light: #222;
  --bg-dark: #121212;
  --fg-dark: #eee;
  --sidebar-bg-light: rgba(255 255 255 / 0.85);
  --sidebar-bg-dark: rgba(33 150 243 / 0.25);
  --sidebar-hover-light: rgba(33 150 243 / 0.15);
  --sidebar-hover-dark: rgba(33 150 243 / 0.35);
  --border-color-light: #ddd;
  --border-color-dark: #444;
  --shadow-light: rgba(0 0 0 / 0.12);
  --shadow-dark: rgba(0 0 0 / 0.7);
  --btn-radius: 6px;
}

/* 字体和基础重置 */
body {
  margin: 0;
  font-family: 'Noto Sans SC', 'Microsoft Yahei', Arial, sans-serif;
  transition: background-color 0.4s ease, color 0.4s ease;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--bg-light);
  color: var(--fg-light);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body.dark {
  background-color: var(--bg-dark);
  color: var(--fg-dark);
}

/* 容器布局 */
#container {
  display: flex;
  flex: 1;
  height: 100vh;
  overflow: hidden;
}

/* 侧边栏 - 玻璃质感 */
#sidebar {
  width: 180px;
  background-color: var(--sidebar-bg-light);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  box-shadow: 0 0 10px var(--shadow-light);
  color: var(--blue-dark);
  display: flex;
  flex-direction: column;
  user-select: none;
  overflow-y: auto;
  border-right: 1px solid var(--border-color-light);
  transition: background-color 0.5s ease, color 0.5s ease;
}

body.dark #sidebar {
  background-color: var(--sidebar-bg-dark);
  color: #bbdefb;
  box-shadow: 0 0 20px var(--shadow-dark);
  border-right: 1px solid var(--border-color-dark);
}

/* 侧边栏按钮 */
#sidebar button {
  background: transparent;
  border: none;
  color: inherit;
  padding: 16px 22px;
  text-align: left;
  cursor: pointer;
  font-weight: 600;
  font-size: 16px;
  outline: none;
  border-left: 4px solid transparent;
  position: relative;
  transition: background-color 0.3s ease, border-left-color 0.3s ease;
  overflow: hidden;
}

/* 波纹点击效果 */
#sidebar button::after {
  content: "";
  position: absolute;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  background: var(--blue-primary);
  top: 50%;
  left: 50%;
  pointer-events: none;
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.5);
  transition: opacity 0.3s ease, transform 0.3s ease;
  z-index: 0;
}

#sidebar button:active::after {
  opacity: 0.2;
  transform: translate(-50%, -50%) scale(1);
  transition: 0s;
}

#sidebar button:hover {
  background-color: var(--sidebar-hover-light);
}

body.dark #sidebar button:hover {
  background-color: var(--sidebar-hover-dark);
}

/* 激活按钮高亮 */
#sidebar button.active {
  border-left-color: var(--blue-primary);
  font-weight: 700;
  background-color: var(--sidebar-hover-light);
}

body.dark #sidebar button.active {
  background-color: var(--sidebar-hover-dark);
}

/* 主内容区 */
#main {
  flex: 1;
  padding: 24px 32px;
  overflow-y: auto;
  background-color: inherit;
  color: inherit;
  display: flex;
  flex-direction: column;
  position: relative;
}

/* 顶部栏 */
.topbar {
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-end;
}

/* 主题切换按钮 */
#themeToggleBtn {
  background-color: var(--blue-primary);
  border: none;
  color: white;
  padding: 10px 20px;
  border-radius: var(--btn-radius);
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(33, 150, 243, 0.4);
  transition: background-color 0.3s ease;
  user-select: none;
}

#themeToggleBtn:hover {
  background-color: var(--blue-dark);
}

/* 页面内容切换动画 */
#app {
  flex: 1;
  opacity: 1;
  transition: opacity 0.4s ease;
}

/* 隐藏时淡出 */
#app.fade-out {
  opacity: 0;
}

/* 通用边框容器 */
.border {
  border: 1px solid var(--border-color-light);
  border-radius: 8px;
  padding: 20px;
  background-color: rgba(255 255 255 / 0.6);
  box-shadow: 0 2px 8px var(--shadow-light);
  transition: background-color 0.5s ease, border-color 0.5s ease;
}

body.dark .border {
  border-color: var(--border-color-dark);
  background-color: rgba(33 33 33 / 0.6);
  box-shadow: 0 2px 14px var(--shadow-dark);
}

/* 标题 */
h2 {
  margin-top: 0;
  font-weight: 700;
  font-size: 26px;
  margin-bottom: 16px;
  user-select: none;
}

/* 段落 */
p {
  line-height: 1.5;
  font-size: 16px;
  user-select: text;
}

/* 输入框和文本域 */
input[type="text"], input[type="date"], input[type="time"], textarea {
  width: 100%;
  max-width: 100%;
  font-size: 15px;
  padding: 10px 14px;
  border-radius: var(--btn-radius);
  border: 1.5px solid var(--border-color-light);
  background-color: rgba(255 255 255 / 0.8);
  color: var(--fg-light);
  transition: border-color 0.3s ease, background-color 0.3s ease;
  box-sizing: border-box;
  user-select: text;
}

input[type="text"]:focus, input[type="date"]:focus, input[type="time"]:focus, textarea:focus {
  border-color: var(--blue-primary);
  outline: none;
  background-color: #fff;
}

body.dark input[type="text"], body.dark input[type="date"], body.dark input[type="time"], body.dark textarea {
  background-color: rgba(33 33 33 / 0.8);
  color: var(--fg-dark);
  border-color: var(--border-color-dark);
}

body.dark input[type="text"]:focus, body.dark input[type="date"]:focus, body.dark input[type="time"]:focus, body.dark textarea:focus {
  background-color: #222;
}

/* 列表 */
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  padding: 10px 14px;
  border-bottom: 1px solid var(--border-color-light);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 15px;
  user-select: none;
}

body.dark li {
  border-bottom: 1px solid var(--border-color-dark);
}

/* 小按钮 */
.small-btn {
  background-color: var(--blue-primary);
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 5px;
  font-size: 13px;
  cursor: pointer;
  margin-left: 8px;
  transition: background-color 0.3s ease;
  user-select: none;
  box-shadow: 0 3px 6px rgba(33,150,243,0.3);
}

.small-btn:hover {
  background-color: var(--blue-dark);
}

/* 搜索高亮 */
mark {
  background-color: #fffb91;
  color: black;
  padding: 0 2px;
  border-radius: 2px;
  user-select: none;
}
