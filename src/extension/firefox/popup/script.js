/**
 * @module
 * @license MIT
 * @author Sébastien Règne
 */

import "../polyfill/browser.js";

/**
 * Vérifie si une URL est supporté par l'extension.
 *
 * @param {string} href L'URL à vérifier.
 * @returns {boolean} `true` si l'URL est supporté, sinon `false`.
 */
const check = (href) => {
    try {
        const url = new URL(href);
        return ["https:", "http:", "file:", "data:"].includes(url.protocol);
    } catch {
        // Indiquer que l'URL est invalide.
        return false;
    }
};

/**
 * Ajoute ou enlève une URL de la liste des URLs actives.
 */
const change = async () => {
    const [{ url }] = await browser.tabs.query({
        active: true,
        currentWindow: true,
    });
    const config = await browser.storage.sync.get("urls");
    const urls = new Set(config.urls);

    if (document.querySelector("#ok input").checked) {
        urls.add(url);
    } else {
        urls.delete(url);
    }

    await browser.storage.sync.set({ urls: Array.from(urls) });
    await browser.tabs.reload();
};

/**
 * Ouvre un lien.
 *
 * @param {Event} event L'événement du clic sur le lien.
 */
const open = async (event) => {
    const [{ url }] = await browser.tabs.query({
        active: true,
        currentWindow: true,
    });
    const a = event.target.closest("a");

    if (url !== a.href) {
        await browser.tabs.create({ url: a.href });
    }
    close();
};

// Récupérer l'URL de l'onglet courant.
// Attention avec Chromium ! Quand la popup est ouverte dans un onglet : la
// méthode retourne un élément, mais sans URL.
const [{ url }] = await browser.tabs.query({
    active: true,
    currentWindow: true,
});
if (check(url)) {
    const config = await browser.storage.sync.get("urls");
    const urls = new Set(config.urls);

    document.querySelector("#ok a:has(code)").href = url;
    document.querySelector("#ok code").textContent = url;
    document.querySelector("#ok input").checked = urls.has(url);
    document.querySelector("#ok input").addEventListener("change", change);
    document.querySelector("#ok").classList.add("visible");
} else {
    document.querySelector("#forbidden a:has(code)").href = url;
    document.querySelector("#forbidden code").textContent = url;
    document.querySelector("#forbidden").classList.add("visible");
}

document
    .querySelectorAll("a")
    .forEach((a) => a.addEventListener("click", open));
