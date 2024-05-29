/**
 * @module
 * @license MIT
 * @author Sébastien Règne
 */

import "../polyfill/browser.js";
import migrate from "./migrate.js";

const handleBeforeNavigate = async (details) => {
    // Récupérer les identifiants des onglets déjà impactés par l'extension.
    const rules = await browser.declarativeNetRequest.getSessionRules();
    const tabIds = [
        ...rules.flatMap((r) => r.condition.tabIds),
        // Ajouter le nouvel onglet.
        details.tabId,
    ];

    // Ajouter la règle de modification des entêtes HTTP pour tous les onglets
    // affichant un dashboard.
    await browser.declarativeNetRequest.updateSessionRules({
        addRules: [
            {
                action: {
                    type: "modifyHeaders",
                    responseHeaders: [
                        {
                            header: "Access-Control-Allow-Methods",
                            value: "GET, HEAD, POST, PUT, PATCH, DELETE, OPTIONS",
                            operation: "set",
                        },
                        {
                            header: "Access-Control-Allow-Credentials",
                            value: "true",
                            operation: "set",
                        },
                        {
                            header: "Access-Control-Expose-Headers",
                            value: "*",
                            operation: "set",
                        },
                        {
                            header: "Access-Control-Allow-Headers",
                            value: "*",
                            operation: "set",
                        },
                        {
                            header: "Access-Control-Allow-Origin",
                            value: "*",
                            operation: "set",
                        },
                    ],
                },
                condition: {
                    tabIds,
                    urlFilter: "|http*",
                    resourceTypes: ["xmlhttprequest"],
                },
                id: 1,
            },
        ],
        removeRuleIds: [1],
    });
};

browser.storage.onChanged.addListener(async () => {
    const { dashboards } = await browser.storage.sync.get("dashboards");
    if (undefined === dashboards) {
        return;
    }

    browser.webNavigation.onBeforeNavigate.removeListener(handleBeforeNavigate);
    browser.webNavigation.onBeforeNavigate.addListener(handleBeforeNavigate, {
        url: dashboards.map((d) => ({ urlEquals: d.url })),
    });
});

browser.runtime.onInstalled.addListener(async () => {
    await migrate();
});
