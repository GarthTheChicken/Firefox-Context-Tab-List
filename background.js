// INIT
listTabs();

function getCurrentWindowTabs() {
  return browser.tabs.query({currentWindow: true});
}

// ADD TAB COUNTER TO TITLEBAR
function tabCountInWindowTitle(tabtotal){
  	let tabPrefix = " <[" + Object.keys(tabtotal).length.toString() + "]> ";
  	let tabWindowID =  browser.windows.WINDOW_ID_CURRENT;
  	return browser.windows.update(tabWindowID,{titlePreface:tabPrefix});	
}

// CREATE MENU
function listTabs() {
  getCurrentWindowTabs().then((tabs) => {
  console.log("length of tabs is " + Object.keys(tabs).length);
	tabCountInWindowTitle(tabs);
  //if(Object.keys(tabs).length > "1"){
    for (let tab of tabs) {
    var tabIdtoString = tab.id.toString();

    if (tab.favIconUrl !=undefined){
        var favIconUrltoString = tab.favIconUrl.toString(); 
        //console.log(favIconUrltoString + " favIconUrltoString")   
     }else{
        var favIconUrltoString = "logos/clearfavicon.png";
      //console.log(favIconUrltoString + " favIconUrltoString") 
     }
     tab.title = "&" + tab.title;
     if(tab.active){tab.title =tab.title +  " ~#~"; console.log("tab active " + tab.id);}
     console.log(tab.id + " logTabs " + tab.title + " tabid to string " + tabIdtoString + " active tab " + tab.active);

    browser.menus.create({
        id: tabIdtoString,
        "icons": {
        "16": favIconUrltoString
        },
        title: tab.title,
        contexts: ["page", "frame", "selection", "image", "tools_menu", "link"]
        });
      } 
    //}
  });
}



// UPDATE MENU ON TAB CHANGE
function updateTabs() {
  getCurrentWindowTabs().then((tabs) => {
  tabCountInWindowTitle(tabs);
  for (let tab of tabs) {
  var tabIdtoString = tab.id.toString();

  if (tab.favIconUrl !=undefined){
      var favIconUrltoString = tab.favIconUrl.toString(); 
      //console.log(favIconUrltoString + " favIconUrltoString")   
  }else{
      var favIconUrltoString = "logos/clearfavicon.png";
    //console.log(favIconUrltoString + " favIconUrltoString") 
  }
  tab.title = "&" + tab.title;
  if(tab.active){tab.title =tab.title +  " ~#~"; console.log("tab active " + tab.id);}

  browser.menus.update(tabIdtoString,{
      "icons": {
      "16": favIconUrltoString
      },
      title: tab.title
      });
    }
  });
}


// UPDATE MENU ON TAB REMOVAL
function removeTabs(tabId) {
   getCurrentWindowTabs().then((tabs) => {
    // REMOVE THE DELETED TAB FROM THE TABS OBJECT. getCurrentWindowTabs KEEPS PICKING IT UP FOR SOME REASON
    // https://gist.github.com/scottopolis/6e35cf0d53bae81e6161662e6374da04
    // var removeIndex = tabs.map(function(item) { return item.id; }).indexOf(tabId);
    // tabs.splice(removeIndex, 1);

    // CANT REMOVE THE MENU ENTRY DESPITE USING ABOVE HACK ON tabs OBJECT SO WE NUKE THE MENU AND RECREATE IT.
    // OVERKILL (DON'T SWEAT IT, GET IT BACK TO YOU) BUT BETTER THAN RELOADING THE WHOLE EXTENSTION
    //AS BEFORE
    browser.menus.removeAll();
    tabCountInWindowTitle(tabs);  
  for (let tab of tabs) {
  var tabIdtoString = tab.id.toString();

  if (tab.favIconUrl !=undefined){
      var favIconUrltoString = tab.favIconUrl.toString();    
  }else{
      var favIconUrltoString = "logos/clearfavicon.png"; 
   }
  tab.title = "&" + tab.title;
  if(tab.active){tab.title =tab.title +  " ~#~"; console.log("tab active " + tab.id);}  
  //console.log(tab.id + " logTabs " + tab.title + " tabid to string " + tabIdtoString);
  //console.log("removed tab id " + tabId);

  browser.menus.create({
      id: tabIdtoString,
      "icons": {
      "16": favIconUrltoString
      },
      title: tab.title,
      contexts: ["page", "frame", "selection", "image", "tools_menu", "link"]
      });
    }
  });  
}




// CHANGE TO TAB BASED ON MENU SELECTION
browser.menus.onClicked.addListener((info,tab) => {
  //var newTabID = info.menuItemId;
  tab.id = parseInt(info.menuItemId);
  //left = 0
 //middle = 1
 // right = 2
  //console.log(Object.getOwnPropertyNames(info) + " switch" + " " + info.menuItemId);
  //console.log(" modifiers - " + info.modifiers);
  // USE ONLY LEFT CLICK FOR TAB SELECTION - WORKING ON MIDDLE CLICK FOR DELETE TAB
   //if (info.button == "0"){     
    browser.tabs.update(tab.id, {
      active: true
    });
   //} 
   //REMOVE TAB WITH MIDDLE CLICK
   if (info.button == "1" || info.modifiers =="Ctrl"){
  	  browser.tabs.remove(tab.id).then(listTabs);
  	  console.log("middle button success");
   }
	//DETACH TAB WITH RIGHT CLICK
   if (info.button == "2"){
  	  	browser.windows.create({
    		tabId: tab.id
  	  	});
  	  //console.log("middle button success");
   }
});






function handleCreated(tab) {
  // console.log(tab.id + " Created tab");
  browser.menus.removeAll();
  listTabs();
}

function handleRemoved(tabId, removeInfo) {
  //browser.tabs.remove(tabId);
  console.log("Tab: " + tabId + " is closing");
  console.log("Window ID: " + removeInfo.windowId);
  console.log("Window is closing: " + removeInfo.isWindowClosing);  
  //console.log(removeInfo.menuItemId + 'menu id');
  //var parsedTabID = parseInt(tabId);
 //browser.menus.remove(tabId).then(onError);
  //setTimeout(()=>{browser.menus.remove(parsedTabID).then(listTabs());}, 1000);
  //listTabs();
  //browser.runtime.reload();
  removeTabs(tabId);

}

function handleUpdated(tabId, changeInfo, tabInfo) {
  console.log("Updated tab: " + tabId);
  // console.log("Changed attributes: ");
  // console.log(changeInfo);
  // console.log("New tab Info: ");
  // console.log(tabInfo);
  if(tabInfo.status == "complete"){
    console.log("loading complete");
    updateTabs();
  }


}



browser.tabs.onCreated.addListener(handleCreated);
browser.tabs.onRemoved.addListener(handleRemoved);
browser.tabs.onUpdated.addListener(handleUpdated);
browser.windows.onFocusChanged.addListener(handleCreated);
browser.menus.onShown.addListener(handleUpdated);
// browser.menus.onShown.addListener(test);

// function test(){
// browser.commands.onCommand.addListener(function (command) {
//   if (command === "delete-tab") {
//     console.log("keyboard delete command!");
//   }
// });
// }

// REMOVE TAB WITH MIDDLE CLICK
// browser.menus.onClicked.addListener((info,tab) => {
// //left = 0
// //middle = 1
// // right = 2
//   console.log("mousebutton " + " " + info.button + " remove tab id is " + tab.id);
// if (info.button == "1"){
//   browser.tabs.remove(tab.id).then(removeTabs);
//   console.log("middle button success");
// }

// });
//var dict = {key:"Backspace"};
//keyboardEvent = new KeyboardEvent("Backspace", dict);
// browser.menus.addEventListener('keydown', (e) => {
//   if (!e.repeat)
//     console.log('Key "${e.key}" pressed  [event: keydown]');

// });
//if(keyboardEvent.key == "Backspace"){console.log("keyboardEvent Success " + keyboardEvent.key)};