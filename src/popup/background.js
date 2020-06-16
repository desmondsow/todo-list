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

refreshBadge()