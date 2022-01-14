const backgroundColorPicker = document.getElementById('bgcolor');

document.addEventListener('DOMContentLoaded', restoreOptions);
backgroundColorPicker.addEventListener('input', saveOptions);

// Save prefs to chrome.storage
function saveOptions() {
    const bgcolorValue = backgroundColorPicker.value;

    chrome.storage.local.set({
        bgcolor: bgcolorValue
    }, () => {
        // Message on save
        const status = document.getElementById('bar');
        status.textContent = 'saved';
        setTimeout(() => {
            status.innerHTML = '&nbsp;';
        }, 750);

        backgroundColorPicker.style.backgroundColor = bgcolorValue;
    });

    // Live updates on opened tabs
    chrome.tabs.query({ currentWindow: true }, tabs => {
        console.log("gg");
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
        backgroundColorPicker.value = items.bgcolor;
        backgroundColorPicker.style.backgroundColor = items.bgcolor;
    });
}