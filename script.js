window.onload = loadTasks

function loadTasks(){

    // check if localStorage has any todos
    // if not then return
    if(localStorage.getItem("todos") == null) return

    // Get the tasks from localStorage and convert it to an array
    const todosArray = Array.from(JSON.parse(localStorage.getItem("todos")))
    const list = document.querySelector("ul")

    // Loop through the tasks and add them to the list
    todosArray.forEach(x => {
        const li = document.createElement("li")
        li.innerHTML=`
        <input type="checkbox" onclick="taskComplete(this)" 
        class="check" ${x.completed ? 'checked' : ''}>
        <input type="text" value="${x.task}" class="task ${x.completed ? 
            'completed' : ''}" onfocus="getCurrentTask(this)" onblur="editTask(this)">
        <i class="fa fa-trash" onclick="removeTask(this)"></i>
        `
        list.insertBefore(li, list.children[0]);

    })

}

// On form submit add task
document.querySelector("form").addEventListener("submit", e => {
    e.preventDefault()
    addTask()
    
})

function addTask(){
    const userInput = document.querySelector("form input")
    const list = document.querySelector("ul")

    // return if input is empty
    if(!userInput.value){
        alert("Input cannot be empty")
        return
    }

    // add task to local storage
    localStorage.setItem("todos", JSON.stringify([...JSON.parse(
        localStorage.getItem("todos") || "[]"), 
        { task: userInput.value, completed: false }]));

    const li = document.createElement("li")
    li.innerHTML = `
    <input type="checkbox" onclick="taskComplete(this)" class="check">
    <input type="text" value="${userInput.value}" class="task" 
    onfocus="getCurrentTask(this)" onblur="editTask(this)">
    <i class="fa fa-trash" onclick="removeTask(this)"></i>`;
    list.insertBefore(li, list.children[0]);
    // clear input
    userInput.value = "";
}



function taskComplete(event) {
    const todosArray = Array.from(JSON.parse(localStorage.getItem("todos")))

    todosArray.forEach(x => {
        if(x.task === event.nextElementSibling.value) {
            //reverse the "completed" boolean value
            x.completed = !x.completed
        }
    })

    localStorage.setItem("todos", JSON.stringify(todosArray))
    event.nextElementSibling.classList.toggle("completed");
}


function removeTask(event) {
    const todosArray = Array.from(JSON.parse(localStorage.getItem("todos")))

    todosArray.forEach(x => {
        if(x.task === event.parentNode.children[1].value) {
            todosArray.splice(todosArray.indexOf(x), 1)
        }
    })

    localStorage.setItem("todos", JSON.stringify(todosArray))
    event.parentElement.remove()

}

let currentTask = null

function getCurrentTask(event) {
    currentTask = event.value
}

//edit task and update localStorage
function editTask(event) {
    if(!event.value) {
        alert("Taks cannot be empty")
        event.value = currentTask
        return
    }

    const todosArray = Array.from(JSON.parse(localStorage.getItem("todos")))

    todosArray.forEach(x => {
        if(x.task === currentTask) {
            x.task = event.value
        }
    })

    localStorage.setItem("todos", JSON.stringify(todosArray))
}