const body = document.getElementsByTagName('body')[0];

chrome.storage.local.get({
    bgcolor: '#2C313A',
}, items => {
    body.style.background = items.bgcolor;
});

chrome.runtime.onMessage.addListener(function (request) {
    if (request.action == "colorInputChanged") {
        body.style.background = request.bgcolor;
    }
});