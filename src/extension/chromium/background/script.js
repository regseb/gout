/**
 * @module
 * @license MIT
 * @author Sébastien Règne
 */

import "../polyfill/browser.js";
import migrate from "./migrate.js";

/**
 * Met à jour la règle de modification des entêtes HTTP.
 *
 * @param {number[]} tabIds Les identifiants des onglets impactés.
 */
const updateRule = async (tabIds) => {
    await browser.declarativeNetRequest.updateSessionRules({
        removeRuleIds: [1],
    });

    if (0 === tabIds.length) {
        return;
    }

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
                            value:
                                "GET, HEAD, POST, PUT, PATCH, DELETE," +
                                " OPTIONS",
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
                // Filtrer sur les onglets, car il n'est pas possible de filtrer
                // sur les URLs des initiateurs.
                // https://issues.chromium.org/40640241
                condition: {
                    tabIds,
                    urlFilter: "|http*",
                    resourceTypes: ["xmlhttprequest"],
                },
                id: 1,
            },
        ],
    });
};

/**
 * Ajoute un onglet dans la liste des onglets impactés.
 *
 * @param {Object} details       Les détails de l'onglet à ajouter.
 * @param {number} details.tabId L'identifiant de l'onglet.
 */
const addWatchedTabs = async ({ tabId }) => {
    // Récupérer les identifiants des onglets déjà impactés par l'extension.
    const rules = await browser.declarativeNetRequest.getSessionRules();
    const tabIds = rules.flatMap((r) => r.condition.tabIds);
    if (!tabIds.includes(tabId)) {
        // Ajouter le nouvel onglet.
        await updateRule([...tabIds, tabId]);
    }
};

/**
 * Supprime un onglet des onglets impactés (si celui-ci est impactés).
 *
 * @param {Object} details              Les détails de l'onglet à enlever.
 * @param {number} details.tabId        L'identifiant de l'onglet.
 * @param {Object} [details.changeInfo] Les éventuelles informations sur les
 *                                      changements de l'onglet.
 */
const removeWatchedTabs = async ({ tabId, changeInfo }) => {
    const config = await browser.storage.sync.get("urls");
    const urls = config.urls ?? [];

    // Si on n'a pas d'informations sur le changement : c'est que l'onglet a été
    // fermé.
    if (!urls.includes(changeInfo?.url)) {
        // Récupérer les identifiants des onglets déjà impactés par l'extension.
        const rules = await browser.declarativeNetRequest.getSessionRules();
        const tabIds = rules.flatMap((r) => r.condition.tabIds);
        if (tabIds.includes(tabId)) {
            await updateRule(tabIds.filter((i) => tabId !== i));
        }
    }
};

/**
 * Mets à jour les URLs surveillées.
 */
const updateWatchedUrls = async () => {
    browser.webNavigation.onBeforeNavigate.removeListener(addWatchedTabs);
    browser.tabs.onUpdated.removeListener(removeWatchedTabs);

    const config = await browser.storage.sync.get("urls");
    const urls = config.urls ?? [];

    // Mettre à jour la liste des onglets impactés avec les onglets déjà
    // ouverts.
    const tabs = await browser.tabs.query({ url: urls });
    await updateRule(tabs.map((t) => t.id));

    if (0 === urls.length) {
        return;
    }

    // Surveiller quand un onglet arrive sur une URL d'un dashboard.
    browser.webNavigation.onBeforeNavigate.addListener(addWatchedTabs, {
        url: urls.map((u) => ({ urlEquals: u })),
    });

    // Surveiller quand un onglet d'un dashboard change d'URL.
    browser.tabs.onUpdated.addListener(removeWatchedTabs, {
        urls,
        properties: ["url"],
    });
};

browser.storage.onChanged.addListener(updateWatchedUrls);
browser.runtime.onInstalled.addListener(migrate);
browser.runtime.onStartup.addListener(updateWatchedUrls);
browser.tabs.onRemoved.addListener(removeWatchedTabs);
