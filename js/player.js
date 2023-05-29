document.addEventListener('DOMContentLoaded', function () {
    var playVideoButton = document.getElementById("playVideo");
    playVideoButton.addEventListener('click', function () {
        playVideo();
    });

    getYoutubeTabs();
});

function playVideo() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {event: 'playVideo'}, dummyCallback);
    });
}

function getVideoStatus() {
    chrome.tabs.query({}, function(tabs) {
        tabs.forEach(tab => {
            chrome.tabs.sendMessage(tab.id, {event: 'getVideoStatus'}, getVideoStatusCallback);
        });
    });
}

function getYoutubeTabs() {
    chrome.tabs.query({}, function(tabs) {
        tabs.forEach(tab => {
            chrome.tabs.sendMessage(tab.id, {event: 'getYoutubeTabs'}, getYoutubeTabsCallback);
        });
    });
}

function getYoutubeTabs() {
    chrome.tabs.query({}, function(tabs) {
        tabs.forEach(tab => {
            chrome.tabs.sendMessage(tab.id, {event: 'getYoutubeTabs'}, getYoutubeTabsCallback);
        });
    });
}


function dummyCallback() {
    console.log('Dummy :)');
}

let tabs = [];

function getYoutubeTabsCallback(response) {
    if(response) {
        console.log('Youtube tab found:\n' + JSON.stringify(response));
        tabs.push(response);

        var rootElement = document.getElementsByClassName("content")[0];
        var listItem = document.createElement("div");
        var title = document.createElement("h3");
        var titleText = document.createTextNode(response.title);

        title.appendChild(titleText);
        listItem.setAttribute("class", "list-item");
        listItem.appendChild(title);
        rootElement.appendChild(listItem);
        listItem.id = response.url;

        listItem.addEventListener('click', function () {
            getVideoStatus();
        });
    }
}

function getVideoStatusCallback(response) {
    console.log(response);
}
