# Firefox Context Tab List

![Image showing the tab list](screenshot2.png?raw=true "Firefox Context Tab List")

**This is very much an alpha extension. Javascript isn't really my thing so it's messy and some of the functions are built around Mozillas' examples.**

A few years ago there was a XUL extension to put your open tabs into a list in the context menu. Nothing fancy, just a list of tabs with the ability to switch tabs.

I've never been keen on the quantum style tabs and while you can go the userChrome route of hiding them it would often break after updates and I wanted a more minimal looking browser chrome so here we are.


What works, or seems to:

* List tabs with favicons in a context menu sub menu.
* Switching tabs
* Creating a new tab and have it show up in the list
* Changing the content of an existing tab updates the menu to show the new title and favicon


What doesn't work:

* ~~Closing a tab doesn't remove it from the tab list. I've tried a number of ways (see commented out code in that section) but the only thing that seems to works is reloading the entire extension, so that's what I do for the moment (browser.runtime.reload()).~~ Works using browser.tabs.removeAll. Not ideal but better than before.
* Clicking on a link from google to open in a new tab, the title seems to get stuck on google url title as the page is loading (google.com&fhdsfs...) This doesn't always happen though. Not overly bothered by this for the moment.
* ~~Opening the tab list too early when an tab is being created or updating can lead to it not showing up properly. Reopening the context menu resolves this but is not ideal.~~ Haven't noticed this happening for a while 
* Lists across multiple windows. At the moment I just end up with multiple parent menus
* ~~There currently doesn't seem to be a way to show which tab in the list is active. I did try adding an icon but it blended in with the other site favicons. I could add some space at the front of the title of the active tab to offset it but I'm looking to see if there's a way I can inject some CSS instead.~~ Needs a userChrome tweak:
```menuitem[label*= "^"] {
  font-weight:700 !important; 
  color: #900009 !important;
}
```

