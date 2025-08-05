const challenges = [
  {
    level: 0,
    instruction: "写出一个 h1 标签，文字内容为 Hello World。",
    answer: "<h1>Hello World</h1>"
  },
  {
    level: 1,
    instruction: "写一个 p 标签，里面写你最喜欢的编程语言。",
    answerCheck: (code) => code.includes("<p>") && code.includes("</p>")
  },
  {
    level: 2,
    instruction: "写出一个有 class 为 'box' 的 div 标签。",
    answerCheck: (code) => /<div\s+class=["']box["']>.*<\/div>/.test(code)
  },
  {
    level: 3,
    instruction: "写一个带有链接（a 标签）的段落，指向 https://google.com",
    answerCheck: (code) => /<a\s+href=["']https:\/\/google\.com["']>.*<\/a>/.test(code)
  }
];

let currentLevel = 0;

function loadChallenge() {
  const c = challenges[currentLevel];
  document.getElementById("challenge").innerText = `Level ${c.level}: ${c.instruction}`;
  document.getElementById("code").value = "";
  document.getElementById("result").innerText = "";
}

function checkAnswer() {
  const userCode = document.getElementById("code").value.trim();
  const challenge = challenges[currentLevel];

  let correct = false;
  if (challenge.answer) {
    correct = userCode === challenge.answer;
  } else if (typeof challenge.answerCheck === "function") {
    correct = challenge.answerCheck(userCode);
  }

  const result = document.getElementById("result");
  if (correct) {
    result.innerText = "✅ 正确！你可以进入下一关！";
    document.getElementById("nextBtn").disabled = false;
  } else {
    result.innerText = "❌ 答案不正确，请再试试。";
  }
}

function showAnswer() {
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

