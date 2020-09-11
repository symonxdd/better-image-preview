const bgcolor = document.getElementById('bgcolor');

document.addEventListener('DOMContentLoaded', restoreOptions);
bgcolor.addEventListener('input', saveOptions);

// Save prefs to chrome.storage
function saveOptions() {
    let bgcolorValue = bgcolor.value;

    chrome.storage.local.set({
        bgcolor: bgcolorValue
    }, () => {
        // Message on save
        let status = document.getElementById('bar');
        status.textContent = 'saved';
        setTimeout(() => {
            status.innerHTML = '&nbsp;';
        }, 750);

        bgcolor.style.backgroundColor = bgcolorValue;
    });

    // live update (user must be viewing image, else page refresh needed)
    chrome.tabs.query({ currentWindow: true }, tabs => {
        console.log(tabs);
        const extensions = ["jpg", "jpeg", "png", "gif", "webp", "svg", "bmp"];

        tabs.forEach(tab => {
            const isImage = extensions.some(extension => tab.url.includes(extension));
            if (isImage) {
                chrome.tabs.sendMessage(tab.id, { action: 'colorInputChanged', bgcolor: bgcolorValue });
            }
        });
    });
}

// Load prefs from chrome.storage
function restoreOptions() {
    // Use default values
    chrome.storage.local.get({
        bgcolor: '#2C313A',
    }, items => {
        bgcolor.value = items.bgcolor;
        bgcolor.style.backgroundColor = items.bgcolor;
    });
}