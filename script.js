document.addEventListener("DOMContentLoaded", () => {
    const todoInput = document.getElementById("todo-input");
    const addTaskButton = document.getElementById("add-task-btn");
    const todoList = document.getElementById("todo-list");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];   // To store the task and it's information. if their is nothing to grab in local strorage nothing to parse, then we use the empty array.
    // JSON.parse is used to convert string to it's original data structure. Here string->array

    tasks.forEach((task) => renderTask(task));

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
        saveTasks();
        renderTask(newTask)  
        todoInput.value = "";  
    }

    // Read from local storage and render task to DOM
    // Grab task from local storage. Local storage -> console   
    function renderTask(task) {
        const li = document.createElement("li");
        li.setAttribute("data-id", task.id);

        li.innerHTML = `
        <span>${task.text}</span>
        <button>Delete</button>`;
        
        if(task.completed) li.classList.add("completed");

        li.addEventListener("click", (e) => {
            if(e.target.tagName === "BUTTON") return;
            task.completed = !task.completed;
            li.classList.toggle("completed");
            saveTasks();
        })

        li.querySelector("button").addEventListener("click", (e) =>{
            e.stopPropagation();
            tasks = tasks.filter(t => t.id !== task.id);
            li.remove();
            saveTasks();
        })

        todoList.appendChild(li);
    }

    // Function to store array in local storage 
    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));  // it takes key:value pair and both has to be string. JSON.stringify is used to convert original data structure to string. Here array->string
    }

})