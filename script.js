document.addEventListener('DOMContentLoaded', () => {

    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');


    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false));
    }


    function addTask(taskText, save = true) {

        if (save) {
            taskText = taskInput.value.trim();
        }


        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }


        const li = document.createElement('li');
        li.textContent = taskText;


        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.classList.add('remove-btn');


        removeButton.onclick = () => {
            taskList.removeChild(li);
            removeTaskFromLocalStorage(taskText);
        };


        li.appendChild(removeButton);


        taskList.appendChild(li);


        if (save) {
            taskInput.value = "";
            saveTaskToLocalStorage(taskText);
        }
    }


    function saveTaskToLocalStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }


    function removeTaskFromLocalStorage(taskText) {
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }


    addButton.addEventListener('click', () => addTask(taskInput.value));


    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask(taskInput.value);
        }
    });


    loadTasks();
});