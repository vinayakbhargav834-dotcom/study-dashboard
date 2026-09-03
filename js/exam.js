function addExam() {
    const name = document.getElementById("examName").value.trim();
    const date = document.getElementById("examDate").value;

    if (name === "" || date === "") {
        alert("Please enter the exam name and date.");
        return;
    }

    exams.push({
        name: name,
        date: date
    });

    saveData();

    document.getElementById("examName").value = "";
    document.getElementById("examDate").value = "";

    showExams();
    updateStats();
}


function showExams() {
    const examList = document.getElementById("examList");

    examList.innerHTML = "";

    exams.forEach(function(exam, index) {
        const examBox = document.createElement("div");

        examBox.className = "exam-item";

        examBox.innerHTML = `
            <div>
                <strong>${exam.name}</strong>
                <p>${exam.date}</p>
            </div>

            <button onclick="deleteExam(${index})">
                Delete
            </button>
        `;

        examList.appendChild(examBox);
    });
}


function deleteExam(index) {
    exams.splice(index, 1);

    saveData();

    showExams();
    updateStats();
}
