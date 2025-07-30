const questions = [
  {
    idiom: "画蛇添足",
    options: ["比喻多此一举", "比喻心灵手巧", "比喻画得栩栩如生", "比喻做事稳重"],
    answer: "比喻多此一举"
  },
  {
    idiom: "井底之蛙",
    options: ["形容人见识浅陋", "形容人脾气暴躁", "形容人勤奋努力", "形容人爱打听消息"],
    answer: "形容人见识浅陋"
  },
  {
    idiom: "对牛弹琴",
    options: ["比喻浪费时间", "比喻自我欣赏", "比喻说话不看场合", "比喻对不懂道理的人讲道理"],
    answer: "比喻对不懂道理的人讲道理"
  }
];

let current = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const scoreEl = document.getElementById("score");
const nextBtn = document.getElementById("next-btn");

function loadQuestion() {
  const q = questions[current];
  questionEl.textContent = `「${q.idiom}」是什么意思？`;
  optionsEl.innerHTML = "";
  q.options.forEach(option => {
    const li = document.createElement("li");
    li.textContent = option;
    li.onclick = () => checkAnswer(li, q.answer);
    optionsEl.appendChild(li);
  });
  scoreEl.textContent = "";
  nextBtn.style.display = "none";
}

function checkAnswer(li, correct) {
  const lis = optionsEl.querySelectorAll("li");
  lis.forEach(l => l.onclick = null); // 禁用其他选项点击

  if (li.textContent === correct) {
    li.classList.add("correct");
    score++;
  } else {
    li.classList.add("wrong");
    lis.forEach(l => {
      if (l.textContent === correct) {
        l.classList.add("correct");
      }
    });
  }
  nextBtn.style.display = "inline-block";
}

nextBtn.onclick = () => {
  current++;
  if (current < questions.length) {
    loadQuestion();
  } else {
    showScore();
  }
};

function showScore() {
  questionEl.textContent = "测验结束！";
  optionsEl.innerHTML = "";
  scoreEl.textContent = `你的得分是 ${score} / ${questions.length}`;
  nextBtn.style.display = "none";
}

loadQuestion();
