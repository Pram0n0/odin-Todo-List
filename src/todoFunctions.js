function createProjects(projectName, tasks) {
    return {projectName, tasks}
}

function createTask(taskName, dueDate, priority, description, project) {
    return { taskName, dueDate, priority, description, project }
}

export { createProjects, createTask };
