//var querying = browser.tabs.query({});

browser.menus.create({
  id: "tablist",
  title: "tab list",
  contexts: ["all"]
});

function logTabs(tabs) {
  for (var tab of tabs) {
    // tab.url requires the `tabs` permission
   var aaa = tab.id.toString()
     console.log(tab.id + " logTabs " + tab.title + " tabid to string " + aaa);
    // var count = Object.keys(tab.id).length;
      //for (var i = 1; i <= tabs.length; i++) {

    browser.menus.create({
      parentId: "tablist",
      id: aaa,
      title: tab.title,
      contexts: ["page"]
    });
 // }
    
  }

}


browser.menus.onClicked.addListener((info,tab) => {
	var newTabID = info.menuItemId;
	tab.id = parseInt(newTabID);
  //console.log(Object.getOwnPropertyNames(info) + " switch" + " " + info.menuItemId);
        
          browser.tabs.update(tab.id, {
              active: true
          });
});



function onError(error) {
  console.log('Error: ${error}');
}

function handleCreated(tab) {
  console.log(tab.id);
  //querying.then(logTabs, onError);
  getCurrentWindowTabs().then(logTabs, onError);
  //logTabs();

}

function handleRemoved(tabId, removeInfo) {
  console.log("Tab: " + tabId + " is closing");
  console.log("Window ID: " + removeInfo.windowId);
  console.log("Window is closing: " + removeInfo.isWindowClosing);  
  //console.log(tab.id + 'Removed');
  
  browser.tabs.remove(tabId);	
  getCurrentWindowTabs().then(logTabs, onError);

  // logTabs();
  // var ccc = parseInt(tabId);
  //browser.tabs.remove(ccc);
}

//function handleReplaced(addedTabId, removedTabId) {
  // console.log("New tab: " + addedTabId);
  // console.log("Old tab: " + removedTabId);
  //  getCurrentWindowTabs().then(logTabs, onError);
  // logTabs();
//}

//browser.tabs.onReplaced.addListener(handleReplaced);

//browser.tabs.onCreated.addListener(handleCreated);
//browser.tabs.onRemoved.addListener(handleRemoved);


getCurrentWindowTabs().then(logTabs, onError);


function getCurrentWindowTabs() {
  return browser.tabs.query({currentWindow: true});
}




browser.tabs.onRemoved.addListener(() => {
  setTimeout(()=>{
    browser.tabs.query({
      currentWindow: true
    }).then(logTabs, onError);
  }, 300); // Value chosen arbitrarily 
});

browser.tabs.onCreated.addListener(() => {
  browser.tabs.query({
      currentWindow: true
    }).then(logTabs, onError);
});




// browser.menus.onShown.addListener((info,tab) => {
// 	browser.menus.refresh();
//   getCurrentWindowTabs().then(logTabs, onError);
//   console.log("refresh menu");
//    // Note: Not waiting for returned promise.
// });





// browser.menus.onClicked.addListener((info, tab) => {
//   console.log(tab.id + " switch");
        
//           browser.tabs.update(1, {
//               active: true
//           });
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


// function createTablist() {
// let opentabs = 10;
// 	for (var i = 0; i <= opentabs; i++) {
// 		browser.menus.create({
// 		  id: "tablist"+i,
// 		  parentId: "tablist",
// 		  title: "opentabs",
// 		  contexts: ["all"]
// 		});
// 	}
// }





/*
Called when the item has been created, or when creation failed due to an error.
We'll just log success/failure here.
*/
// function onCreated() {
//   if (browser.runtime.lastError) {
//     console.log('Error: ${browser.runtime.lastError}');
//   } else {
//     console.log("Item created successfully");
//   }
// }

/*
Called when the item has been removed.
We'll just log success here.
*/
// function onRemoved() {
//   console.log("Item removed successfully");
// }

/*
Called when there was an error.
We'll just log the error here.browser.menus.create({
//   id: "separator-1",
//   type: "separator",
//   contexts: ["all"]
// }, onCreated);
*/
// function onError(error) {
//   console.log('Error: ${error}');
// }

/*
Create all the context menu items.
*/
// browser.menus.create({
//   id: "log-selection",
//   title: browser.i18n.getMessage("menuItemSelectionLogger"),
//   contexts: ["selection"]
// }, onCreated);



// browser.menus.create({
//   id: "tab-list",
//   parentId: "tablist",
//   title: "tab-list",
//   contexts: ["all"]
// }, onCreated);

// browser.menus.create({
//   id: "separator-1",
//   type: "separator",
//   contexts: ["all"]
// }, onCreated);

// browser.menus.create({
//   id: "remove-me",
//   title: browser.i18n.getMessage("menuItemRemoveMe"),
//   contexts: ["all"]
// }, onCreated);

// browser.menus.create({
//   id: "separator-1",
//   type: "separator",
//   contexts: ["all"]
// }, onCreated);

// browser.menus.create({
//   id: "greenify",
//   type: "radio",
//   title: browser.i18n.getMessage("menuItemGreenify"),
//   contexts: ["all"],
//   checked: true,
//   icons: {
//     "16": "icons/paint-green-16.png",
//     "32": "icons/paint-green-32.png"
//   }
// }, onCreated);

// browser.menus.create({
//   id: "bluify",
//   type: "radio",
//   title: browser.i18n.getMessage("menuItemBluify"),
//   contexts: ["all"],
//   checked: false,
//   icons: {
//     "16": "icons/paint-blue-16.png",
//     "32": "icons/paint-blue-32.png"
//   }
// }, onCreated);

// browser.menus.create({
//   id: "separator-2",
//   type: "separator",
//   contexts: ["all"]
// }, onCreated);

// var checkedState = true;

// browser.menus.create({
//   id: "check-uncheck",
//   type: "checkbox",
//   title: browser.i18n.getMessage("menuItemUncheckMe"),
//   contexts: ["all"],
//   checked: checkedState
// }, onCreated);

// browser.menus.create({
//   id: "open-sidebar",
//   title: browser.i18n.getMessage("menuItemOpenSidebar"),
//   contexts: ["all"],
//   command: "_execute_sidebar_action"
// }, onCreated);

// browser.menus.create({
//   id: "tools-menu",
//   title: browser.i18n.getMessage("menuItemToolsMenu"),
//   contexts: ["tools_menu"],
// }, onCreated);

/*
Set a colored border on the document in the given tab.

Note that this only work on normal web pages, not special pages
like about:debugging.
*/
// var blue = 'document.body.style.border = "5px solid blue"';
// var green = 'document.body.style.border = "5px solid green"';

// function borderify(tabId, color) {
//   browser.tabs.executeScript(tabId, {
//     code: color
//   });
// }

/*
Toggle checkedState, and update the menu item's title
appropriately.

Note that we should not have to maintain checkedState independently like
this, but have to because Firefox does not currently pass the "checked"
property into the event listener.
*/
// function updateCheckUncheck() {
//   checkedState = !checkedState;
//   if (checkedState) {
//     browser.menus.update("check-uncheck", {
//       title: browser.i18n.getMessage("menuItemUncheckMe"),
//     });
//   } else {
//     browser.menus.update("check-uncheck", {
//       title: browser.i18n.getMessage("menuItemCheckMe"),
//     });
//   }
// }
//createTablist();

/*
The click event listener, where we perform the appropriate action given the
ID of the menu item that was clicked.
*/
// browser.menus.onClicked.addListener((info, tab) => {
//   switch (info.menuItemId) {
//     case "tablist":
//     a = getCurrentWindowTabs()
//       console.log("Item " + info.menuItemId + " clicked " + "in tab " + tab.id + " count " + browser.tabs.query({}).then((tabs) => {let length = tabs.length;}));
//       getCurrentWindowTabs();
//       createTablist();
//       break;    
//     case "log-selection":
//       console.log(info.selectionText);
//       listTabs()
//       break;
//     case "remove-me":
//       var removing = browser.menus.remove(info.menuItemId);
//       removing.then(onRemoved, onError);
//       break;
//     case "bluify":
//       borderify(tab.id, blue);
//       break;
//     case "greenify":
//       borderify(tab.id, green);
//       break;
//     case "check-uncheck":
//       updateCheckUncheck();
//       break;
//     case "open-sidebar":
//       console.log("Opening my sidebar");
//       break;
//     case "tools-menu":
//       console.log("Clicked the tools menu item");
//       break;
//   }
// });
