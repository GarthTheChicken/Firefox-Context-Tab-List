# Firefox Context Tab List

![Image showing the context menu tab list](contextmenu.jpg?raw=true "Firefox Context Tab List right click menu")

**This is very much an alpha extension. Javascript isn't really my thing so it's messy and some of the functions are built around Mozillas' examples.**

A few years ago there was a XUL extension to put your open tabs into a list in the context menu. Nothing fancy, just a list of tabs with the ability to switch tabs.

I've never been keen on the quantum style tabs and while you can go the userChrome route of hiding them it would often break after updates and I wanted a more minimal looking browser chrome so here we are.

You can either install using the xpi in XPI_Versions or load it as a temporary extension if you're using the Developer Edtion or Nightly(?)

What works, or seems to:

* List tabs with favicons in a context menu sub menu.
* For keyboard users Shift-F10 opens the context menu top left. This is the Firefox default and I don't know how to change it or if it's possible. I also don't appear to be able to control where it appears although it's usually top left of the browser window.
* Also accessable through the tools menu of the browser menu bar. Use Alt-t to open the the toolbar menu and use either mouse or arrow keys to navigate. Access keys will also work in this menu.
![Image showing the tab list via the menubar](menubar.jpg?raw=true "Firefox Context Tab List menu bar")

* Switching tabs with left mouse click or Enter key.
* Close any tab with middle mouse click or Ctrl-Enter.
* Detach tab using right click. Opens in a new window.
* Creating a new tab and have it show up in the list.
* Changing the content of an existing tab updates the menu to show the new title and favicon.
* Active tab highlighting using userChrome tweak below. Works by searching for the ~#~ characters that gets added and styling it.
* Added access keys to the list. A tab in the list can now be selected by typing the first letter. If more than one entry has the same first letter then it will jump between those entries.
* Added context entries so that the extension will show up when right clicking on images, links, frames, text selection.
* Added add on ID allowing userChrome styling.
* Tab count is show in the title bar surrounded by <()> in the hope that it's easier to see at a glance.


What doesn't work:

* ~~Closing a tab doesn't remove it from the tab list. I've tried a number of ways (see commented out code in that section) but the only thing that seems to works is reloading the entire extension, so that's what I do for the moment (browser.runtime.reload()).~~ Works using browser.tabs.removeAll. Not ideal but better than before. See code comments.
* Clicking on a link from google to open in a new tab, the title seems to get stuck on google url title as the page is loading (google.com?url=&fhdsfs...) This doesn't always happen though. Not overly bothered by this for the moment and it does get updated anyway.
* ~~Opening the tab list too early when an tab is being created or updating can lead to it not showing up properly. Reopening the context menu resolves this but is not ideal.~~ Haven't noticed this happening for a while 
* ~~Lists across multiple windows. At the moment I just end up with multiple parent menus~~ Seems to work now. Each window shows only those tabs for that particular window. A master list would be possible but may well get unwieldly.
* ~~There currently doesn't seem to be a way to show which tab in the list is active. I did try adding an icon but it blended in with the other site favicons. I could add some space at the front of the title of the active tab to offset it but I'm looking to see if there's a way I can inject some CSS instead.~~ Needs a userChrome tweak. Adjust as required:
```
menuitem[label*= "~#~"] {
  font-weight:700 !important; 
  color: #900009 !important;
}

menuitem[label*= "~#~"]:hover {
  color: #fff !important;
}

```
Move the menu to the top of the context menu
```
[id*=garththechicken_pfuu_com-menuitem-] {
	-moz-box-ordinal-group: 0 !important; 
	margin-bottom:5px !important;
} 
```

Other userChrome tweaks currently working with 79.0b9:
```
// hide navigation in context menu
#context-navigation{visibility:collapse !important;}
```
```
// hide tab bar and tabs
#TabsToolbar {
     display: none; 
}
```
While the below code works this code from MrOtherGuy works so much smoother. Whoever they are they really know their stuff:
(https://github.com/MrOtherGuy/firefox-csshacks/blob/master/chrome/autohide_toolbox.css)

The code below is what I originally used:

```
// autohide nav bar
#nav-bar {
  min-height: 0px !important;
  max-height: 0px !important;
transition: all 300ms ease 300ms !important; 

}

#nav-bar:-moz-any(:hover, :focus-within) {
  min-height: 38px !important;
  max-height: 38px !important;
    transition: all 300ms ease 300ms !important; 
z-index: 100 !important; 

}
```
