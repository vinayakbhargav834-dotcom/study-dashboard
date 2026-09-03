function showSubjects() {
    const container = document.getElementById("subjectsContainer");

    container.innerHTML = "";

    subjects.forEach(function(subject, index) {
        const subjectBox = document.createElement("div");

        subjectBox.className = "subject-item";

        subjectBox.innerHTML = `
            <span>${subject.name}</span>

            <button onclick="completeSubject(${index})">
                ${subject.completed ? "✅ Completed" : "Complete"}
            </button>

            <button onclick="deleteSubject(${index})">
                🗑️ Delete
            </button>
        `;

        container.appendChild(subjectBox);
    });

    updateStats();
}


function addSubject() {
    const name = prompt("Enter subject name:");

    if (name === null || name.trim() === "") {
        return;
    }

    subjects.push({
        name: name.trim(),
        completed: false
    });

    saveData();
    showSubjects();
}


function completeSubject(index) {
    subjects[index].completed = !subjects[index].completed;

    saveData();
    showSubjects();
}


function deleteSubject(index) {
    subjects.splice(index, 1);

    saveData();
    showSubjects();
}


function resetProgress() {
    subjects.forEach(function(subject) {
        subject.completed = false;
    });

    saveData();
    showSubjects();
}
