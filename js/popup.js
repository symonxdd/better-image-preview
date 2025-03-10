const backgroundColorPicker = document.getElementById('bgcolor');

document.addEventListener('DOMContentLoaded', restoreOptions);
backgroundColorPicker.addEventListener('input', saveOptions);

function saveOptions() {
  const bgcolorValue = backgroundColorPicker.value;

  chrome.storage.local.set({ bgcolor: bgcolorValue }, () => {
    const status = document.getElementById('bar');
    status.textContent = 'saved';
    setTimeout(() => {
      status.innerHTML = '&nbsp;';
    }, 750);

    backgroundColorPicker.style.backgroundColor = bgcolorValue;
  });

  // Request tabs from the background script
  chrome.runtime.sendMessage({ action: "getTabs" }, (response) => {
    if (!response || !response.tabs) {
      console.error("Error: No response or tabs found!");
      return;
    }

    response.tabs.forEach(tab => {
      if (tab.url) {
        // Now send the message correctly
        chrome.runtime.sendMessage({
          action: "colorInputChanged",
          bgcolor: bgcolorValue
        });
      }
    });
  });
}

function restoreOptions() {
  chrome.storage.local.get({ bgcolor: '#2C313A' }, (items) => {
    backgroundColorPicker.value = items.bgcolor;
    backgroundColorPicker.style.backgroundColor = items.bgcolor;
  });
}