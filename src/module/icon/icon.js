/**
 * @module
 */

import Cron from "https://cdn.jsdelivr.net/npm/cronnor@2/+esm";

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
        const div = this.shadowRoot.querySelector("div");
        div.style.backgroundColor = item.color ?? "#757575";
        if (empty) {
            div.classList.add("empty");
        } else {
            div.classList.remove("empty");
        }

        const a = this.shadowRoot.querySelector("a");
        if (undefined === item.link) {
            a.removeAttribute("href");
        } else {
            a.href = item.link;
        }
        a.target = item.target ?? "_blank";
        a.title = item.title ?? "";

        const img = this.shadowRoot.querySelector("img");
        img.src = item.icon ?? "";
    }

    async #update(force = false) {
        // Si la page est cachée : ne pas actualiser les données et indiquer
        // qu'il faudra mettre à jour les données quand l'utilisateur reviendra
        // sur la page.
        if (document.hidden && !force) {
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
        const response = await fetch(import.meta.resolve("./icon.tpl"));
        const text = await response.text();
        const template = new DOMParser().parseFromString(text, "text/html")
                                        .querySelector("template");

        this.attachShadow({ mode: "open" });
        this.shadowRoot.append(template.content.cloneNode(true));

        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = import.meta.resolve("./icon.css");
        this.shadowRoot.append(link);

        this.#empty = this.#config.empty ?? {};

        if (undefined !== this.#config.cron) {
            this.#cron = new Cron(this.#config.cron, this.#update.bind(this));
            document.addEventListener("visibilitychange",
                                      this.#wake.bind(this));
        }
        this.#update(true);
    }
}
