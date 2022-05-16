// ?selectors

const addTodo = document.querySelector(".addBtn");
const todoInput = document.querySelector(".todoinput");
const filter = document.querySelector(".filterlist")
const todoList = document.querySelector(".todoList");
// event listeners
addTodo.addEventListener("click", addTodolist);
filter.addEventListener("click", filterTodo);
document.addEventListener("DOMContentLoaded", getLocalTodos);
todoList.addEventListener("click", checkRemove)

// functions
function addTodolist(e) {
    e.preventDefault();
    if (todoInput.value != "") {
        // creat div
        const tododiv = document.createElement("div");
        tododiv.classList.add("todo")
            // creat todo item  
        const newTodo = ` <li class="listNote">${todoInput.value}</li>
    <span><i class="fa-regular fa-square-check"></i></span>
    <span><i class="fa-regular fa-trash-can removeTodo"></i></span>`
        tododiv.innerHTML = newTodo;
        // append to todolist

        todoList.appendChild(tododiv);
        // saved to local
        saveLocal(todoInput.value);
        // clear Input
        todoInput.value = "";
    }

}

function checkRemove(e) {
    const classlist = [...e.target.classList];

    const item = e.target.parentElement.parentElement;
    if (classlist[1] === "fa-trash-can") {

        item.remove()
        todoRemove(item);
    } else if (classlist[1] === "fa-square-check") {
        item.classList.toggle("complete")
    }
}

function filterTodo(e) {
    const todos = [...todoList.childNodes]
    console.log(todos)
    todos.forEach((todo) => {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "complete":
                if (todo.classList.contains("complete")) {
                    todo.style.display = "flex";
                    break;
                } else {
                    todo.style.display = "none";
                    break;
                }
            case "uncomplete":
                if (todo.classList.contains("complete")) {
                    todo.style.display = "none";
                    break;
                } else {
                    todo.style.display = "flex";
                    break;
                }

        }
    })
}

function saveLocal(todo) {
    let savedTodos = localStorage.getItem("todos") ?
        JSON.parse(localStorage.getItem("todos")) : [];
    savedTodos.push(todo);
    localStorage.setItem("todos", (JSON.stringify(savedTodos)))
}

function getLocalTodos() {
    let savedTodos = localStorage.getItem("todos") ?
        JSON.parse(localStorage.getItem("todos")) : [];

    savedTodos.forEach((todo) => {
        // create div
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        // create todo item
        const newTodo = ` <li class="listNote">${todo}</li>
    <span><i class="fa-regular fa-square-check"></i></span>
  
    <span><i class="fa-regular fa-trash-can removeTodo"></i></span>`
        todoDiv.innerHTML = newTodo;
        // append to todolist
        todoList.appendChild(todoDiv);
    });
}

function todoRemove(todo) {
    // console.log(todo.children[0].innerText);
    let savedTodos = localStorage.getItem("todos") ?
        JSON.parse(localStorage.getItem("todos")) : [];
    const filteredTodos = savedTodos.filter(
        (t) => t !== todo.children[0].innerText
    );
    localStorage.setItem("todos", JSON.stringify(filteredTodos));
}