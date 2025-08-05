const cards = [
  { title: "Flexbox", description: "CSS layout model for responsive design." },
  { title: "Grid", description: "2D layout system for web components." },
  { title: "DOM", description: "Document Object Model for JS to manipulate HTML." },
  { title: "Events", description: "Mouse, keyboard, and other browser events." },
  { title: "Selectors", description: "CSS and JS selectors for elements." }
];

const container = document.getElementById("cardContainer");
const searchInput = document.getElementById("searchInput");
const toggleThemeBtn = document.getElementById("toggleTheme");

function renderCards(filter = "") {
  container.innerHTML = "";
  const filtered = cards.filter(card =>
    card.title.toLowerCase().includes(filter.toLowerCase())
  );

  filtered.forEach(card => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `<h3>${card.title}</h3><p>${card.description}</p>`;
    container.appendChild(div);
  });
}

searchInput.addEventListener("input", (e) => {
  renderCards(e.target.value);
});

toggleThemeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

renderCards();
