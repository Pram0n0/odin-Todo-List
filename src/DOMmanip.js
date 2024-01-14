import { createProjects, createTask } from './todoFunctions';

let projectList = [];

const manipulation = async () => {
    loadSaved();

    switchProjects();

    displayProjectForm();
    addProject();

    displayTaskForm();
    addTask();
}

const content = document.querySelector(".taskItems")
const navbar = document.querySelector(".projectList")


const addProjectForm = document.querySelector(".addProjectForm")
const showProjectFormBtn = document.querySelector("#showProjectFormBtn")
const cancelAddProjectBtn = document.querySelector("#cancelAddProjectBtn")

let projectName = document.querySelector("#projectName")
let selectedProject = "Default"

function addProject() {
    addProjectForm.addEventListener("submit", (event) => {
        event.preventDefault();

        let _projectName = projectName.value;

        const project = createProjects(_projectName, []);
        addProjecttoProjectList(project)
        switchProjects();

        clearProjectForm();
        localStorage.setItem('projects', JSON.stringify(projectList));
    });

    cancelAddProjectBtn.addEventListener("click", () => {
        clearProjectForm();
    });
}

function clearProjectForm() {
    projectName.value = ""
    addProjectForm.style.display = "none"
}

function addProjecttoProjectList(projectObject) {
    projectList.push(projectObject);
    console.log(projectList);
    displayProjectList(projectList);
}

function displayProject(project) {
    const projectItem = document.createElement("button")
    projectItem.textContent = project.projectName

    projectItem.classList.add("project-button");

    navbar.appendChild(projectItem)

}

function displayProjectList(projectList) {
    clearPreviousProjectsDisplay()
    for (let i = 1; i < projectList.length; i++) {
        displayProject(projectList[i])
    }

}

function clearPreviousProjectsDisplay() {
    navbar.innerHTML = ""
}

function switchProjects() {
    const projectButtons = document.querySelectorAll(".project-button");

    projectButtons.forEach((button) => {
        button.addEventListener("click", () => {
            selectedProject = button.textContent
            console.log(`Project button clicked: ${selectedProject}`);
            project.value = selectedProject
            displayTasksByProject(selectedProject);
        });
    });
}

function displayTasksByProject(selectedProject) {
    for (let i = 0; i < projectList.length; i++) {
        if (selectedProject == projectList[i].projectName) {
            displayTaskList(projectList[i].tasks)
        }
    }
}

const addTaskForm = document.querySelector(".addTaskForm")
const showTaskFormBtn = document.querySelector("#showTaskFormBtn")
const cancelAddTaskBtn = document.querySelector("#cancelAddTaskBtn")

const editTaskForm = document.querySelector(".editTaskForm")
const cancelEditTaskBtn = document.querySelector("#cancelEditTaskBtn")

let taskName = document.querySelector("#taskName")
let taskDueDate = document.querySelector("#dueDate")
let taskPriority = document.querySelector("#priority")
let taskDescription = document.querySelector("#description")
let project = document.querySelector("#project")

let taskName2 = document.querySelector("#taskName2")
let taskDueDate2 = document.querySelector("#dueDate2")
let taskPriority2 = document.querySelector("#priority2")
let taskDescription2 = document.querySelector("#description2")

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

        const task = createTask(_taskName, _dueDate, _priority, _description, _project);
        addTasktoProjectList(task)

        clearTaskForm();
        localStorage.setItem('projects', JSON.stringify(projectList));
    });

    cancelAddTaskBtn.addEventListener("click", () => {
        clearTaskForm();
    });
}

function clearTaskForm() {
    taskName.value = ""
    taskDueDate.value = ""
    taskPriority.value = "Medium"
    addTaskForm.style.display = "none"
}

function displayTask(task) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.classList.add(`${task.project}-task`);

    card.innerHTML = `
        <h2>${task.taskName}</h2>
        <p>Due Date: ${task.dueDate}</p>
        <p>Priority: ${task.priority}</p>
    `;

    const modal = document.createElement("div");
    modal.classList.add("modal")

    modal.innerHTML = `
        <h2>${task.taskName}</h2>
        <p>Due Date: ${task.dueDate}</p>
        <p>Priority: ${task.priority}</p>
        <p>Description: ${task.description}</p>
        <p>Project: ${task.project}</p>
        <button class="edit-task-button">Edit</button>
    `;

    card.addEventListener("click", () => {
        modal.style.display = "block";
    });

    modal.addEventListener("click", (event) => {
        // Check if the click is on the edit button
        if (event.target.classList.contains("edit-task-button")) {
            // Call your edit function here
            console.log(`Edit button clicked for task: ${task.taskName}`);
            editTaskForm.style.display = "block"

            editTask(task)

        } else {
            modal.style.display = "none";
        }
    });

    content.appendChild(card)
    content.appendChild(modal)
}

function displayTaskList(taskList) {
    clearPreviousTasksDisplay()
    for (let i = 0; i < taskList.length; i++) {
        displayTask(taskList[i])
    }
}

function clearPreviousTasksDisplay() {
    content.innerHTML = ""
}

function addTasktoProjectList(taskObject) {
    let _projectName = taskObject.project
    for (let i = 0; i < projectList.length; i++) {
        if (_projectName == projectList[i].projectName) {
            projectList[i].tasks.push(taskObject)
            console.log(projectList[i])
            displayTaskList(projectList[i].tasks)
        }
    }
}

function editTask(task) {
    taskName2.value = task.taskName;
    taskDueDate2.value = task.dueDate;
    taskPriority2.value = task.priority;
    taskDescription2.value = task.description;

    editTaskForm.addEventListener("submit", (event) => {
        event.preventDefault();

        let _taskName = taskName2.value;
        let _dueDate = taskDueDate2.value;
        let _priority = taskPriority2.value;
        let _description = taskDescription2.value;

        console.log("Original Task:", task);

        task.taskName = _taskName;
        task.dueDate = _dueDate;
        task.priority = _priority;
        task.description = _description;

        console.log("Updated Task:", task);
        console.log("Submitted Form Values:", _taskName, _dueDate, _priority, _description);

        clearEditForm();

        //To refresh the list
        editTaskinTaskList();
    });

    cancelEditTaskBtn.addEventListener("click", () => {
        clearEditForm();
    });
}

function clearEditForm() {
    // taskName2.value = ""
    // taskDueDate2.value = ""
    // taskPriority2.value = ""
    // taskDescription2.value = ""
    editTaskForm.style.display = "none"
}

function editTaskinTaskList() {
    displayTasksByProject(selectedProject)
}

function loadSaved() {
    const savedProjects = localStorage.getItem('projects');
    if (savedProjects) {
        projectList = JSON.parse(savedProjects);
        displayProjectList(projectList);
    } else {
        projectList.push(createProjects("Default", []));
        displayProjectList(projectList); 
    }
    loadDefault();
}

function loadDefault() {
    displayTaskList(projectList[0].tasks)
}

export { manipulation }