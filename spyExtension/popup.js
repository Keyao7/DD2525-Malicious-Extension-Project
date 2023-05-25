document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('changeColor').addEventListener('click', async function() {
        // first, get the current active tab
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            let tab = tabs[0]; // the active tab

            try {
                chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    function: changeBackgroundColor
                });
            } catch (e) {
                if (e.message.includes("Cannot access a chrome:// URL")) {
                    alert("This extension cannot change the color of Chrome internal pages.");
                } else {
                    alert("An error occurred: " + e.message);
                }
            }
        });
    });
});

function changeBackgroundColor() {
    document.body.style.backgroundColor = '#' + Math.floor(Math.random()*16777215).toString(16);
}
