const tasks = [
  {
    description: "💡 关卡 0：请在 HTML 中创建一个按钮，文字是“点击我”。",
    check: (html, css, js) => html.includes("<button>点击我</button>")
  },
  {
    description: "💡 关卡 1：点击按钮后，按钮背景颜色要变成红色。",
    check: (html, css, js) =>
      html.includes("<button") &&
      js.includes("addEventListener") &&
      (js.includes("style.background") || js.includes("style.setProperty"))
  }
];

function loadLevel() {
  const level = parseInt(document.getElementById("level").value);
  document.getElementById("task-description").innerText = tasks[level].description;
  document.getElementById("html-input").value = "";
  document.getElementById("css-input").value = "";
  document.getElementById("js-input").value = "";
  document.getElementById("result-message").innerText = "";
  document.getElementById("preview").srcdoc = "";
}

function runCode() {
  const html = document.getElementById("html-input").value;
  const css = document.getElementById("css-input").value;
  const js = document.getElementById("js-input").value;
  const level = parseInt(document.getElementById("level").value);

  const fullCode = `
    <style>${css}</style>
    ${html}
    <script>${js}<\/script>
  `;

  document.getElementById("preview").srcdoc = fullCode;

  const pass = tasks[level].check(html, css, js);
  document.getElementById("result-message").innerText = pass
    ? "✅ 恭喜你通过本关！"
    : "❌ 未通过，再试试看~";
}

  const challenge = challenges[currentLevel];
  document.getElementById("code").value = challenge.answer || "（本题无标准答案）";
}

function nextLevel() {
  currentLevel++;
  if (currentLevel < challenges.length) {
    loadChallenge();
    document.getElementById("nextBtn").disabled = true;
  } else {
    document.getElementById("challenge").innerText = "🎉 你已经完成所有关卡了！";
    document.getElementById("code").style.display = "none";
    document.getElementById("checkBtn").style.display = "none";
    document.getElementById("answerBtn").style.display = "none";
    document.getElementById("nextBtn").style.display = "none";
  }
}

window.onload = loadChallenge;

