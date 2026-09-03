function showTodos() {
    const list = document.getElementById("todoList");

    list.innerHTML = "";

    todos.forEach(function(todo, index) {
        const item = document.createElement("li");

        item.innerHTML = `
            <span class="${todo.completed ? "completed" : ""}">
                ${todo.text}
            </span>

            <button onclick="completeTodo(${index})">
                ${todo.completed ? "↩️ Undo" : "✅ Done"}
            </button>

            <button onclick="deleteTodo(${index})">
                🗑️ Delete
            </button>
        `;

        list.appendChild(item);
    });

    updateStats();
}


function addTodo() {
    const input = document.getElementById("todoInput");
    const task = input.value.trim();

    if (task === "") {
        alert("Please enter a task.");
        return;
    }

    todos.push({
        text: task,
        completed: false
    });

    input.value = "";

    saveData();
    showTodos();
}


function completeTodo(index) {
    todos[index].completed = !todos[index].completed;

    saveData();
    showTodos();
}


function deleteTodo(index) {
    todos.splice(index, 1);

    saveData();
    showTodos();
}
