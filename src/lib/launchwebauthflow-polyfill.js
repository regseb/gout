"use strict";

// Ajouter une prothèse pour ajouter une promesse à la fonction
// browser.identity.launchWebAuthFlow(), tant que la demande de tirage
// https://github.com/mozilla/webextension-polyfill/pull/39 n'a pas été
// acceptée.

(function () {
    const launchWebAuthFlow = browser.identity.launchWebAuthFlow;
    browser.identity.launchWebAuthFlow = function (details) {
        return new Promise(function (resolve, reject) {
            launchWebAuthFlow(details, function (responseUrl) {
                if ("lastError" in browser.runtime &&
                        null !== browser.runtime.lastError) {
                    reject(browser.runtime.lastError);
                } else {
                    resolve(responseUrl);
                }
            });
        });
    };
})();
