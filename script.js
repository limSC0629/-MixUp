let currentLang = "en";
const langToggle = document.getElementById("lang-toggle");

if (langToggle) {
  langToggle.onclick = () => {
    currentLang = currentLang === "en" ? "zh" : "en";
    location.reload(); // 你也可以选择用 JS 动态切换文本
  };
}

function flipCard() {
  const card = document.getElementById("card-text");
  if (card.innerText === "What is an acid?") {
    card.innerText = "什么是酸？";
  } else {
    card.innerText = "What is an acid?";
  }
}

function checkAnswer(element, isCorrect) {
  if (isCorrect) {
    element.style.color = "green";
    alert("Correct / 正确！");
  } else {
    element.style.color = "red";
    alert("Wrong / 错误！");
  }
}

