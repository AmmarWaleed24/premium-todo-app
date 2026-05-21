const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

// 1. تحميل المهام المحفوظة من الذاكرة عند فتح الصفحة
document.addEventListener('DOMContentLoaded', loadTasks);

addBtn.addEventListener('click', addTask);

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    createTaskElement(taskText);
    saveTaskToLocal(taskText);
    
    taskInput.value = ''; // تفريغ المدخل
}

// دالة لإنشاء عنصر المهمة في الـ HTML
function createTaskElement(text) {
    const li = document.createElement('li');
    li.innerText = text;

    // الضغط على المهمة يعلم عليها كـ منتهية
    li.addEventListener('click', () => {
        li.classList.toggle('completed');
    });

    // زر الحذف
    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // يمنع تفعيل حدث الـ click الخاص بالـ li
        li.remove();
        removeTaskFromLocal(text);
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

// 2. دالة حفظ المهمة في LocalStorage
function saveTaskToLocal(task) {
    let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// 3. دالة تحميل المهام وعرضها
function loadTasks() {
    let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    tasks.forEach(task => createTaskElement(task));
}

// 4. دالة حذف المهمة من الذاكرة
function removeTaskFromLocal(taskToDelete) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks = tasks.filter(task => task !== taskToDelete);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
