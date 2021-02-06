/**
 * @module
 */

import { Cron } from "https://cdn.jsdelivr.net/npm/cronnor@1";

const BASE_URL = import.meta.url.slice(0, import.meta.url.lastIndexOf("/") + 1);

export const Module = class extends HTMLElement {

    constructor(config, scrapers) {
        super();
        this._config = config;
        this._scrapers = scrapers;
    }

    display(item, empty = false) {
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

    async update() {
        // Si la page est cachée : ne pas actualiser les données et indiquer
        // qu'il faudra mettre à jour les données quand l'utilisateur
        // reviendra sur la page.
        if (document.hidden) {
            this._cron.stop();
            return;
        }

        const results = await Promise.all(
            this._scrapers.map((s) => s.extract(1)),
        );
        const items = results.flat()
                             .sort((i1, i2) => (i2.date ?? 0) - (i1.date ?? 0))
                             .slice(0, 1);

        if (0 === items.length) {
            this.display(this._config.empty, true);
        } else {
            this.display(items[0]);
        }
    }

    wake() {
        if (!this._cron.active) {
            this._cron.start();
            this.update();
        }
    }

    async connectedCallback() {
        this.attachShadow({ mode: "open" });

        const response = await fetch(BASE_URL + "iframe.tpl");
        const text = await response.text();
        const template = new DOMParser().parseFromString(text, "text/html")
                                        .querySelector("template");
        this.shadowRoot.append(template.content.cloneNode(true));

        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = BASE_URL + "iframe.css";
        this.shadowRoot.append(link);

        this._cron = new Cron(this._config.cron ?? [], this.update.bind(this));
        this._empty = this._config.empty ?? {};

        const iframe = this.shadowRoot.querySelector("iframe");
        iframe.height = this._config.height ?? 150;

        document.addEventListener("visibilitychange", this.wake.bind(this));
        this.update();
    }
};
