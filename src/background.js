// Ouvrir un onglet avec Gout quand l'utilisateur clique sur le bouton de
// l'extension.
browser.browserAction.onClicked.addListener(function () {
    "use strict";

    browser.tabs.create({
        "index":  0,
        "url":    browser.extension.getURL("index.html"),
        "pinned": true
    });
});
