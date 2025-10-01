// Wait for the HTML content to fully load before running the script
document.addEventListener("DOMContentLoaded", () => {

    // Get references to input field, button, and task list container
    const todoInput = document.getElementById("todo-input");
    const addTaskButton = document.getElementById("add-task-btn");
    const todoList = document.getElementById("todo-list");

    // Load saved tasks from localStorage (if any), otherwise start with an empty array
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Render all existing tasks on page load
    tasks.forEach((task) => renderTask(task));

    // Add a new task when the button is clicked
    addTaskButton.addEventListener("click", addTask);

    // Also add a new task when "Enter" key is pressed
    todoInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            addTask();
        }
    });

    // Function to create and store a new task
    function addTask() {
        const taskText = todoInput.value.trim(); // Remove extra spaces
        if (taskText === "") return; // Ignore empty input

        // Create a new task object
        const newTask = {
            id: Date.now(),      // Unique ID based on current time
            text: taskText,      // The task description
            completed: false     // Initially not completed
        }

        tasks.push(newTask);     // Add new task to array
        saveTasks();             // Save updated tasks to localStorage
        renderTask(newTask);     // Show new task on the page
        todoInput.value = "";    // Clear input field
    }

    // Function to display a single task in the list
    function renderTask(task) {
        const li = document.createElement("li"); // Create new list item
        li.setAttribute("data-id", task.id);     // Store task ID in HTML attribute

        // Add task text and delete button inside the list item
        li.innerHTML = `
        <span>${task.text}</span>
        <button>Delete</button>`;

        // If task was already completed, add the class for styling
        if (task.completed) li.classList.add("completed");

        // Toggle completed state when task is clicked (but not delete button)
        li.addEventListener("click", (e) => {
            if (e.target.tagName === "BUTTON") return; // Ignore button clicks
            task.completed = !task.completed;         // Flip completed status
            li.classList.toggle("completed");        // Update style
            saveTasks();                              // Save changes
        })

        // Delete task when delete button is clicked
        li.querySelector("button").addEventListener("click", (e) => {
            e.stopPropagation();                      // Prevent parent click event
            tasks = tasks.filter(t => t.id !== task.id); // Remove from array
            li.remove();                              // Remove from UI
            saveTasks();                              // Save updated list
        })

        // Add the new list item to the task list container
        todoList.appendChild(li);
    }

    // Save tasks array to localStorage as a string
    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

})
