function saveTodos() {
    localStorage.setItem(
        "todos",
        JSON.stringify(todos)
    );
}

function addTodo() {
    const input =
        document.getElementById("todoInput");

    const text = input.value.trim();

    if (text === "") {
        return;
    }

    todos.push({
        text: text,
        completed: false
    });

    input.value = "";

    saveTodos();
    renderTodos();
    updateStats();
}

function toggleTodo(index) {
    todos[index].completed =
        !todos[index].completed;

    saveTodos();
    renderTodos();
    updateStats();
}

function deleteTodo(index) {
    todos.splice(index, 1);

    saveTodos();
    renderTodos();
    updateStats();
}

function renderTodos() {
    const container =
        document.getElementById("todoList");

    if (!container) {
        return;
    }

    container.innerHTML = "";

    todos.forEach(function(todo, index) {
        const item =
            document.createElement("div");

        item.className = "todo-item";

        item.innerHTML = `
            <span class="${
                todo.completed
                    ? "completed"
                    : ""
            }">
                ${todo.text}
            </span>

            <button onclick="toggleTodo(${index})">
                ${
                    todo.completed
                        ? "Undo"
                        : "Done"
                }
            </button>

            <button onclick="deleteTodo(${index})">
                Delete
            </button>
        `;

        container.appendChild(item);
    });
}
