const inputTask = document.querySelector('.task-input') as HTMLInputElement
const formTask = document.querySelector('.task-form') as HTMLFormElement
const listTasks = document.querySelector('.tasks-list') as HTMLUListElement
const tasks: Task[] = getTasksFromLocalStorage()

interface Task {
  text: string;
  status: "In progress" | "Done" | "To do" | "Dropped";
}

// Display all existing tasks
tasks.forEach(task => appendTaskToList(task))

function getTasksFromLocalStorage(): Task[] {
  const tasksFromLocalStorage = localStorage.getItem('tasks')

  if(tasksFromLocalStorage === null) {
    return []
  }

  return JSON.parse(tasksFromLocalStorage)
}

function saveTasksInLocalStorage(): void {
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

function appendTaskToList(task: Task): void {
  const taskSpan = document.createElement('span')
  taskSpan.textContent = task.text

  const taskCheckBox = document.createElement('input')
  taskCheckBox.type = "checkbox"
  taskCheckBox.checked = task.status === 'Done'
  taskCheckBox.addEventListener('change', () => {
    if(taskCheckBox.checked) {
      task.status = 'Done'
      saveTasksInLocalStorage()
    }
  })

  const newLi = document.createElement('li')
  newLi.append(taskCheckBox)
  newLi.append(taskSpan)
  listTasks?.append(newLi)
}

const createTaskElement = (e: SubmitEvent): void => {
  e.preventDefault()

  const newTask: Task = {
    text: inputTask.value,
    status: 'To do',
  }
  
  tasks.push(newTask)
  saveTasksInLocalStorage()

  appendTaskToList(newTask)

  inputTask.value = ''
}

formTask?.addEventListener('submit', createTaskElement)