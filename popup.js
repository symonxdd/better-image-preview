document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('bgcolor').addEventListener('input', saveOptions);

// Saves prefs to chrome.storage
function saveOptions() {
    let bgcolor = document.getElementById('bgcolor').value;

    chrome.storage.local.set({
        bgcolor: bgcolor
    }, () => {
        // Message on save
        let status = document.getElementById('bar');
        status.textContent = 'saved';
        setTimeout(() => {
            status.innerHTML = '<br>';
        }, 750);
    });

    chrome.tabs.query({ currentWindow: true, active: true }, tabs => {
        const url = tabs[0].url;
        const extensions = ["jpg", "png", "gif", "webp", "svg", "bmp"];

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
    });
}