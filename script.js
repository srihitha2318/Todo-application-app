const API_URL = "https://jsonplaceholder.typicode.com/todos";

// -------------------------------
// Fetch & Store First 20 Todos (only once)
// -------------------------------
async function fetchAndStoreTodos() {
    const res = await fetch(API_URL);
    const todos = await res.json();

    const first20 = todos.slice(0, 20);

    localStorage.setItem("todos", JSON.stringify(first20));

    renderTodos();
}

// -------------------------------
// Get Todos from LocalStorage
// -------------------------------
function getTodos() {
    return JSON.parse(localStorage.getItem("todos")) || [];
}

// -------------------------------
// Save Todos to LocalStorage
// -------------------------------
function saveTodos(todos) {
    localStorage.setItem("todos", JSON.stringify(todos));
}

// -------------------------------
// Render Todos on UI
// -------------------------------
function renderTodos() {
    const container = document.getElementById("todo-container");
    const todos = getTodos();

    container.innerHTML = "";  

    if (todos.length === 0) {
        container.innerHTML = "<h3>No Todos Available</h3>";
        return;
    }

    todos.forEach(todo => {
        const div = document.createElement("div");
        div.className = "todo";

        div.innerHTML = `
            <span class="${todo.completed ? 'completed' : ''}">
                ${todo.title}
            </span>

            <div>
                <button onclick="toggleComplete(${todo.id})">
                    ${todo.completed ? "Undo" : "Complete"}
                </button>
                
                <button onclick="deleteTodo(${todo.id})" style="background:red;color:white">
                    Delete
                </button>
            </div>
        `;

        container.appendChild(div);
    });
}

// -------------------------------
// Add New Todo (User Input)
// -------------------------------
function addTodo() {
    const input = document.getElementById("newTodo");
    const text = input.value.trim();

    if (text === "") {
        alert("Please enter a todo!");
        return;
    }

    const todos = getTodos();

    const newTodo = {
        id: Date.now(),    // unique ID
        title: text,
        completed: false
    };

    todos.push(newTodo);
    saveTodos(todos);

    input.value = ""; // clear input
    renderTodos();
}

// -------------------------------
// Delete Todo
// -------------------------------
function deleteTodo(id) {
    const todos = getTodos();
    const updated = todos.filter(todo => todo.id !== id);

    saveTodos(updated);
    renderTodos();
}

// -------------------------------
// Toggle Complete Status
// -------------------------------
function toggleComplete(id) {
    const todos = getTodos();

    const updated = todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );

    saveTodos(updated);
    renderTodos();
}

// -------------------------------
// Initialize App
// -------------------------------
if (!localStorage.getItem("todos")) {
    fetchAndStoreTodos();
} else {
    renderTodos();
}
