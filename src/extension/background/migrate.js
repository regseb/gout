/**
 * @module
 * @license MIT
 * @author Sébastien Règne
 */

// Utiliser un then() car addons-linter échoue à analyser les fichiers sans
// import / export et avec un await dans le scope global.
// https://github.com/mozilla/addons-linter/issues/4020
// eslint-disable-next-line unicorn/prefer-top-level-await
browser.storage.sync.get().then(async (current) => {
    // Vider la configuration pour enlever les éventuelles propriétés obsolètes.
    // Et aussi pour forcer l'appel à l'écouteur browser.storage.onChanged sous
    // Chromium même si la méthode browser.storage.local.set() ne modifie pas la
    // configuration.
    await browser.storage.sync.clear();

    if ("version" in current) {
        await browser.storage.sync.set({
            version: current.version,
            dashboards: current.dashboards,
        });
    } else {
        await browser.storage.sync.set({
            version: 1,
            dashboards: [],
        });
    }
});
