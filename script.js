// =========================
// SUBJECTS
// =========================
let subjects = JSON.parse(
    localStorage.getItem("subjects")
) || [
    "Physics",
    "Chemistry",
    "Biology"
];
let completedSubjects = JSON.parse(
    localStorage.getItem("completedSubjects")
) || [];
// =========================
// TIMER
// =========================
let timeLeft = 25 * 60;
let timerInterval = null;
// =========================
// TO-DO
// =========================
let todos = JSON.parse(
    localStorage.getItem("todos")
) || [];
// =========================
// SAVE SUBJECTS
// =========================
function saveSubjects() {
    localStorage.setItem(
        "subjects",
        JSON.stringify(subjects)
    );
}
// =========================
// DISPLAY SUBJECTS
// =========================
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
// =========================
// COMPLETE SUBJECT
// =========================
function completeSubject(subject) {
    if (
        !completedSubjects.includes(subject)
    ) {
        completedSubjects.push(subject);
        localStorage.setItem(
            "completedSubjects",
            JSON.stringify(
                completedSubjects
            )
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
// =========================
// UPDATE PROGRESS
// =========================
function updateProgress() {
    const total =
        subjects.length;
    const completed =
        completedSubjects.filter(
            function(subject) {
                return subjects.includes(
                    subject
                );
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
// =========================
// STATS
// =========================
function updateStats() {
    document.getElementById(
        "subjectCount"
    ).textContent =
        subjects.length;
    const completed =
        completedSubjects.filter(
            function(subject) {
                return subjects.includes(
                    subject
                );
            }
        ).length;
    document.getElementById(
        "completedCount"
    ).textContent =
        completed;
    document.getElementById(
        "taskCount"
    ).textContent =
        todos.length;
}
// =========================
// EDIT SUBJECTS
// =========================
function editSubjects() {
    document.getElementById(
        "subjectEditor"
    ).style.display =
        "block";
    displayDeleteButtons();
}
function closeEditor() {
    document.getElementById(
        "subjectEditor"
    ).style.display =
        "none";
    document.getElementById(
        "deleteSubjectsContainer"
    ).innerHTML =
        "";
}
// =========================
// ADD SUBJECT
// =========================
function addSubject() {
    const input =
        document.getElementById(
            "newSubject"
        );
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
    );
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
// =========================
// DELETE BUTTONS
// =========================
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
        name.textContent =
            subject;
        const deleteButton =
            document.createElement(
                "button"
            );
        deleteButton.textContent =
            "🗑️ Delete";
        deleteButton.onclick =
            function() {
                deleteSubject(
                    subject
                );
            };
        row.appendChild(name);
        row.appendChild(
            deleteButton
        );
        container.appendChild(row);
    });
}
// =========================
// DELETE SUBJECT
// =========================
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
        JSON.stringify(
            completedSubjects
        )
    );
    displaySubjects();
    document.getElementById(
        "message"
    ).textContent =
        subject +
        " deleted.";
}
// =========================
// RESET PROGRESS
// =========================
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
// =========================
// TIMER
// =========================
function startTimer() {
    if (
        timerInterval !== null
    ) {
        return;
    }
    timerInterval =
        setInterval(
            function() {
                if (timeLeft <= 0) {
                    clearInterval(
                        timerInterval
                    );
                    timerInterval =
                        null;
                    alert(
                        "Study session complete! 🎉"
                    );
                    return;
                }
                timeLeft--;
                updateTimer();
            },
            1000
        );
}
function pauseTimer() {
    clearInterval(
        timerInterval
    );
    timerInterval = null;
}
function updateTimer() {
    const minutes =
        Math.floor(
            timeLeft / 60
        );
    const seconds =
        timeLeft % 60;
    document.getElementById(
        "timer"
    ).textContent =
        String(minutes)
            .padStart(2, "0") +
        ":" +
        String(seconds)
            .padStart(2, "0");
}
function resetTimer() {
    clearInterval(
        timerInterval
    );
    timerInterval = null;
    timeLeft =
        25 * 60;
    updateTimer();
}
// =========================
// SAVE TODOS
// =========================
function saveTodos() {
    localStorage.setItem(
        "todos",
        JSON.stringify(todos)
    );
}
// =========================
// DISPLAY TODOS
// =========================
function displayTodos() {
    const list =
        document.getElementById(
            "todoList"
        );
    list.innerHTML = "";
    todos.forEach(
        function(todo, index) {
            const li =
                document.createElement(
                    "li"
                );
            if (todo.completed) {
                li.classList.add(
                    "completed"
                );
            }
            const text =
                document.createElement(
                    "span"
                );
            text.textContent =
                todo.text;
            text.onclick =
                function() {
                    toggleTodo(index);
                };
            const deleteButton =
                document.createElement(
                    "button"
                );
            deleteButton.textContent =
                "🗑️";
            deleteButton.onclick =
                function() {
                    deleteTodo(index);
                };
            li.appendChild(text);
            li.appendChild(
                deleteButton
            );
            list.appendChild(li);
        }
    );
    updateStats();
}
// =========================
// ADD TODO
// =========================
function addTodo() {
    const input =
        document.getElementById(
            "todoInput"
        );
    const text =
        input.value.trim();
    if (text === "") {
        return;
    }
    todos.push({
        text: text,
        completed: false
    });
    saveTodos();
    input.value = "";
    displayTodos();
}
// =========================
// COMPLETE TODO
// =========================
function toggleTodo(index) {
    todos[index].completed =
        !todos[index].completed;
    saveTodos();
    displayTodos();
}
// =========================
// DELETE TODO
// =========================
function deleteTodo(index) {
    todos.splice(
        index,
        1
    );
    saveTodos();
    displayTodos();
}
// =========================
// STARTUP
// =========================
displaySubjects();
displayTodos();
updateTimer();
updateStats();
// =========================
// EXAM COUNTDOWN
// =========================
let exams = JSON.parse(localStorage.getItem("exams")) || [];
const addExamButton = document.getElementById("addExamButton");
if (addExamButton) {
    addExamButton.addEventListener("click", function () {
        const examName =
            document.getElementById("examName").value.trim();
        const examDate =
            document.getElementById("examDate").value;
        if (examName === "" || examDate === "") {
            alert("Please enter the exam name and date.");
            return;
        }
        const exam = {
            id: Date.now(),
            name: examName,
            date: examDate
        };
        exams.push(exam);
        localStorage.setItem(
            "exams",
            JSON.stringify(exams)
        );
        document.getElementById("examName").value = "";
        document.getElementById("examDate").value = "";
        displayExams();
    });
}
// =========================
// DISPLAY EXAMS
// =========================
function displayExams() { 
    const examList =
        document.getElementById("examList");
    if (!examList) return;
    examList.innerHTML = "";
    exams.forEach(function (exam) {
        const today = new Date();
        const examDate = new Date(exam.date);
        today.setHours(0, 0, 0, 0);
        examDate.setHours(0, 0, 0, 0);
        const difference =
            examDate - today;
        const daysLeft =
            Math.ceil(
                difference /
                (1000 * 60 * 60 * 24)
            );
        let countdown;
        if (daysLeft > 0) {
            countdown =
                daysLeft + " days left"
        } else if (daysLeft === 0) {
            countdown = "Today! 🎯";
        } else {
            countdown = "Completed";
        }
        examList.innerHTML += `
            <div class="exam-item">
                <div>
                    <strong>${exam.name}</strong>
                    <p>📅 ${exam.date}</p>
                    <span>${countdown}</span>
                </div>
                <button
                    onclick="deleteExam(${exam.id})">
                    🗑️ Delete
                </button>
            </div>
        `;
    });
}
// =========================
// DELETE EXAM
// =========================
function deleteExam(id) {
    exams =
        exams.filter(function (exam) {
            return exam.id !== id;
        });
    localStorage.setItem(
        "exams",
        JSON.stringify(exams)
    );
    displayExams();
}
// =========================
// LOAD EXAMS
// =========================
displayExams();
