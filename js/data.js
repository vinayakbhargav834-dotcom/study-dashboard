// SUBJECTS
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

// TIMER
let timeLeft = 25 * 60;
let timerInterval = null;

// TO-DO
let todos = JSON.parse(
    localStorage.getItem("todos")
) || [];

// EXAMS
let exams = JSON.parse(
    localStorage.getItem("exams")
) || [];
