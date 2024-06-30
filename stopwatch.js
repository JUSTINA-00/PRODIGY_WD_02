let startTime, elapsedTime = 0, intervalId;
let isRunning = false;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('laps');

startStopBtn.addEventListener('click', function() {
    if (isRunning) {
        clearInterval(intervalId);
        startStopBtn.textContent = 'Start';
    } else {
        startTime = Date.now() - elapsedTime;
        intervalId = setInterval(updateDisplay, 1000);
        startStopBtn.textContent = 'Pause';
    }
    isRunning = !isRunning;
});

resetBtn.addEventListener('click', function() {
    clearInterval(intervalId);
    elapsedTime = 0;
    isRunning = false;
    startStopBtn.textContent = 'Start';
    display.textContent = '00:00:00';
    lapsList.innerHTML = '';
});

lapBtn.addEventListener('click', function() {
    if (isRunning) {
        const li = document.createElement('li');
        li.textContent = formatTime(elapsedTime);
        lapsList.appendChild(li);
    }
});

function updateDisplay() {
    elapsedTime = Date.now() - startTime;
    display.textContent = formatTime(elapsedTime);
}

function formatTime(time) {
    const totalSeconds = Math.floor(time / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(num) {
    return num.toString().padStart(2, '0');
}
