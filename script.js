let completed = 0;
let timeLeft = 25 * 60;
let timerInterval = null;

function completeSubject(subject) {
    completed++;

    if (completed > 3) {
        completed = 3;
    }

    document.getElementById("message").textContent =
        subject + " study session completed! 🎉";

    const percentage = Math.round((completed / 3) * 100);

    document.getElementById("progress").style.width =
        percentage + "%";

    document.getElementById("progressText").textContent =
        percentage + "% completed";
}

function startTimer() {
    if (timerInterval !== null) {
        return;
    }

    timerInterval = setInterval(function () {
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerInterval = null;
            alert("Study session complete! 🎉");
            return;
        }

        timeLeft--;

        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;

        document.getElementById("timer").textContent =
            String(minutes).padStart(2, "0") +
            ":" +
            String(seconds).padStart(2, "0");
    }, 1000);
}

function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    timeLeft = 25 * 60;

    document.getElementById("timer").textContent = "25:00";
}
const progrssBar =
document.getElementById("progress");

function updateProgrees(percent) {
    prograssBar.style.wdite = percent +
    "%";
}
