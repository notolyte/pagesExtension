'use strict';

chrome.contextMenus.create(
    {
        "title": "Preview in Github Pages",
        "type": "normal",
        "contexts": ["link"],
        "documentUrlPatterns": ["*://github.com/*"],
        "id": "repository"
    });

chrome.contextMenus.create(
    {
        "title": "Show the source codes",
        "type": "normal",
        "contexts": ["page"],
        "documentUrlPatterns": ["*://*.github.io/*"],
        "id": "pages"
    });


chrome.contextMenus.onClicked.addListener(function (info) {
    switch (info.menuItemId) {
        case "repository":
            chrome.tabs.query({ active: true, lastFocusedWindow: true }, function (tab) {
                var target = info.linkUrl;
                target = target.replace(/https?:\/\/github\.com\/(.+)\/(.+)\/blob\/.+\/(.+)/, "https://$1.github.io/$2/$3");
                chrome.tabs.create({ url: target });
            });
            break;
        case "pages":
            chrome.tabs.query({ active: true, lastFocusedWindow: true }, function (tab) {
                var target = tab[0].url;
                target = target.replace(/https?:\/\/(.+)\.github\.io\/(.+)\/(.*)/, "https://github.com/$1/$2");
                console.log(target);
                chrome.tabs.create({ url: target });
            });
            break;
    }
})