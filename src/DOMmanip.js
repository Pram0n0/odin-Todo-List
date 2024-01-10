import { createTask } from './todoFunctions';

const manipulation = () => {
    
    displayProjectForm();

    displayTaskForm();
    const task_object = addTask()
    console.log(task_object)

}

const addProjectForm = document.querySelector(".addProjectForm")
const showProjectFormBtn = document.querySelector("#showProjectFormBtn")
const addProjectBtn = document.querySelector("#addProjectBtn")

const addTaskForm = document.querySelector(".addTaskForm")
const showTaskFormBtn = document.querySelector("#showTaskFormBtn")
const addTaskBtn = document.querySelector("#addTaskBtn")
const cancelAddTaskBtn = document.querySelector("#cancelAddTaskBtn")

let taskName = document.querySelector("#taskName")
let taskDueDate = document.querySelector("#dueDate")
let taskPriority = document.querySelector("#priority")
let taskDescription = document.querySelector("#description")
let project = document.querySelector("#project")

function displayProjectForm() {
    showProjectFormBtn.addEventListener("click", () => {
        addProjectForm.style.display = "block"
    })
}

function displayTaskForm() {
    showTaskFormBtn.addEventListener("click", () => {
        addTaskForm.style.display = "block"
    })
}

function addTask() {
    addTaskForm.addEventListener("submit", (event) => {
        event.preventDefault();

        let _taskName = taskName.value;
        let _dueDate = taskDueDate.value;
        let _priority = taskPriority.value;
        let _description = taskDescription.value;
        let _project = project.value;

        const task = createTask(_taskName, _dueDate, _priority, _description, _project)

        clearTaskForm()

        return task
    });
    cancelAddTaskBtn.addEventListener("click", () => {
        clearTaskForm()
    })
}

function clearTaskForm() {
    taskName.value = ""
    taskDueDate.value = ""
    taskPriority.value = ""
    taskDescription.value = ""
    project.value = ""
    addTaskForm.style.display = "none"
}

export { manipulation }