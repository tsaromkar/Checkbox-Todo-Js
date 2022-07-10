let addTodoBtn = document.getElementById("addTodoBtn");
let clearAllBtn = document.getElementById("clearAllBtn");
let inputField = document.getElementById("inputField");
let todosTable = document.getElementById("todosTable");
let todosDoneTable = document.getElementById("todosDoneTable");
var todoList = []
var doneList = []
var count = 1
var doneCount = 1

addTodoBtn.addEventListener('click', function () {
    let todo = inputField.value
    if (checkInputFieldIsEmpty(todo)) {
        alert("Please enter a todo in the input field");
        return;
    }
    createTodoList(todo)
    createTableRowForTodo()
    inputField.value = ""
})

// clearAllBtn.addEventListener('click', function () {
//     const list = sessionStorage.getItem("todoList")
//     if (list !== null) {
//         sessionStorage.clear()
//         location.reload()
//     }
// })

const checkInputFieldIsEmpty = (value) => value === ""

const createTodoList = (todo) => {
    var obj = { id: count++, todo: todo }
    todoList.push(obj)
    //sessionStorage.setItem("todoList", todoList)
    //console.log(sessionStorage.getItem("todoList"))
}

const createTableRowForTodo = () => {
    if (todoList.length === 0) return;
    let item = todoList[todoList.length - 1]
    if (item !== null) {
        createRows(item, todosTable)

        let checkbox = document.getElementById(item.id)
        checkbox.addEventListener('change', (event) => {
            if (event.currentTarget.checked) {
                let isPresent = false
                for (let i = 0; i<doneList.length;i++) {
                    if (doneList[i].id === item.id) {
                        isPresent = true
                        break
                    }
                }

                if (!isPresent) {
                    var obj = { id: item.id, todo: item.todo }
                    doneList.push(obj)
                    createRows(doneList[doneList.length - 1], todosDoneTable)
                }
            }
        })
    }
}

const createRows = (item, table) => {
    // create row
    var tableRow = document.createElement('tr');

    // append checkbox to td
    var checkboxData = document.createElement('td');

    var checkboxInput = document.createElement('input')
    setAttributes(checkboxInput, { "type": "checkbox", "id": item.id });
    checkboxData.appendChild(checkboxInput);

    // get input text value and set it in td
    var todoData = document.createElement('td');
    todoData.innerText = item.todo;

    tableRow.appendChild(checkboxData);
    tableRow.appendChild(todoData);
    table.appendChild(tableRow);
}

function setAttributes(el, attrs) {
    for (var key in attrs) {
        el.setAttribute(key, attrs[key]);
    }
}

inputField.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        addTodoBtn.click();
    }
});

// const onLoad = (() => {
//     const list = sessionStorage.getItem("todoList")
//     if (list !== null) {
//         todoList = list
//         createTableRowForTodo()
//     }
// })()