"use strict";
const inputTask = document.querySelector('.task-input');
const formTask = document.querySelector('.task-form');
const listTasks = document.querySelector('.tasks-list');
const tasks = getTasksFromLocalStorage();
// Display all existing tasks
tasks.forEach(task => appendTaskToList(task));
function getTasksFromLocalStorage() {
    const tasksFromLocalStorage = localStorage.getItem('tasks');
    if (tasksFromLocalStorage === null) {
        return [];
    }
    return JSON.parse(tasksFromLocalStorage);
}
function saveTasksInLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
function appendTaskToList(task) {
    const taskSpan = document.createElement('span');
    taskSpan.textContent = task.text;
    const taskCheckBox = document.createElement('input');
    taskCheckBox.type = "checkbox";
    taskCheckBox.checked = task.status === 'Done';
    taskCheckBox.addEventListener('change', () => {
        if (taskCheckBox.checked) {
            task.status = 'Done';
            saveTasksInLocalStorage();
        }
    });
    const newLi = document.createElement('li');
    newLi.append(taskCheckBox);
    newLi.append(taskSpan);
    listTasks === null || listTasks === void 0 ? void 0 : listTasks.append(newLi);
}
const createTaskElement = (e) => {
    e.preventDefault();
    const newTask = {
        text: inputTask.value,
        status: 'To do',
    };
    tasks.push(newTask);
    saveTasksInLocalStorage();
    appendTaskToList(newTask);
    inputTask.value = '';
};
formTask === null || formTask === void 0 ? void 0 : formTask.addEventListener('submit', createTaskElement);
