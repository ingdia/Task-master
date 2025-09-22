let tasklist= []

function AddTask(inputText, taskstatus, taskpriority){
    let mytask = {
    id:Date.now() ,
    name: inputText,
    status: taskstatus,
    priority: taskpriority,

};
tasklist.push(mytask);
function selectpriorityOptions(mypriority){
    if (mypriority=== "low"){
        return "bg-green-500 text-black px-2 py-1 rounded-full";
    }
    else if (mypriority=== "medium"){
        return "bg-blue-500 text-black px-2 py-1 rounded-full";
    }
    else{
       
        return "bg-red-500 text-black px-2 py-1 rounded-full";
    
    }
}

let taskDiv = document.createElement("div");

taskDiv.className= "flex justify-between  px-4 mb-2"
taskDiv.innerHTML=` <button class="bg-zinc-700 w-10 rounded-bl-2xl rounded-tl-2xl">
                <input type="checkbox"class="" id="checkbox"/>
               </button> 
              
               <div class="flex bg-zinc-700 w-204 px-2 py-2 justify-between">
                <p>${inputText} [${taskstatus}] - Priority: <span class="${selectpriorityOptions(taskpriority)}">${taskpriority}</span></p>
                <button><i class="fa-solid fa-edit"></i></button>
               </div>
             
               <button class="bg-zinc-700 w-10 rounded-br-2xl rounded-tr-2xl">
                <i class="fa-solid fa-trash"></i>
                </button>`


  document.getElementById("container").appendChild(taskDiv);
}


document.getElementById("addForm").addEventListener("submit", function(e){
    e.preventDefault();
    let inputText= e.target.task.value.trim();
    let taskstatus= e.target.status.value;
    let taskpriority= e.target.priority.value;

    AddTask(inputText, taskstatus, taskpriority);
    e.target.reset();

})


