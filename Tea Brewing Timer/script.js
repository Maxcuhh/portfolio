const teaType = document.getElementById('teaType');
const timeDisplay = document.getElementById('timeDisplay');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const teaBell = document.getElementById('teaBell');

let timer = null;
let timeLeft = 0;
let isRunning = false;

function updateDisplay() {
  const minutes = String(Math.floor(timeLeft / 60)).padStart(2,'0');
  const seconds = String(timeLeft % 60).padStart(2,'0');
  timeDisplay.textContent = `${minutes}:${seconds}`;
}

function startTimer() {
  if (!isRunning) {
    if (timeLeft === 0) {
      timeLeft = parseInt(teaType.value) * 60;
    }
    isRunning = true;
    timer = setInterval(() => {
      timeLeft--;
      updateDisplay();
      if (timeLeft <= 0) {
        clearInterval(timer);
        isRunning = false;
        teaBell.play();
        alert("Your tea is ready! 🍵");
      }
    }, 1000);
  }
}

function pauseTimer() {
  clearInterval(timer);
  isRunning = false;
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  timeLeft = 0;
  updateDisplay();
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

updateDisplay();
