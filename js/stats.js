function updateStats() {
    const subjectCount = document.getElementById("subjectCount");
    const completedCount = document.getElementById("completedCount");
    const taskCount = document.getElementById("taskCount");

    subjectCount.textContent = subjects.length;

    let completed = 0;

    subjects.forEach(function(subject) {
        if (subject.completed) {
            completed++;
        }
    });

    completedCount.textContent = completed;
    taskCount.textContent = todos.length;

    updateProgress(completed);
}


function updateProgress(completed) {
    const progressText = document.getElementById("progressText");
    const progressFill = document.getElementById("progressFill");

    let progress = 0;

    if (subjects.length > 0) {
        progress = Math.round(
            (completed / subjects.length) * 100
        );
    }

    progressText.textContent = progress + "%";
    progressFill.style.width = progress + "%";

    const studyGoal = document.getElementById("studyGoal");

    if (progress === 100) {
        studyGoal.textContent = "All subjects completed! 🎉";
    } else if (progress >= 50) {
        studyGoal.textContent = "Good progress! Keep going 📚";
    } else {
        studyGoal.textContent = "Complete all your subjects 📚";
    }
}
