function updateStats() {
    document.getElementById("subjectCount").textContent =
        subjects.length;

    document.getElementById("completedCount").textContent =
        completedSubjects.length;

    document.getElementById("taskCount").textContent =
        todos.filter(function(todo) {
            return !todo.completed;
        }).length;
}
