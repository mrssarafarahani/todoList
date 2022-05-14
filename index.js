const addTodo = document.querySelector(".addBtn");
const todoInput = document.querySelector(".todoinput");
const filter = document.querySelector(".filterlist")
const todoList = document.querySelector(".todoList");

addTodo.addEventListener("click", addTodolist);
filter.addEventListener("click", filterTodo);

function addTodolist(e) {
    e.preventDefault();

    const tododiv = document.createElement("div");
    tododiv.classList.add("list")
    const newTodo = ` <li class="listNote">${todoInput.value}</li>
    <span><i class="fa-regular fa-square-check"></i></span>
   <span><i class="fa-solid fa-pen-to-square"></i></span>
    <span><i class="fa-regular fa-trash-can removeTodo"></i></span>`
    tododiv.innerHTML = newTodo;


    todoList.appendChild(tododiv);
    todoInput.value = "";

}
todoList.addEventListener("click", checkRemove)

function checkRemove(e) {
    const classlist = [...e.target.classList];
    console.log(classlist)
    const item = e.target.parentElement.parentElement;
    if (classlist[1] === "fa-trash-can") {
        item.remove()
    } else if (classlist[1] === "fa-square-check") {
        item.classList.toggle("complete")
    }
}

function filterTodo(e) {
    const todos = [...todoList.childNodes]

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