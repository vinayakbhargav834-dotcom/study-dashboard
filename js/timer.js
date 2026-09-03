let timeLeft = 25 * 60;
let timerRunning = false;
let timerInterval;


function showTimer() {
    const timer = document.getElementById("timer");

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    timer.textContent =
        String(minutes).padStart(2, "0") +
        ":" +
        String(seconds).padStart(2, "0");
}


function startTimer() {
    if (timerRunning) {
        return;
    }

    timerRunning = true;

    timerInterval = setInterval(function() {
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerRunning = false;

            alert("Study session complete! 🎉");
            return;
        }

        timeLeft--;
        showTimer();
    }, 1000);
}


function pauseTimer() {
    clearInterval(timerInterval);
    timerRunning = false;
}


function resetTimer() {
    clearInterval(timerInterval);

    timeLeft = 25 * 60;
    timerRunning = false;

    showTimer();
}
