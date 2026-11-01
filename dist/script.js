// Wait for the webpage to load
document.addEventListener("DOMContentLoaded", domLoaded);

// Set up event listeners
function domLoaded() {
    const addBtn = document.getElementById("add-btn");
    const taskInput = document.getElementById("new-task");

    // Add a task when Add is clicked
    addBtn.addEventListener("click", addBtnClick);

    // Add a task when Enter is pressed
    taskInput.addEventListener("keyup", function(event) {
        if (event.key === "Enter") {
            addBtnClick();
        }
    });

    // Set up remove buttons for existing tasks
    const doneButtons = document.querySelectorAll(".done-btn");

    for (let button of doneButtons) {
        button.addEventListener("click", removeTask);
    }
    const themeBtn = document.getElementById("theme-btn");

    themeBtn.addEventListener("click", function() {
        const isDark = document.body.classList.toggle("dark-mode");

        if (isDark) {
            themeBtn.textContent = "☀️ Light Mode";
        }
        else {
            themeBtn.textContent = "🌙 Dark Mode";
        }
    });
    
    // Count the tasks when the webpage loads
    updateTaskCount();
}

// Get the new task from the textbox
function addBtnClick() {
    const taskInput = document.getElementById("new-task");
    const newTask = taskInput.value.trim();

    // Prevent empty tasks
    if (newTask.length > 0) {
        addTask(newTask);
    }
    else {
        alert("You must type a task before adding!");
    }

    // Clear the textbox and return focus
    taskInput.value = "";
    taskInput.focus();
}

// Create and add a new task
function addTask(task) {
    const newItem = document.createElement("li");

    newItem.innerHTML =
        `<span class="task-text">${task}</span><button class="done-btn">&#10006;</button>`;

    const taskList = document.querySelector("ol");
    taskList.appendChild(newItem);

    // Add a click handler to the newest remove button
    const doneButtons = document.querySelectorAll(".done-btn");
    doneButtons[doneButtons.length - 1].addEventListener("click", removeTask);
}

// Remove a task when its X button is clicked
function removeTask(event) {
    const listItem = event.target.parentNode;
    listItem.parentNode.removeChild(listItem);
}

// Update the number of remaining tasks
function updateTaskCount() {
    const tasks = document.querySelectorAll("#task-list li");
    const count = tasks.length;

    const taskCounter = document.getElementById("task-count");

    if (count === 1) {
        taskCounter.textContent = count + " Task Remaining";
    }
    else {
        taskCounter.textContent = count + " Tasks Remaining";
    }
}