const moodText = document.getElementById("moodText");
const moodCategory = document.getElementById("moodCategory");
const addMood = document.getElementById("addMood");
const moodList = document.getElementById("moodList");

let moods = JSON.parse(localStorage.getItem("moods")) || [];

function renderMoods() {
  moodList.innerHTML = "";
  moods.forEach((entry, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span class="category-tag">${entry.category}</span>
      ${entry.text}
      <span class="date-tag">${entry.date}</span>
      <button class="delete-btn" onclick="deleteMood(${index})">Remove</button>
    `;
    moodList.appendChild(li);
  });
}

function addMoodEntry() {
  const text = moodText.value.trim();
  if (!text) return;

  const moodEntry = {
    text,
    category: moodCategory.value,
    date: new Date().toLocaleDateString(),
  };

  moods.push(moodEntry);
  localStorage.setItem("moods", JSON.stringify(moods));

  moodText.value = "";
  renderMoods();
}

function deleteMood(index) {
  moods.splice(index, 1);
  localStorage.setItem("moods", JSON.stringify(moods));
  renderMoods();
}

addMood.addEventListener("click", addMoodEntry);
renderMoods();
