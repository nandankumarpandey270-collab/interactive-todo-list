const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const emptyMessage = document.getElementById("empty-message");
const clearAllButton = document.getElementById("clear-all");

// Load saved tasks from LocalStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Save tasks in LocalStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Display tasks on the page
function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach(function(task) {
        const li = document.createElement("li");

        if (task.completed) {
            li.classList.add("completed");
        }

        // Checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        checkbox.addEventListener("change", function() {
            task.completed = checkbox.checked;
            saveTasks();
            renderTasks();
        });

        // Task text
        const span = document.createElement("span");
        span.textContent = task.text;

        // Delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function() {
            tasks = tasks.filter(function(t) {
                return t.id !== task.id;
            });

            saveTasks();
            renderTasks();
        });

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteButton);

        taskList.appendChild(li);
    });

    // Show message if no tasks exist
    emptyMessage.style.display =
        tasks.length === 0 ? "block" : "none";
}

// Add a new task
taskForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const text = taskInput.value.trim();

    if (text === "") {
        alert("Please enter a task!");
        return;
    }

    const newTask = {
        id: Date.now(),
        text: text,
        completed: false
    };

    tasks.push(newTask);

    saveTasks();
    renderTasks();

    taskInput.value = "";
    taskInput.focus();
});

// Clear all tasks
clearAllButton.addEventListener("click", function() {
    if (tasks.length === 0) {
        alert("There are no tasks to clear!");
        return;
    }

    const confirmClear = confirm(
        "Are you sure you want to delete all tasks?"
    );

    if (confirmClear) {
        tasks = [];
        saveTasks();
        renderTasks();
    }
});

// Display saved tasks when page loads
renderTasks();