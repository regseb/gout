/**
 * @module
 * @license MIT
 * @author Sébastien Règne
 */

import "../polyfill/browser.js";
import migrate from "./migrate.js";

const replace = (headers, replacements) => {
    const names = new Set(replacements.map((r) => r.name.toLowerCase()));
    return [
        ...headers.filter((h) => !names.has(h.name.toLowerCase())),
        ...replacements,
    ];
};

browser.webRequest.onBeforeSendHeaders.addListener(
    async (details) => {
        const { dashboards } = await browser.storage.sync.get("dashboards");
        if (dashboards.some((d) => details.documentUrl === d.url)) {
            return {
                requestHeaders: replace(details.requestHeaders, [
                    { name: "Sec-Fetch-Mode", value: "navigate" },
                ]),
            };
        }
        return {};
    },
    { urls: ["<all_urls>"] },
    ["blocking", "requestHeaders"],
);

browser.webRequest.onHeadersReceived.addListener(
    async (details) => {
        const { dashboards } = await browser.storage.sync.get("dashboards");
        if (dashboards.some((d) => details.documentUrl === d.url)) {
            return {
                responseHeaders: replace(details.responseHeaders, [
                    { name: "Access-Control-Allow-Origin", value: "*" },
                ]),
            };
        }
        return {};
    },
    { urls: ["<all_urls>"] },
    ["blocking", "responseHeaders"],
);

browser.runtime.onInstalled.addListener(async () => {
    await migrate();
});
