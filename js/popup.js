document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('bgcolor').addEventListener('input', saveOptions);

// Save prefs to chrome.storage
function saveOptions() {
    let bgcolor = document.getElementById('bgcolor').value;

    chrome.storage.local.set({
        bgcolor: bgcolor
    }, () => {
        // Message on save
        let status = document.getElementById('bar');
        status.textContent = 'saved';
        setTimeout(() => {
            status.innerHTML = '&nbsp;';
        }, 750);

        document.getElementById('bgcolor').style.backgroundColor = bgcolor;
    });

    // live update (user must be viewing image, else page refresh needed)
    chrome.tabs.query({ currentWindow: true, active: true }, tabs => {
        const url = tabs[0].url;
        const extensions = ["jpg", "jpeg", "png", "gif", "webp", "svg", "bmp"];

        const isImage = extensions.some(extension => url.includes(extension));
        if (isImage) {
            const activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, { action: 'colorInputChanged', bgcolor: bgcolor });
        }
    });
}

// Load prefs from chrome.storage
function restoreOptions() {
    // Use default values
    chrome.storage.local.get({
        bgcolor: '#2C313A',
    }, items => {
        document.getElementById('bgcolor').value = items.bgcolor;
        document.getElementById('bgcolor').style.backgroundColor = items.bgcolor;
    });
}