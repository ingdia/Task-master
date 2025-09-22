// array that will keep my task
let tasklist = [];

// laoding a saved tasks if any
window.addEventListener("loading a content", function() {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
        tasklist = JSON.parse(savedTasks);
        tasklist.forEach(task => {
            renderTask(task);
        });
    }
});

// Add a new task
function AddTask(inputText, taskstatus, taskpriority) {
    const mytask = {
        id: Date.now(),
        name: inputText,
        status: taskstatus,
        priority: taskpriority
    };

    tasklist.push(mytask);
    localStorage.setItem("tasks", JSON.stringify(tasklist));
    renderTask(mytask);
}

// creating a function that helps  to output the tasks 
function renderTask(task) {
    function selectpriorityOptions(mypriority) {
        if (mypriority === "low") return "bg-green-500 text-black px-2 py-1 rounded-full";
        if (mypriority === "medium") return "bg-blue-500 text-black px-2 py-1 rounded-full";
        return "bg-red-500 text-black px-2 py-1 rounded-full";
    }

    const taskDiv = document.createElement("div");
    taskDiv.className = "flex justify-between px-4 mb-2";
    taskDiv.setAttribute("data-id", task.id);

    taskDiv.innerHTML = `
        <button class="bg-zinc-700 w-10 rounded-bl-2xl rounded-tl-2xl">
            <input type="checkbox" ${task.status === 'complete' ? 'checked' : ''} />
        </button>
        <div class="flex bg-zinc-700 w-204 px-2 py-2 justify-between">
            <p>${task.name} [${task.status}] - Priority: 
                <span class="${selectpriorityOptions(task.priority)}">${task.priority}</span>
            </p>
            <button class="edit-btn"><i class="fa-solid fa-edit"></i></button>
        </div>
        <button class="delete-btn bg-zinc-700 w-10 rounded-br-2xl rounded-tr-2xl">
            <i class="fa-solid fa-trash"></i>
        </button>
    `;

    document.getElementById("container").appendChild(taskDiv);
}

// getting form data inputs  if the user inputs task
document.getElementById("addForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const inputText = e.target.task.value.trim();
    const taskstatus = e.target.status.value;
    const taskpriority = e.target.priority.value;

    if(inputText) {
        AddTask(inputText, taskstatus, taskpriority);
        e.target.reset();
    }
});

// deleteing and mark as complete 
document.getElementById("container").addEventListener("click", function(e) {
    const taskDiv = e.target.closest("div[data-id]");
    if (!taskDiv) return;

    const id = Number(taskDiv.getAttribute("data-id"));

    // Delete task
    if (e.target.closest(".delete-btn")) {
        taskDiv.remove();
        tasklist = tasklist.filter(task => task.id !== id);
        localStorage.setItem("tasks", JSON.stringify(tasklist));
    }

    //  complete status
    if (e.target.closest("input[type='checkbox']")) {
        const task = tasklist.find(task => task.id === id);
        task.status = task.status === 'complete' ? 'todo' : 'complete';
        localStorage.setItem("tasks", JSON.stringify(tasklist));

        const p = taskDiv.querySelector("p");
        p.innerHTML = `${task.name} [${task.status}] - Priority: 
            <span class="${p.querySelector('span').className}">${task.priority}</span>`;
    }

    // Edit task
    if (e.target.closest(".edit-btn")) {
        const task = tasklist.find(task => task.id === id);
        const p = taskDiv.querySelector("p");
       // editing the task name
        const input = document.createElement("input");
        input.type = "text";
        input.value = task.name;
        input.className = "px-1 text-black";
        p.innerHTML = ""; // removing the existing task
        p.appendChild(input);
        input.focus();

        // saving a task when we press enter
        input.addEventListener("keypress", function(ev) {
            if (ev.key === "Enter") {
                task.name = input.value.trim() || task.name;
                localStorage.setItem("tasks", JSON.stringify(tasklist));
                // outputing the creeated task
                const selectpriorityOptions = (mypriority) => {
                    if(mypriority==="low") return "bg-green-500 text-black px-2 py-1 rounded-full";
                    if(mypriority==="medium") return "bg-blue-500 text-black px-2 py-1 rounded-full";
                    return "bg-red-500 text-black px-2 py-1 rounded-full";
                };
                p.innerHTML = `${task.name} [${task.status}] - Priority: 
                    <span class="${selectpriorityOptions(task.priority)}">${task.priority}</span>`;
            }
        });
    }
});
