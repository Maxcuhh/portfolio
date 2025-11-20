// script.js — Cozy Planner (tasks, calendar, affirmations, categories, themes, dark, fireflies)
//
// Storage keys
const STORAGE = {
  TASKS: "cozy_tasks_v2",
  CATS: "cozy_cats_v2",
  CAL: "cozy_cal_v2",
  THEME: "cozy_theme_v2",
  DARK: "cozy_dark_v2",
  AFF: "cozy_aff_v2"
};

// DOM refs
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTask");
const taskListEl = document.getElementById("taskList");
const categorySelect = document.getElementById("categorySelect");
const filterSelect = document.getElementById("filterSelect");
const addSound = document.getElementById("addSound");
const removeSound = document.getElementById("removeSound");
const clearCompletedBtn = document.getElementById("clearCompleted");
const clearAllBtn = document.getElementById("clearAll");
const newCatInput = document.getElementById("newCategory");
const addCatBtn = document.getElementById("addCategory");
const categoryListEl = document.getElementById("categoryList");

const monthLabel = document.getElementById("monthLabel");
const calendarGrid = document.getElementById("calendarGrid");
const dateNotes = document.getElementById("dateNotes");
const prevMonthBtn = document.getElementById("prevMonth");
const nextMonthBtn = document.getElementById("nextMonth");
const filterEl = document.getElementById("filterSelect");

const affirmationText = document.getElementById("affirmationText");
const newAffirmBtn = document.getElementById("newAffirm");
const copyAffirmBtn = document.getElementById("copyAffirm");

const darkToggle = document.getElementById("darkToggle");
const themeBtns = document.querySelectorAll(".theme-btn");

// fallback safe defaults
let tasks = JSON.parse(localStorage.getItem(STORAGE.TASKS) || "[]");
let cats = JSON.parse(localStorage.getItem(STORAGE.CATS) || '["General","Home","School","Work","Cozy"]');
let calendar = JSON.parse(localStorage.getItem(STORAGE.CAL) || "{}");
let affirmations = JSON.parse(localStorage.getItem(STORAGE.AFF) || '[]');

// initialize categories UI
function populateCategories(){
  categorySelect.innerHTML = "";
  filterSelect.innerHTML = '<option value="All">All Categories</option>';
  categoryListEl && (categoryListEl.innerHTML = "");
  cats.forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat; opt.textContent = cat;
    categorySelect.appendChild(opt);

    const opt2 = document.createElement("option");
    opt2.value = cat; opt2.textContent = cat;
    filterSelect.appendChild(opt2);

    if(categoryListEl){
      const pill = document.createElement("div");
      pill.className = "category-pill";
      pill.innerHTML = `${cat} <button data-cat="${cat}" class="remove-cat">✕</button>`;
      categoryListEl.appendChild(pill);
    }
  });

  // removal handler
  document.querySelectorAll(".remove-cat").forEach(btn=>{
    btn.onclick = e=>{
      const c = e.target.dataset.cat;
      cats = cats.filter(x=>x!==c);
      saveCats(); populateCategories(); renderTasks();
    };
  });
}

// save categories
function saveCats(){ localStorage.setItem(STORAGE.CATS, JSON.stringify(cats)); }

// tasks: add, render, save
function addTask(text, cat){
  tasks.push({text,cat,id:Date.now()});
  saveTasks(); renderTasks(); addSound && addSound.play();
}

function saveTasks(){ localStorage.setItem(STORAGE.TASKS, JSON.stringify(tasks)); }

function renderTasks(){
  taskListEl.innerHTML = "";
  const filter = filterSelect.value || "All";
  tasks.forEach(t=>{
    if(filter !== "All" && t.cat !== filter) return;
    const li = document.createElement("li"); li.className = "task-item"; li.draggable = true;
    li.dataset.id = t.id;
    li.innerHTML = `<div class="task-left"><span class="icon-check">✔</span><div class="task-text">${escapeHtml(t.text)}</div></div>
                    <div><span class="tag">${escapeHtml(t.cat)}</span></div>`;
    // click remove with animation
    li.addEventListener("click",(e)=>{
      // avoid removing when selecting text or clicking tags
      if(e.target.closest(".tag")) return;
      li.classList.add("fade-out");
      removeSound && removeSound.play();
      setTimeout(()=>{ tasks = tasks.filter(x=>x.id != t.id); saveTasks(); renderTasks(); }, 300);
    });

    // drag handlers
    li.addEventListener("dragstart", e=>{ e.dataTransfer.setData("text/plain", t.id); li.classList.add("dragging"); });
    li.addEventListener("dragend", ()=> li.classList.remove("dragging"));
    li.addEventListener("dragover", e=> e.preventDefault());
    li.addEventListener("drop", e=>{
      e.preventDefault();
      const draggedId = e.dataTransfer.getData("text/plain");
      if(!draggedId) return;
      const draggedIndex = tasks.findIndex(x=>x.id == draggedId);
      const targetIndex = tasks.findIndex(x=>x.id == t.id);
      if(draggedIndex < 0 || targetIndex < 0 || draggedIndex === targetIndex) return;
      const [item] = tasks.splice(draggedIndex,1);
      tasks.splice(targetIndex,0,item);
      saveTasks(); renderTasks();
    });

    taskListEl.appendChild(li);
  });
}

// calendar: month state
let calDate = new Date();
function renderCalendar(){
  calendarGrid.innerHTML = "";
  const year = calDate.getFullYear();
  const month = calDate.getMonth();
  monthLabel.textContent = calDate.toLocaleString(undefined,{month:"long",year:"numeric"});
  const first = new Date(year,month,1);
  const startDay = first.getDay(); // 0..6
  const daysInMonth = new Date(year, month+1,0).getDate();

  // show blanks
  for(let i=0;i<startDay;i++){
    const blank = document.createElement("div"); blank.className="calendar-cell"; blank.style.visibility="hidden";
    calendarGrid.appendChild(blank);
  }
  for(let d=1; d<=daysInMonth; d++){
    const cell = document.createElement("div"); cell.className="calendar-cell";
    cell.dataset.date = `${year}-${pad(month+1)}-${pad(d)}`;
    cell.innerHTML = `<div class="date-num">${d}</div>`;
    const key = cell.dataset.date;
    if(calendar[key] && calendar[key].length) {
      const dot = document.createElement("div"); dot.className="dot"; cell.appendChild(dot);
    }
    // click to show or edit note
    cell.addEventListener("click", ()=> {
      const note = prompt("Add a short note for " + cell.dataset.date, (calendar[key] && calendar[key][0]) || "");
      if(note === null) return;
      if(note.trim() === ""){
        delete calendar[key];
      } else {
        calendar[key] = [note.trim()];
      }
      localStorage.setItem(STORAGE.CAL, JSON.stringify(calendar));
      renderCalendar();
      showDateNotes(cell.dataset.date);
    });
    calendarGrid.appendChild(cell);
  }
}

function showDateNotes(dateStr){
  const notes = calendar[dateStr] || [];
  dateNotes.innerHTML = `<strong>${dateStr}</strong><div>${notes.length ? escapeHtml(notes[0]) : "<em>No notes</em>"}</div>`;
}

// affirmations — list & logic
const defaultAffirmations = [
  "I create gentle, useful things with care.",
  "Small steps forward are still progress.",
  "My workspace is a calm and kind place.",
  "I give myself permission to rest and then create.",
  "Today I will make something soft and true."
];
if(!affirmations || affirmations.length === 0) affirmations = defaultAffirmations;

function getTodayKey(){ const d=new Date(); return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`; }

function showAffirmation(){
  const todayKey = getTodayKey();
  const saved = JSON.parse(localStorage.getItem(STORAGE.AFF) || '{}');
  if(saved[todayKey]) {
    affirmationText.textContent = saved[todayKey];
    return;
  }
  const pick = affirmations[Math.floor(Math.random()*affirmations.length)];
  saved[todayKey] = pick;
  localStorage.setItem(STORAGE.AFF, JSON.stringify(saved));
  affirmationText.textContent = pick;
}

function nextAffirmation(){
  const pick = affirmations[Math.floor(Math.random()*affirmations.length)];
  // show and set for today
  const todayKey = getTodayKey();
  const saved = JSON.parse(localStorage.getItem(STORAGE.AFF) || '{}');
  saved[todayKey] = pick;
  localStorage.setItem(STORAGE.AFF, JSON.stringify(saved));
  affirmationText.textContent = pick;
}

// utilities
function pad(n){ return n.toString().padStart(2,'0'); }
function escapeHtml(s){ return s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;'); }

// load & init
function saveAll(){
  saveTasks(); saveCats(); localStorage.setItem(STORAGE.CAL, JSON.stringify(calendar));
}

function loadAll(){
  tasks = JSON.parse(localStorage.getItem(STORAGE.TASKS) || "[]");
  cats = JSON.parse(localStorage.getItem(STORAGE.CATS) || '["General","Home","School","Work","Cozy"]');
  calendar = JSON.parse(localStorage.getItem(STORAGE.CAL) || "{}");
  const savedTheme = localStorage.getItem(STORAGE.THEME);
  const savedDark = localStorage.getItem(STORAGE.DARK);
  if(savedTheme) document.body.classList.add(savedTheme);
  if(savedDark === "true"){ document.body.classList.add("dark"); darkToggle.checked = true; }
}

// event wiring
document.addEventListener("DOMContentLoaded", ()=>{
  loadAll();
  populateCategories();
  renderTasks();
  renderCalendar();
  showAffirmation();
});

// add task
addTaskBtn.addEventListener("click", ()=>{
  const txt = taskInput.value.trim();
  const cat = categorySelect.value || "General";
  if(!txt) return;
  addTask(txt,cat);
  taskInput.value = "";
});

// clear buttons
clearAllBtn && clearAllBtn.addEventListener("click", ()=>{
  if(!confirm("Clear all tasks?")) return;
  tasks = []; saveTasks(); renderTasks();
});
clearCompletedBtn && clearCompletedBtn.addEventListener("click", ()=>{
  // no completed concept here; keep for compatibility (remove none)
  // future: implement done flag
  // For now we remove nothing; display a small message
  alert("Completed flag not implemented — click a task to remove it.");
});

// filter change
filterSelect.addEventListener("change", ()=> renderTasks());

// categories: add (settings)
addCatBtn && addCatBtn.addEventListener("click", ()=>{
  const v = newCatInput.value.trim();
  if(!v) return;
  if(cats.includes(v)){ alert("Category exists"); return; }
  cats.push(v); saveCats(); populateCategories(); newCatInput.value="";
});

// calendar nav
prevMonthBtn.addEventListener("click", ()=>{ calDate.setMonth(calDate.getMonth()-1); renderCalendar(); });
nextMonthBtn.addEventListener("click", ()=>{ calDate.setMonth(calDate.getMonth()+1); renderCalendar(); });

// affirmation
newAffirmBtn && newAffirmBtn.addEventListener("click", nextAffirmation);
copyAffirmBtn && copyAffirmBtn.addEventListener("click", ()=>{
  const txt = affirmationText.textContent || "";
  navigator.clipboard && navigator.clipboard.writeText(txt).then(()=> alert("Copied affirmation!"));
});

// theme buttons
themeBtns.forEach(btn=>{
  btn.addEventListener("click", ()=>{
    // clear previous theme classes (pink/forest/honey)
    document.body.classList.remove("theme-forest","theme-honey");
    if(btn.dataset.theme === "forest") document.body.classList.add("theme-forest");
    else if(btn.dataset.theme === "honey") document.body.classList.add("theme-honey");
    // pink = default (no class)
    localStorage.setItem(STORAGE.THEME, (btn.dataset.theme === "pink")? "" : ("theme-"+btn.dataset.theme));
  });
});

// dark toggle
darkToggle && darkToggle.addEventListener("change", (e)=>{
  if(e.target.checked) { document.body.classList.add("dark"); localStorage.setItem(STORAGE.DARK,"true"); }
  else { document.body.classList.remove("dark"); localStorage.setItem(STORAGE.DARK,"false"); }
});

// dragging support on list container (allow dropping at end)
taskListEl.addEventListener("dragover", e=> e.preventDefault());
taskListEl.addEventListener("drop", e=>{
  const id = e.dataTransfer.getData("text/plain");
  if(!id) return;
  const draggedIndex = tasks.findIndex(x=>x.id == id);
  const lastIndex = tasks.length-1;
  if(draggedIndex >=0){
    const [item] = tasks.splice(draggedIndex,1);
    tasks.push(item);
    saveTasks(); renderTasks();
  }
});

// helper to display date notes when clicked (if previously clicked)
calendarGrid.addEventListener("click", e=>{
  const cell = e.target.closest(".calendar-cell");
  if(cell) showDateNotes(cell.dataset.date);
});

// initial populate UI for categories
populateCategories();
renderTasks();
renderCalendar();
showAffirmation();
