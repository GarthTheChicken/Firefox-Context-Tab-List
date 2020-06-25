getCurrentWindowTabs().then(logTabs, onError);


function getCurrentWindowTabs() {
  return browser.tabs.query({currentWindow: true});
}

function onError(error) {
  console.log('Error: ${error}');
}

//var querying = browser.tabs.query({});

// PARENT MENU
browser.menus.create({
  id: "tablist",
  title: "tab list",
  contexts: ["page"]
});


// CREATE MENU AS TABS CHANGE
function logTabs(tabs) {
  for (var tab of tabs) {

   var aaa = tab.id.toString();
     console.log(tab.id + " logTabs " + tab.title + " tabid to string " + aaa);
     // var count = Object.keys(tabs).length;
     //  for (var i = 1; i <= tabs.length; i++) {
    browser.menus.create({
      parentId: "tablist",
      id: aaa,
      "icons": {
      "16": tab.favIconUrl
    },
      title: tab.title,
      contexts: ["page"]
    });
 // }
    //  browser.menus.create({
    //   parentId: "tablist",
    //   type: "separator",
    //   contexts: ["page"]
    // });
  }
//console.log(count);
}

// UPDATE MENU AS TABS CHANGE
function updateTabs(tabs) {
  for (var tab of tabs) {
    
   var aaa = tab.id.toString();
     console.log(tab.id + " logTabs " + tab.title + " tabid to string " + aaa + " tab active " + tab.active);
     // var count = Object.keys(tabs).length;
     //  for (var i = 1; i <= tabs.length; i++) {
    browser.menus.update(aaa,{
      parentId: "tablist",
      "icons": {
      "16": tab.favIconUrl
    },
      title: tab.title
    });
 // }
    //  browser.menus.create({
    //   parentId: "tablist",
    //   type: "separator",
    //   contexts: ["page"]
    // });
  }
//console.log(count);
}



// CHANGE TAB BASED ON MENU SELECTION
browser.menus.onClicked.addListener((info,tab) => {
	var newTabID = info.menuItemId;
	tab.id = parseInt(newTabID);
  //console.log(Object.getOwnPropertyNames(info) + " switch" + " " + info.menuItemId);
        
          browser.tabs.update(tab.id, {
              active: true
          });
});





function handleCreated(tab) {
  // console.log(tab.id + " Created tab");
  //querying.then(logTabs, onError);
  //browser.tabs = {};
  getCurrentWindowTabs().then(logTabs, onError);
  //logTabs();
//browser.runtime.reload();
}

function handleRemoved(tabId, removeInfo) {
  // console.log("Tab: " + tabId + " is closing");
  // console.log("Window ID: " + removeInfo.windowId);
  // console.log("Window is closing: " + removeInfo.isWindowClosing);  
  // console.log(removeInfo.menuItemId + 'menu id');
  //var parsedTabID = parseInt(tabId);
  // browser.tabs.remove(parsedTabID);	
  //getCurrentWindowTabs().then(logTabs, onError);
// browser.menus.remove(tabId);
// console.log(browser.menus.remove(tabId));
// browser.menus.refresh();
//browser.menus.remove(tabId).then(logTabs, onError);
browser.runtime.reload();
//getCurrentWindowTabs().then(logTabs, onError);
  // logTabs();
  //  var ccc = parseInt(tabId);
  // browser.tabs.remove(ccc);
}

//function handleReplaced(addedTabId, removedTabId) {
  // console.log("New tab: " + addedTabId);
  // console.log("Old tab: " + removedTabId);
  //  getCurrentWindowTabs().then(logTabs, onError);
  // logTabs();
//}

function handleUpdated(tabId, changeInfo, tabInfo) {
  console.log("Updated tab: " + tabId);
  // console.log("Changed attributes: ");
  // console.log(changeInfo);
  console.log("New tab Info: ");
  console.log(tabInfo);
  if(tabInfo.status == "complete"){
  	console.log("loading complete");
  getCurrentWindowTabs().then(updateTabs, onError);
  }else{
  	getCurrentWindowTabs().then(logTabs, onError);
  }
  //browser.runtime.reload();
  
  //browser.menus.update(tabId, {title: tabs.title});
  //getCurrentWindowTabs().then(logTabs, onError);
}





//browser.tabs.onReplaced.addListener(handleReplaced);

browser.tabs.onCreated.addListener(handleCreated);
browser.tabs.onRemoved.addListener(handleRemoved);
browser.tabs.onUpdated.addListener(handleUpdated);













// browser.tabs.onRemoved.addListener(() => {
//   setTimeout(()=>{
//     browser.tabs.query({
//       currentWindow: true
//     }).then(logTabs, onError);
//   }, 300); // Value chosen arbitrarily 
// });

// browser.tabs.onCreated.addListener(() => {
//   browser.tabs.query({
//       currentWindow: true
//     }).then(logTabs, onError);
// });




// browser.menus.onShown.addListener((info) => {
// 	//browser.menus.refresh();
//   //getCurrentWindowTabs().then(logTabs, onError);
//   console.log("refresh menu");
// browser.runtime.reload();
//    // Note: Not waiting for returned promise.
// });





// function getCurrentWindowTabs() {
// return  browser.tabs.query({}).then((tabs) => {let length = tabs.length;});

// }

// function updateCount(tabId, isOnRemoved) {
//   browser.tabs.query({}).then((tabs) => {
//     var length = tabs.length;

    // onRemoved fires too early and the count is one too many.
    // see https://bugzilla.mozilla.org/show_bug.cgi?id=1396758
    // if (isOnRemoved && tabId && tabs.map((t) => { return t.id; }).includes(tabId)) {
    //   length--;
    // }
   

    // browser.browserAction.setBadgeText({text: length.toString()});
    // if (length > 2) {
    //   browser.browserAction.setBadgeBackgroundColor({'color': 'green'});
    // } else {
    //   browser.browserAction.setBadgeBackgroundColor({'color': 'red'});
    // }
  //});
 
//}




// console.log(getCurrentWindowTabs.length);

// getCurrentWindowTabs();







