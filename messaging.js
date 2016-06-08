(function createServicesList() {
    //Create a port with background page for continous message communication
    var port = chrome.extension.connect({
        name: "Sample Communication" //Given a Name
    });

    // Listen to messages from the background page
    port.onMessage.addListener(function (message) {
      document.querySelector('#insertelementlist').innerHTML = document.querySelector('#insertelementlist').innerHTML
                                                            +"<br><br><li style='display: inline; padding-right: 5px;'>"
                                                            +message.name
                                                            +"</li><button class='button-show-content' style=\"float:right;margin-right:2%\"data-content='"
                                                            +message.content+"'>Get Info!</button>";
    });

}());

// This sends an object to the background page 
// where it can be relayed to the inspected page
function sendObjectToInspectedPage(message) {
    message.tabId = chrome.devtools.inspectedWindow.tabId;
    chrome.extension.sendMessage(message);
}