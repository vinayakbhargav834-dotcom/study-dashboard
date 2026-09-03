// SUBJECTS
let subjects = JSON.parse(
    localStorage.getItem("subjects")
) || [
    {
        name: "Physics",
        completed: false
    },
    {
        name: "Chemistry",
        completed: false
    },
    {
        name: "Biology",
        completed: false
    }
];


// Fix old saved subjects
subjects = subjects.map(function(subject) {
    if (typeof subject === "string") {
        return {
            name: subject,
            completed: false
        };
    }

    return subject;
});


// TO-DO
let todos = JSON.parse(
    localStorage.getItem("todos")
) || [];


// EXAMS
let exams = JSON.parse(
    localStorage.getItem("exams")
) || [];


// SAVE DATA
function saveData() {
    localStorage.setItem(
        "subjects",
        JSON.stringify(subjects)
    );

    localStorage.setItem(
        "todos",
        JSON.stringify(todos)
    );

    localStorage.setItem(
        "exams",
        JSON.stringify(exams)
    );
}
