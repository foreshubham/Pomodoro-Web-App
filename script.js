let timer;
let minutes = 25;
let seconds = 0;
let isRunning = false;

const musicTracks = [
  'm1.mp3',
  'm2.mp3',
  'm3.mp3'
];

let currentTrackIndex = 0;

function startPomodoro() {
  if (!isRunning) {
    isRunning = true;
    document.getElementById('startBtn').style.display = 'none';
    document.getElementById('pauseBtn').style.display = 'inline-block';
    document.getElementById('stopBtn').style.display = 'inline-block';
    timer = setInterval(updateTimer, 1000);
    playBackgroundMusic();
  }
}

function pausePomodoro() {
  if (isRunning) {
    isRunning = false;
    clearInterval(timer);
    document.getElementById('startBtn').style.display = 'inline-block';
    document.getElementById('pauseBtn').style.display = 'none';
    document.getElementById('stopBtn').style.display = 'inline-block';
    pauseBackgroundMusic();
  }
}

function stopPomodoro() {
  if (isRunning) {
    isRunning = false;
    clearInterval(timer);
    document.getElementById('startBtn').style.display = 'inline-block';
    document.getElementById('pauseBtn').style.display = 'none';
    document.getElementById('stopBtn').style.display = 'none';
    pauseBackgroundMusic();
    resetTimer();
  }
}

function updateTimer() {
  if (minutes === 0 && seconds === 0) {
    stopPomodoro();
  } else {
    if (seconds === 0) {
      minutes--;
      seconds = 59;
    } else {
      seconds--;
    }
    updateTimerDisplay();
  }
}

function updateTimerDisplay() {
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
  document.getElementById('timer').innerText = `${formattedMinutes}:${formattedSeconds}`;
}

function resetTimer() {
  minutes = 25;
  seconds = 0;
  updateTimerDisplay();
}

function playBackgroundMusic() {
  const audio = document.getElementById('backgroundAudio');
  audio.src = musicTracks[currentTrackIndex];
  audio.play();
}

function pauseBackgroundMusic() {
  const audio = document.getElementById('backgroundAudio');
  audio.pause();
}

function nextMusicTrack() {
  currentTrackIndex = (currentTrackIndex + 1) % musicTracks.length;
  playBackgroundMusic();
}

function prevMusicTrack() {
  currentTrackIndex = (currentTrackIndex - 1 + musicTracks.length) % musicTracks.length;
  playBackgroundMusic();
}

function setVolume() {
  const audio = document.getElementById('backgroundAudio');
  const volume = document.getElementById('volume').value;
  audio.volume = volume;
}

function addTask() {
    const newTaskInput = document.getElementById('newTask');
    const taskList = document.getElementById('taskList');
    const taskText = newTaskInput.value.trim();
  
    if (taskText !== '') {
      const taskItem = document.createElement('li');
      taskItem.innerHTML = `${taskText} <button onclick="deleteTask(this)">Delete</button>`;
      taskList.appendChild(taskItem);
      newTaskInput.value = ''; // Clear the input field after adding the task
    }
  }
  
  function deleteTask(button) {
    const taskItem = button.parentNode;
    const taskList = taskItem.parentNode;
    taskList.removeChild(taskItem);
  }