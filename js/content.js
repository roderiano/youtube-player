chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    var response;
    var urlRegex = /(https:\/\/www\.youtube\.com\/watch\?)/
    
    if (urlRegex.test(location.href)) {
        var player = document.getElementsByTagName("video")[0];

        switch (msg.event) {
            case 'getYoutubeTabs':
                var xpath_title = "//div[@id='header-description']/h3/yt-formatted-string/a[contains(@class, 'yt-simple-endpoint')]";
                response = {
                    "title": document.title
                }
                break;

            case 'playMusic':
                player.play();
                break;

            default:
                break;
        }

        sendResponse(response)
    }
});


