document.addEventListener('DOMContentLoaded', function () {
    var playMusicButton = document.getElementById("playMusic");
    playMusicButton.addEventListener('click', function () {
        playMusic();
    });

    getYoutubeTabs();
});

function playMusic() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {event: 'playMusic'}, dummyCallback);
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

function getYoutubeTabsCallback(response) {
    if(response) {
        console.log('Youtube tab found:\n' + JSON.stringify(response));

        var rootElement = document.getElementsByClassName("content")[0];
        var listItem = document.createElement("div");
        var title = document.createElement("h3");
        var titleText = document.createTextNode(response.title);

        title.appendChild(titleText);
        listItem.setAttribute("class", "list-item");
        listItem.appendChild(title);
        rootElement.appendChild(listItem);
    }
}