const STORAGE_KEY = "todoList"

let storage = browser.storage.sync || browser.storage.local;

function setup(){
    $('#date').datepicker({
        todayBtn: "linked",
        clearBtn: true,
        format: 'dd/mm/yyyy',
    });

    $("body").niceScroll();

    refreshTodoList();
    refreshBadge();

    document.getElementById('add').addEventListener('click', function(event) {
        addToDo();
    });
}

function addToDo() {
    const todoText = document.getElementsByTagName('input')[0].value;
    const todoDueDate = document.getElementsByTagName('input')[1].value;

    if(todoText.trim().length > 0){
        todo = addToStorage({ todoText:todoText, dueDate:todoDueDate, completed: false });
        document.getElementsByTagName('input')[0].value = "";
        document.getElementsByTagName('input')[1].value = "";
    }
}

function addToStorage(todo){
    getTodoList().then((todoList) => {
        let todoListTemp = [];
        todoListTemp = todoList.todoList;
        todoListTemp.push(todo);
        saveTodoList(todoListTemp);
    });
    return todo
}

function getTodoList() {
    return new Promise((resolve) => {
        const onSuccess = (storageResults) => {
            const todoList = Object.assign(
                {},
                { [STORAGE_KEY]: [] },
                storageResults[STORAGE_KEY],
            );
            resolve(todoList);
        };

        const onError = () => {
            resolve({ [STORAGE_KEY]: [] });
        };

        storage.get(STORAGE_KEY).then(onSuccess, onError);
    });
}

function saveTodoList(todoList) {
    obj = { [STORAGE_KEY]: todoList };
    storage.set({ [STORAGE_KEY]: obj }).then((res) => {
        refreshTodoList()
        refreshBadge();
    });
}

function insertTodo(todo){
    var li = document.createElement("li");

    li.innerHTML = `<div class="todo-item p-0">
                        <div class="todo-item-wrapper">
                            <div class="todo-item-left">
                                <div>${todo.todoText}</div>
                                <div class="todo-item-due">
                                    <span>Due: ${todo.dueDate}</span>
                                    <div class="badge ${todo.completed ? 'badge-success' : 'badge-danger'} ml-2">${todo.completed ? 'Completed' : 'To be completed'}</div>
                                </div>
                            </div>
                            <div class="todo-item-right">
                                <button class="border-0 btn-transition btn ${todo.completed ? 'btn-success' : 'btn-outline-success'}"> <i class="fa fa-check"></i></button>
                                <button class="border-0 btn-transition btn btn-outline-danger"> <i class="fa fa-trash"></i> </button>
                            </div>
                        </div>
                    </div>`;

    document.getElementsByTagName("ul")[0].appendChild(li);
}

function refreshBadge(){
    getTodoList().then(({ todoList }) => {
        const count = todoList.filter((todo) => todo.completed === false).length;
        if (count > 0)
            browser.browserAction.setBadgeText({text: count.toString()});
        else
            browser.browserAction.setBadgeText({text: ''});
    });
}

function refreshTodoList() {
    getTodoList().then(({ todoList }) => {
        document.getElementsByTagName("ul")[0].innerHTML = "";
        todoList.forEach((todo) => {
            insertTodo(todo);
        });
    });
}


// Setup

setup();


