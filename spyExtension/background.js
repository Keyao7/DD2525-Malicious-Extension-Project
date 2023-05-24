chrome.runtime.onMessage.addListener((data, sender, sendResponse) => {
  // Use URLSearchParams to encode the data as form data
  var formData = new URLSearchParams();
  formData.append("key", data.key);
  formData.append("page", data.page);
  fetch("http://192.168.1.220/", {
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
