/**
 * @module
 */

const check = function (href) {
    try {
        const url = new URL(href);
        return ["http:", "https:", "data:", "file:"].includes(url.protocol);
    } catch {
        // Indiquer que l'URL est invalide.
        return false;
    }
};

const copy = async function (event) {
    const li = event.target.closest("li");
    const url = li.querySelector("span").title;

    await navigator.clipboard.writeText(url);
};

const remove = async function (event) {
    const li = event.target.closest("li");
    const url = li.querySelector("span").title;

    const { dashboards } = await browser.storage.sync.get("dashboards");
    dashboards.splice(dashboards.findIndex((d) => url === d.url), 1);
    await browser.storage.sync.set({ dashboards });

    li.remove();
    const button = document.querySelector("#set");
    if (url === button.dataset.url) {
        button.textContent = "Ajouter";
    }
};

const create = function (dashboard, active) {
    const template = document.querySelector("template");
    const clone = document.importNode(template.content, true);

    clone.querySelector("span").textContent = dashboard.title;
    clone.querySelector("span").title = dashboard.url;
    if (active) {
        clone.querySelector("span").classList.add("active");
    }
    clone.querySelector("span").addEventListener("dblclick", copy);
    clone.querySelector("button").addEventListener("click", remove);

    return clone;
};

const set = async function () {
    const button = document.querySelector("#set");
    const dashboard = {
        title: button.dataset.title,
        url:   button.dataset.url,
    };

    const { dashboards } = await browser.storage.sync.get("dashboards");
    const index = dashboards.findIndex((d) => dashboard.url === d.url);
    if (-1 === index) {
        dashboards.push(dashboard);
        document.querySelector("ul").append(create(dashboard, true));
    } else {
        dashboards[index] = dashboard;
        document.querySelector(`ul li:nth-child(${index}) span`).textContent =
                                                                dashboard.title;
    }
    await browser.storage.sync.set({ dashboards });

    button.textContent = "Mettre à jour";
};

const init = async function () {
    const { dashboards } = await browser.storage.sync.get("dashboards");
    // Récupérer le titre et l'URL de l'onglet courant.
    // Attention avec Chromium ! Quand la popup est ouverte dans un onglet : la
    // méthode retourne un élément, mais sans titre, ni URL.
    const [{ title, url }] = await browser.tabs.query({
        active:        true,
        currentWindow: true,
    });

    const button = document.querySelector("#set");
    if (check(url)) {
        if (dashboards.some((d) => url === d.url)) {
            button.textContent = "Mettre à jour";
        }

        button.dataset.title = title;
        button.dataset.url = url;
        button.addEventListener("click", set);
        button.disabled = false;
    } else {
        button.textContent = "(Impossible pour cette page)";
    }

    const ul = document.querySelector("ul");
    for (const dashboard of dashboards) {
        ul.append(create(dashboard, url === dashboard.url));
    }
};

// Ne pas ajouter d'await car addons-linter échoue à analyser les fichiers sans
// import / export et avec un await dans le scope global.
// https://github.com/mozilla/addons-linter/issues/4020
// eslint-disable-next-line unicorn/prefer-top-level-await
init();
