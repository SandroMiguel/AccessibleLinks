chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.getSelected(null, function(tab) {
		chrome.tabs.sendMessage(tab.id, "");
	});
});

chrome.commands.onCommand.addListener(function(command) {
	console.log('Command:', command);
});


// local storage
chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
  if (request.method == "getLocalStorage")
    sendResponse({data: localStorage[request.key]});
  else
    sendResponse({});
});

// ###

function speak() {
	chrome.tts.speak('Hello, world.');
}
