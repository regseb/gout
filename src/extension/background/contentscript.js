let contentScript;

const register = async function () {
    if (undefined !== contentScript) {
        contentScript.unregister();
    }

    const dashboards = (await browser.storage.sync.get("dashboards"))
                                                  .dashboards ?? [];
    if (0 !== dashboards.length) {
        const matches = new Set(dashboards.map((dashboard) => {
            // Garder seulement les parties autorisées dans les modèles de
            // correspondance.
            const url = new URL(dashboard.link);
            return url.protocol + "//" + url.hostname + url.pathname +
                   url.search;
        }));

        contentScript = await browser.contentScripts.register({
            js:      [{ file: "../polyfill/lib/browser-polyfill.js" },
                      { file: "../content/script.js" }],
            matches: Array.from(matches),
            runAt:   "document_end",
        });
    }
};

browser.storage.onChanged.addListener(register);
