const STORAGE_KEY = "todoList"
let storage = browser.storage.sync || browser.storage.local;
import  moment from 'moment'
// import {pushNotification} from '../background/background.js'

// function xyz() {
//     const nowDate = moment(moment(Date.now()).format("DD-MM-YYYY"), "DD-MM-YYYY")
//     if(JSON.parse(localStorage.getItem('todoList')) !== null)
//     {
//         var itemsl = JSON.parse(localStorage.getItem('todoList')) 
//         var reminderList = itemsl.map((item) => moment(item.dueDate, "DD-MM-YYYY").diff(nowDate, 'days') <= 3 ? item.todoText : 0 )
//         reminderList = reminderList.filter(item => item !== 0)
//         let reminderNotes = reminderList.join();
//         return reminderNotes;
//     }
//     else
//     {
//         return null;
//     }
// }

// export {xyz}


function setup(){
    $('#date').datepicker({
        startDate : new Date(),
        todayBtn: "linked",
        clearBtn: true,
        format: 'dd-mm-yyyy',
    });

    $("body").niceScroll();

    refreshTodoList();
    refreshBadge();

    document.getElementById('add').addEventListener('click', function(event) {
        addToDo();
    });

    document.getElementById("stat_id").addEventListener('click', function(event)
    {
        browser.tabs.create({url : "/stat/stat.html"})
    })

    $(document).on('click', '.delete', function(event){
        let todoListStorage = JSON.parse(localStorage.getItem('todoList'))
        let edittedTodoList = todoListStorage.map((item) => item.id === event.currentTarget.id ? ({ ...item, deleted : true, lastActionDate : moment(Date().now).format('DD-MM-YYYY') }) : item);
        updateObjectList(edittedTodoList)
        });

        $(document).on('click', '.complete', function(event){
        let todoListStorage = JSON.parse(localStorage.getItem('todoList'))
        let edittedTodoList = todoListStorage.map((item) => item.id === event.currentTarget.id ? ({ ...item, completed : true, lastActionDate : moment(Date().now).format('DD-MM-YYYY') }) : item);
        updateObjectList(edittedTodoList)
        });
}

function updateObjectList(todoEditted)
{
    localStorage.setItem('todoList' , JSON.stringify(todoEditted))
    refreshBadge()
    refreshTodoList()
    console.log(todoEditted)

}

function addToDo() {
    const todoText = document.getElementsByTagName('input')[0].value;
    const todoDueDate = document.getElementsByTagName('input')[1].value;

    if(todoText.trim().length > 0){
        // todo = addToStorage({ id: new Date().valueOf(), todoText:todoText, dueDate:todoDueDate, completed: false, deleted : false });
        document.getElementsByTagName('input')[0].value = "";
        document.getElementsByTagName('input')[1].value = "";
        var newTodoItem = [{ 'id': new Date().valueOf().toString(), 'todoText':todoText, 'dueDate':todoDueDate, 'completed': false, 'deleted' : false, 'lastActionDate' : todoDueDate}]
        if(localStorage.getItem('todoList') !== null)
        {
            var existedTodoList = JSON.parse(localStorage.getItem('todoList'))
            existedTodoList.push({ 'id': new Date().valueOf().toString(), 'todoText':todoText, 'dueDate':todoDueDate, 'completed': false, 'deleted' : false, 'lastActionDate' : todoDueDate })
            localStorage.setItem('todoList' , JSON.stringify(existedTodoList))
            // console.log(existedObject)
        }
        else 
        {
            localStorage.setItem('todoList' , JSON.stringify(newTodoItem))
        }
        refreshBadge()
        refreshTodoList()

    }
}

// function addToStorage(todo){
//     getTodoList().then((todoList) => {
//         let todoListTemp = [];
//         todoListTemp = todoList.todoList;
//         todoListTemp.push(todo);
//         saveTodoList(todoListTemp);
//     });
//     return todo
// }

// function getTodoList() {
//     return new Promise((resolve) => {
//         const onSuccess = (storageResults) => {
//             const todoList = Object.assign(
//                 {},
//                 { [STORAGE_KEY]: [] },
//                 storageResults[STORAGE_KEY],
//             );
//             resolve(todoList);
//         };

//         const onError = () => {
//             resolve({ [STORAGE_KEY]: [] });
//         };

//         storage.get(STORAGE_KEY).then(onSuccess, onError);
//     });
// }

// function saveTodoList(todoList) {
//     obj = { [STORAGE_KEY]: todoList };
//     storage.set({ [STORAGE_KEY]: obj }).then((res) => {
//         refreshTodoList()
//         refreshBadge();
//     });
// }

function insertTodo(todo){
    if(todo.deleted === true)
        return;
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
                                <button class="border-0 btn-transition btn ${todo.completed ? 'btn-success' : 'btn-outline-success'} complete" id="${todo.id}"> <i class="fa fa-check"></i></button>
                                <button class="border-0 btn-transition btn btn-outline-danger delete" id="${todo.id}"  ${todo.completed=== true ? 'disabled' : ''}> <i class="fa fa-trash"></i> </button>
                            </div>
                        </div>
                    </div>`;
    document.getElementsByTagName("ul")[0].appendChild(li);
}

function refreshBadge(){
      if(localStorage.getItem('todoList') === null)
            return;
    let todoList = JSON.parse(localStorage.getItem('todoList'))
    const count = todoList.filter((item) => item.completed === false && item.deleted === false).length;
    if (count > 0)
            browser.browserAction.setBadgeText({text: count.toString()});
        else
            browser.browserAction.setBadgeText({text: ''});

    // getTodoList().then(({ todoList }) => {
    //     const count = todoList.filter((todo) => todo.completed === false).length;
    //     if (count > 0)
    //         browser.browserAction.setBadgeText({text: count.toString()});
    //     else
    //         browser.browserAction.setBadgeText({text: ''});
    // });
}

function refreshTodoList() {
        document.getElementsByTagName("ul")[0].innerHTML = "";

        if(localStorage.getItem('todoList') === null)
            return;
    
        let todoList = JSON.parse(localStorage.getItem('todoList'))
        // todoList.map((item) => console.log(typeof item.dueDate))
        todoList.forEach((item) => insertTodo(item));
        


    // getTodoList().then(({ todoList }) => {
    //     document.getElementsByTagName("ul")[0].innerHTML = "";
    //     todoList.forEach((todo, index) => {
    //         insertTodo(todo, index);
    //     });
    // });
}


// Setup

setup();


