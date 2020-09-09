chrome.runtime.onMessage.addListener(function (request) {
    if (request.action == "colorInputChanged") {
        document.querySelector('body').style.background = request.bgcolor;
    }
});

chrome.storage.local.get({
    bgcolor: '#2C313A',
}, items => {
    document.querySelector('body').style.background = items.bgcolor;
});