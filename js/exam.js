function saveExams() {
    localStorage.setItem(
        "exams",
        JSON.stringify(exams)
    );
}

function addExam() {
    const nameInput =
        document.getElementById("examName");

    const dateInput =
        document.getElementById("examDate");

    const name =
        nameInput.value.trim();

    const date =
        dateInput.value;

    if (name === "" || date === "") {
        alert(
            "Please enter exam name and date."
        );
        return;
    }

    exams.push({
        name: name,
        date: date
    });

    saveExams();

    nameInput.value = "";
    dateInput.value = "";

    renderExams();
    updateStats();
}

function deleteExam(index) {
    exams.splice(index, 1);

    saveExams();

    renderExams();
    updateStats();
}

function renderExams() {
    const container =
        document.getElementById(
            "examList"
        );

    if (!container) {
        return;
    }

    container.innerHTML = "";

    exams.forEach(function(exam, index) {
        const item =
            document.createElement("div");

        item.className = "exam-item";

        item.innerHTML = `
            <h3>${exam.name}</h3>

            <p>
                Exam Date: ${exam.date}
            </p>

            <button
                onclick="deleteExam(${index})"
            >
                Delete
            </button>
        `;

        container.appendChild(item);
    });
}
