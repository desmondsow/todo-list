import  moment from 'moment'

function xyz() {
    const nowDate = moment(moment(Date.now()).format("DD-MM-YYYY"), "DD-MM-YYYY")
    if(JSON.parse(localStorage.getItem('todoList')) !== null)
    {
        var itemsl = JSON.parse(localStorage.getItem('todoList')) 
        console.log(itemsl)
        var reminderList = itemsl.map((item) => item.completed || item.deleted  ? 0: moment(item.dueDate, "DD-MM-YYYY").diff(nowDate, 'days') <= 3 ? item.todoText : 0 )
        reminderList = reminderList.filter(item => item !== 0)
        let reminderNotes = reminderList.join();
        return reminderNotes;
    }
    else
    {
        return null;
    }
}
export {xyz};