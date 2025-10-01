document.addEventListener("DOMContentLoaded", () => {
    const todoInput = document.getElementById("todo-input");
    const addTaskButton = document.getElementById("add-task-btn");
    const todoList = document.getElementById("todo-list");

    let tasks = [];

    addTaskButton.addEventListener("click", addTask);
    
    todoInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            addTask();
        }
    });

    function addTask() {
        const taskText = todoInput.value.trim();
        if(taskText === "")return;

        const newTask = {
            id : Date.now(),   
            text : taskText,
            completed : false
        }

        tasks.push(newTask);   
        todoInput.value = "";  
    }
})