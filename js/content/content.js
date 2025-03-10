const body = document.getElementsByTagName('body')[0];

chrome.storage.local.get({
  bgcolor: '#2C313A',
}, items => {
  if (document.contentType.startsWith("image/")) {
    document.body.style.backgroundColor = items.bgcolor;
  }
});

chrome.runtime.onMessage.addListener(function (request) {
  if (request.action === "colorInputChanged" && document.contentType.includes("image")) {
    document.body.style.backgroundColor = request.bgcolor;
  }
});

console.log(document.contentType);