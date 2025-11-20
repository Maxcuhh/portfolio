const entryInput = document.getElementById('entryInput');
const saveBtn = document.getElementById('saveBtn');
const entriesList = document.getElementById('entriesList');
const categorySelect = document.getElementById('category');
const filterSelect = document.getElementById('filterCategory');

// Load entries from localStorage
let entries = JSON.parse(localStorage.getItem('journalEntries')) || [];
renderEntries(entries);

// Add entry to DOM
function addEntryToDOM(entry, index) {
  const li = document.createElement('li');
  li.dataset.index = index;
  li.innerHTML = `<span class="entry-category">${entry.category}</span> ${entry.text}
                  <span class="entry-date">${entry.date}</span>
                  <button class="entry-delete">Delete</button>`;
  entriesList.prepend(li);

  li.querySelector('.entry-delete').addEventListener('click', () => {
    deleteEntry(index);
  });
}

function renderEntries(list) {
  entriesList.innerHTML = '';
  list.forEach((entry, idx) => addEntryToDOM(entry, idx));
}

saveBtn.addEventListener('click', () => {
  const text = entryInput.value.trim();
  const category = categorySelect.value;
  if (!text) return;

  const entry = {
    text,
    category,
    date: new Date().toLocaleString()
  };

  entries.push(entry);
  localStorage.setItem('journalEntries', JSON.stringify(entries));
  renderEntries(filterEntries(filterSelect.value));
  entryInput.value = "";
});

// Delete entry
function deleteEntry(index) {
  entries.splice(index, 1);
  localStorage.setItem('journalEntries', JSON.stringify(entries));
  renderEntries(filterEntries(filterSelect.value));
}

// Filter entries
function filterEntries(category) {
  if (category === 'All') return entries;
  return entries.filter(entry => entry.category === category);
}

filterSelect.addEventListener('change', () => {
  renderEntries(filterEntries(filterSelect.value));
});
