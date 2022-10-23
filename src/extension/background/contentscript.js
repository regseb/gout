/**
 * @module
 */

let contentScript;

const register = async function (changes) {
    if (undefined === changes.dashboards) {
        return;
    }

    if (undefined !== contentScript) {
        contentScript.unregister();
    }

    const dashboards = changes.dashboards.newValue;
    if (undefined !== dashboards && 0 !== dashboards.length) {
        const matches = dashboards.map((dashboard) => {
            // Garder seulement les parties autorisées dans les modèles de
            // correspondance.
            const url = new URL(dashboard.url);
            return url.protocol + "//" + url.hostname + url.pathname +
                   url.search;
        }).filter((d, i, a) => i === a.indexOf(d));

        contentScript = await browser.contentScripts.register({
            // Charger directement la prothèse car les imports ne fonctionnent
            // pas dans les scripts de contenu. https://crbug.com/783757
            // https://bugzil.la/1451545
            js: [{ file: "/polyfill/lib/browser-polyfill.js" },
                 { file: "/content/script.js" }],
            matches,
        });
    }
};

browser.storage.onChanged.addListener(register);
