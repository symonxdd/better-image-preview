chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getTabs") {
    chrome.tabs.query({ currentWindow: true }, (tabs) => {
      sendResponse({ tabs }); // Ensure response is sent back to popup.js
    });
    return true; // Keeps the message channel open for async response
  }

  if (message.action === "colorInputChanged") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length === 0) return;
      chrome.tabs.sendMessage(tabs[0].id, { action: "colorInputChanged", bgcolor: message.bgcolor });
    });
  }
});
