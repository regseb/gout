/**
 * @module
 */

import Cron from "https://cdn.jsdelivr.net/npm/cronnor@1";

/**
 * Résous un chemin relatif à partir du module.
 *
 * @param {string} specifier Le chemin relatif vers un fichier.
 * @returns {string} L'URL absolue vers le fichier.
 * @see https://github.com/whatwg/html/issues/3871
 */
const resolve = function (specifier) {
    return new URL(specifier, import.meta.url).href;
};

export default class extends HTMLElement {

    #config;

    #scrapers;

    #cron;

    #empty;

    constructor(config, scrapers) {
        super();
        this.#config = config;
        this.#scrapers = scrapers;
    }

    #display(item, empty = false) {
        const iframe = this.shadowRoot.querySelector("iframe");
        if (item.link === iframe.src) {
            iframe.contentWindow.location.reload(true);
        } else {
            iframe.src = item.link;
        }
        if (empty) {
            iframe.classList.add("empty");
        } else {
            iframe.classList.remove("empty");
        }
    }

    async #update() {
        // Si la page est cachée : ne pas actualiser les données et indiquer
        // qu'il faudra mettre à jour les données quand l'utilisateur reviendra
        // sur la page.
        if (document.hidden) {
            this.#cron.stop();
            return;
        }

        const results = await Promise.all(
            this.#scrapers.map((s) => s.extract(1)),
        );
        const items = results.flat()
                             .sort((i1, i2) => (i2.date ?? 0) - (i1.date ?? 0))
                             .slice(0, 1);

        if (0 === items.length) {
            this.#display(this.#empty, true);
        } else {
            this.#display(items[0]);
        }
    }

    #wake() {
        if (!this.#cron.active) {
            this.#cron.start();
            this.#update();
        }
    }

    async connectedCallback() {
        const response = await fetch(resolve("./iframe.tpl"));
        const text = await response.text();
        const template = new DOMParser().parseFromString(text, "text/html")
                                        .querySelector("template");

        this.attachShadow({ mode: "open" });
        this.shadowRoot.append(template.content.cloneNode(true));

        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = resolve("./iframe.css");
        this.shadowRoot.append(link);

        this.#cron = new Cron(this.#config.cron ?? [], this.#update.bind(this));
        this.#empty = this.#config.empty ?? {};

        const iframe = this.shadowRoot.querySelector("iframe");
        iframe.height = this.#config.height ?? 150;

        document.addEventListener("visibilitychange", this.#wake.bind(this));
        this.#update();
    }
}
