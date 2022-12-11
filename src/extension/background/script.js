/**
 * @module
 */

browser.webRequest.onHeadersReceived.addListener(async (details) => {
    const { dashboards } = await browser.storage.sync.get("dashboards");
    if (dashboards.some((d) => details.documentUrl === d.url)) {
        return {
            responseHeaders: [
                ...details.responseHeaders.filter((header) => {
                    return "access-control-allow-origin" !==
                           header.name.toLowerCase();
                }),
                { name: "Access-Control-Allow-Origin",  value: "*" },
            ],
        };
    }
    return {};
}, { urls: ["<all_urls>"] }, ["blocking", "responseHeaders"]);
