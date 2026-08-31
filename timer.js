function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    document.getElementById("timer").textContent =
        String(minutes).padStart(2, "0") +
        ":" +
        String(seconds).padStart(2, "0");
}

function startTimer() {
    if (timerInterval !== null) {
        return;
    }

    timerInterval = setInterval(function() {
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerInterval = null;

            alert("Study session complete! 🎉");
            return;
        }

        timeLeft--;

        updateTimer();
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

function resetTimer() {
    pauseTimer();

    timeLeft = 25 * 60;

    updateTimer();
}