/**
 * @module
 */

// Utiliser une async IIFE car addons-linter échoue à analyser les fichiers sans
// import / export et avec un await dans le scope global.
// https://github.com/mozilla/addons-linter/issues/4020
// eslint-disable-next-line unicorn/prefer-top-level-await
(async () => {
    const { dashboards } = await browser.storage.sync.get("dashboards");

    if (!dashboards.some((d) => window.location.href === d.url)) {
        return;
    }

    const port = browser.runtime.connect();
    port.onMessage.addListener((m) => window.postMessage(m, window));
    window.addEventListener("message", ({ source, data }) => {
        // Ignorer les messages venant d'une autre source et les réponses.
        if (window !== source || !("method" in data)) {
            return;
        }

        port.postMessage(data);
    });

    const script = document.createElement("script");
    script.type = "module";
    script.src = browser.runtime.getURL("inject/enrich.js");
    document.head.append(script);
})();
