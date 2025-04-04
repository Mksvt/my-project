const task_do = document.querySelector(".taskInput");
const task_date = document.querySelector(".taskTime");
const add_task = document.querySelector(".addTaskButton");
const task_list = document.querySelector(".taskList");
const taskCheckbox = document.querySelector(".taskCheckbox");
const deleteTaskButton = document.querySelector(".deleteTaskButton");

add_task.addEventListener("click", function () {
    if (task_do.value === "") {
        alert("Please enter a task.");
    } else {

        const html = `
        <div class="taskItem">
            <input type="checkbox" class="taskCheckbox">
            <span class="taskText">${task_do.value}</span>
            <span class="taskDate">${task_date.value}</span>
            <button class="deleteTaskButton">Delete</button>
            <button class="editTaskButton">Edit</button>
        </div>`;
        //saveTasks(); тут не працює Ти викликаєш saveTasks() перед тим, як додається нова задача в addEventListener("click"), тому вона не потрапляє в localStorage


        task_list.insertAdjacentHTML('afterbegin',html);
        task_do.value = "";
        task_date.value = "";

        saveTasks(); 
    }
})

task_list.addEventListener("click", function (event) {
    if (event.target.classList.contains("taskCheckbox")) {
        const taskText = event.target.closest(".taskItem").querySelector(".taskText");
        const taskDate = event.target.closest(".taskItem").querySelector(".taskDate");

        if (event.target.checked) {
            taskText.style.textDecoration = "line-through";
            taskText.style.color = "gray";
            taskDate.style.textDecoration = "line-through";
            taskDate.style.color = "gray";
        } else {
            taskText.style.textDecoration = "none";
            taskText.style.color = "#DFB6B2";
            taskDate.style.textDecoration = "none";
            taskDate.style.color = "##DFB6B2";
        }
    }

    if (event.target.classList.contains("deleteTaskButton")){
        const taskItem = event.target.closest(".taskItem");
        taskItem.remove();
    }

    if (event.target.classList.contains("editTaskButton")){
        const taskItem = event.target.closest(".taskItem");
        const taskText = taskItem.querySelector(".taskText");
        const newTask = prompt("Edit your task:", taskText.textContent);
        if (newTask !== null && newTask !== "") {
            taskText.textContent = newTask;
        }
    }

    if ( //перевірка на зміни 
        event.target.classList.contains("taskCheckbox") ||
        event.target.classList.contains("deleteTaskButton") ||
        event.target.classList.contains("editTaskButton")
    ) {
        setTimeout(saveTasks, 0); // Дати DOM оновитись перед збереженням
    }

});

function saveTasks() {
    const tasks = [];
    document.querySelectorAll(".taskItem").forEach(item => {
        tasks.push({
            text: item.querySelector(".taskText").textContent,
            date: item.querySelector(".taskDate").textContent,
            completed: item.querySelector(".taskCheckbox").checked
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
  
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        const html = `
        <div class="taskItem">
            <input type="checkbox" class="taskCheckbox" ${task.completed ? "checked" : ""}>
            <span class="taskText" style="text-decoration: ${task.completed ? "line-through" : "none"}; color: ${task.completed ? "gray" : "##DFB6B2"};">${task.text}</span>
            <span class="taskDate" style="text-decoration: ${task.completed ? "line-through" : "none"}; color: ${task.completed ? "gray" : "#DFB6B2"};">${task.date}</span>
            <button class="deleteTaskButton">Delete</button>
            <button class="editTaskButton">Edit</button>
        </div>`;
        task_list.insertAdjacentHTML('beforeend', html);
    })
}

loadTasks();



