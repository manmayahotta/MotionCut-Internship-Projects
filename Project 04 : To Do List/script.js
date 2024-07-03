document.addEventListener('DOMContentLoaded', loadTasks);

const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

form.addEventListener('submit', addTask);

function addTask(e) {
    e.preventDefault();
    
    const taskText = input.value.trim();
    if (taskText === '') return;

    const task = createTaskElement(taskText);
    list.appendChild(task);

    saveTask(taskText);

    input.value = '';
}

function createTaskElement(text) {
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.textContent = text;
    li.appendChild(span);

    const actions = document.createElement('div');
    
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', () => editTask(li, text));

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => deleteTask(li, text));

    const toggleBtn = document.createElement('button');
    toggleBtn.textContent = 'Incomplete';
    toggleBtn.addEventListener('click', () => toggleTask(li, text));
    
    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);
    actions.appendChild(toggleBtn);
    li.appendChild(actions);
    
    return li;
}

function editTask(li, text) {
    const newText = prompt('Edit task:', text);
    if (newText === null || newText.trim() === '') return;
    
    li.firstChild.textContent = newText;
    updateTask(text, newText);
}

function deleteTask(li, text) {
    li.remove();
    removeTask(text);
}

function toggleTask(li, text) {
    li.classList.toggle('completed');
    const button = li.querySelector('button:nth-child(3)');
    button.textContent = li.classList.contains('completed') ? 'Completed' : 'Incomplete';
    updateTask(text, text, li.classList.contains('completed'));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const li = createTaskElement(task.text);
        if (task.completed) {
            li.classList.add('completed');
            li.querySelector('button:nth-child(3)').textContent = 'Completed';
        }
        list.appendChild(li);
    });
}

function saveTask(text) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ text, completed: false });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateTask(oldText, newText, completed = false) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.map(task => task.text === oldText ? { text: newText, completed } : task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(text) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.text !== text);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
