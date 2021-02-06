(async () => {
    const dashboards = (await browser.storage.sync.get("dashboards"))
                                                  .dashboards;

    if (!dashboards.some((d) => window.location.href === d.link)) {
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

    let script = document.createElement("script");
    script.type = "module";
    script.src = browser.runtime.getURL("inject/enrich.js");
    document.head.append(script);

    script = document.createElement("script");
    script.type = "module";
    script.src = "https://cdn.jsdelivr.net/gh/regseb/gout@0/src/engine" +
                                                                   "/script.js";
    document.head.append(script);
})();
