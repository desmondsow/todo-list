import {xyz} from './b.js'

function refreshBadge(){
      if(localStorage.getItem('todoList') === null)
            return;
    let todoList = JSON.parse(localStorage.getItem('todoList'))
    const count = todoList.filter((item) => item.completed === false && item.deleted === false).length;
    if (count > 0)
            browser.browserAction.setBadgeText({text: count.toString()});
        else
            browser.browserAction.setBadgeText({text: ''});

}
function pushNotification()
{
        const remindlist = xyz()
        let shouldNotify = remindlist === null || remindlist === '' ? false: true
        console.log(shouldNotify)
        if(shouldNotify)
        {
            browser.notifications.create({
                "type": "basic",
                "title" : "Due date of Today's Todo items",
                "message": `These todo items; ${xyz()},  will be expired within upcoming few  days.`
                ,"iconUrl" : "/assets/icons/icon_64px.png"
            })
        }
}

refreshBadge()
pushNotification()
setInterval(() => {
   pushNotification()
 
}, 3600000); // notify hourly
