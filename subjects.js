function saveSubjects() {
    localStorage.setItem(
        "subjects",
        JSON.stringify(subjects)
    );
}

function displaySubjects() {
    const container =
        document.getElementById(
            "subjectsContainer"
        );

    container.innerHTML = "";

    subjects.forEach(function(subject) {
        const button =
            document.createElement("button");

        button.className = "subject-btn";

        button.textContent =
            "📚 " + subject;

        button.onclick = function() {
            completeSubject(subject);
        };

        container.appendChild(button);
    });

    displayDeleteButtons();
    updateProgress();
    updateStats();
}

function completeSubject(subject) {
    if (!completedSubjects.includes(subject)) {
        completedSubjects.push(subject);

        localStorage.setItem(
            "completedSubjects",
            JSON.stringify(completedSubjects)
        );
    }

    updateProgress();
    updateStats();

    document.getElementById(
        "message"
    ).textContent =
        subject +
        " study session completed! 🎉";
}

function updateProgress() {
    const total = subjects.length;

    const completed =
        completedSubjects.filter(
            function(subject) {
                return subjects.includes(subject);
            }
        ).length;

    let percentage = 0;

    if (total > 0) {
        percentage =
            Math.round(
                (completed / total) * 100
            );
    }

    document.getElementById(
        "progress"
    ).style.width =
        percentage + "%";

    document.getElementById(
        "progressText"
    ).textContent =
        percentage +
        "% completed";
}

function editSubjects() {
    document.getElementById(
        "subjectEditor"
    ).style.display = "block";

    displayDeleteButtons();
}

function closeEditor() {
    document.getElementById(
        "subjectEditor"
    ).style.display = "none";

    document.getElementById(
        "deleteSubjectsContainer"
    ).innerHTML = "";
}

function addSubject() {
    const input =
        document.getElementById("newSubject");

    const subject =
        input.value.trim();

    if (subject === "") {
        return;
    }

    if (subjects.includes(subject)) {
        alert(
            "This subject already exists!"
        );
        return;
    }

    subjects.push(subject);

    saveSubjects();

    input.value = "";

    displaySubjects();

    document.getElementById(
        "message"
    ).textContent =
        subject +
        " added successfully! 🎉";
}

function displayDeleteButtons() {
    const container =
        document.getElementById(
            "deleteSubjectsContainer"
        );

    container.innerHTML = "";

    subjects.forEach(function(subject) {
        const row =
            document.createElement("div");

        row.className =
            "delete-subject-row";

        const name =
            document.createElement("span");

        name.textContent = subject;

        const deleteButton =
            document.createElement("button");

        deleteButton.textContent =
            "🗑️ Delete";

        deleteButton.onclick =
            function() {
                deleteSubject(subject);
            };

        row.appendChild(name);
        row.appendChild(deleteButton);

        container.appendChild(row);
    });
}

function deleteSubject(subject) {
    const confirmDelete =
        confirm(
            "Delete " +
            subject +
            "?"
        );

    if (!confirmDelete) {
        return;
    }

    subjects =
        subjects.filter(
            function(item) {
                return item !== subject;
            }
        );

    completedSubjects =
        completedSubjects.filter(
            function(item) {
                return item !== subject;
            }
        );

    saveSubjects();

    localStorage.setItem(
        "completedSubjects",
        JSON.stringify(completedSubjects)
    );

    displaySubjects();

    document.getElementById(
        "message"
    ).textContent =
        subject +
        " deleted.";
}

function resetProgress() {
    completedSubjects = [];

    localStorage.removeItem(
        "completedSubjects"
    );

    updateProgress();
    updateStats();

    document.getElementById(
        "message"
    ).textContent =
        "Choose a subject to start studying.";
}
