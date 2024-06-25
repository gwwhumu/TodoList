const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function renderTodos() {
  todoList.innerHTML = "";
  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
            <div class="todo-item ${todo.completed ? "completed" : ""}">
                <input type="checkbox" ${
                  todo.completed ? "checked" : ""
                } onchange="toggleTodo(${index})">
                <span class="todo-text">${todo.text}</span>
            </div>
            <div>
                <button onclick="editTodo(${index})">编辑</button>
                <button onclick="deleteTodo(${index})">删除</button>
            </div>
        `;
    todoList.appendChild(li);
  });
}

function addTodo(e) {
  e.preventDefault();
  const todoText = input.value.trim();
  if (todoText) {
    todos.push({ text: todoText, completed: false });
    input.value = "";
    saveTodos();
    renderTodos();
  }
}

function deleteTodo(index) {
  todos.splice(index, 1);
  saveTodos();
  renderTodos();
}

function editTodo(index) {
  const li = todoList.children[index];
  const todoText = todos[index].text;

  li.innerHTML = `
        <input type="text" class="edit-input" value="${todoText}">
        <div>
            <button onclick="updateTodo(${index})">更新</button>
            <button onclick="renderTodos()">取消</button>
        </div>
    `;

  const editInput = li.querySelector(".edit-input");
  editInput.focus();
  editInput.setSelectionRange(todoText.length, todoText.length);
}

function updateTodo(index) {
  const input = todoList.children[index].querySelector(".edit-input");
  const todoText = input.value.trim();
  if (todoText) {
    todos[index].text = todoText;
    saveTodos();
    renderTodos();
  }
}

function toggleTodo(index) {
  todos[index].completed = !todos[index].completed;
  saveTodos();
  renderTodos();
}

form.addEventListener("submit", addTodo);

renderTodos();
