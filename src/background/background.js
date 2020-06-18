function refreshBadge(){
      if(localStorage.getItem('testObject') === null)
            return;
    let todoList = JSON.parse(localStorage.getItem('testObject'))
    const count = todoList.filter((item) => item.completed === false && item.deleted === false).length;
    if (count > 0)
            browser.browserAction.setBadgeText({text: count.toString()});
        else
            browser.browserAction.setBadgeText({text: ''});
}
function pushNotification()
{
        browser.notifications.create({
            "type": "basic",
            "title" : "Due date of Today's Todo items",
            "message": "Remainder "
            ,"iconUrl" : "/assets/icons/icon_64px.png"
        })
}
refreshBadge()
// setInterval(() => {
//    pushNotification()
 
// }, 3000);
