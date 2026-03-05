let totalSeconds = 719;
const timerElement = document.getElementById("timer");
const alarmSound = document.getElementById("alarmSound");
const countdown = setInterval(() => {
    if (totalSeconds <= 0) {
        clearInterval(countdown);
        timerElement.innerText = "Time's up!";
        alarmSound.play();
    } else {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        timerElement.innerText = 
        String(hours).padStart(2, '0') + ":" +
        String(minutes).padStart(2, '0') + ":" +
        String(seconds).padStart(2, '0');
        totalSeconds--;
    }
}, 1000);