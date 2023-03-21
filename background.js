console.log('background')
const clickSound = new Audio(chrome.runtime.getURL("./sound.mp3"))

chrome.browserAction.onClicked.addListener(show)

let msg = {
    on: true
}

function show(tab) {
    
    msg.on = !msg.on

    chrome.tabs.sendMessage(tab.id, msg)
    clickSound.play() 
}



chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
  if(msg.icon1) {
     chrome.tabs.query({active:true, windowType:"normal", currentWindow: true},function(d){
        var tabId = d[0].id;
        chrome.browserAction.setIcon({path: './off.png', tabId: tabId});
    })
  }
})


