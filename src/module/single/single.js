/**
 * @module
 * @license MIT
 * @author Sébastien Règne
 */

import Cron from "https://esm.sh/cronnor@2";
import styleSheet from "./single.css" with { type: "css" };

export default class SingleModule extends HTMLElement {
    #options;

    #scrapers;

    #cron;

    #empty;

    constructor(options, scrapers) {
        super();
        this.#options = options;
        this.#scrapers = scrapers;
    }

    #display(item, empty = false) {
        this.style.setProperty("--color", item.color ?? "#757575");

        const div = this.shadowRoot.querySelector("div");
        div.classList.toggle("empty", empty);

        const img = this.shadowRoot.querySelector("img");
        img.src = item.icon ?? "";

        const a = this.shadowRoot.querySelector("a");
        a.textContent = item.title ?? "";
        if (undefined === item.link) {
            a.removeAttribute("href");
        } else {
            a.href = item.link;
        }
        a.target = item.target ?? "_blank";
        a.title = item.desc ?? "";
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
        const items = results
            .flat()
            .toSorted((i1, i2) => (i2.date ?? 0) - (i1.date ?? 0))
            .slice(0, 1);

        if (0 === items.length) {
            this.#display(this.#empty, true);
        } else {
            this.#display(items[0]);
        }
    }

    async #wake() {
        if (!this.#cron.active) {
            this.#cron.start();
            await this.#update();
        }
    }

    async connectedCallback() {
        const response = await fetch(import.meta.resolve("./single.tpl"));
        const text = await response.text();
        const template = new DOMParser()
            .parseFromString(text, "text/html")
            .querySelector("template");

        this.attachShadow({ mode: "open" });
        this.shadowRoot.append(document.importNode(template.content, true));
        this.shadowRoot.adoptedStyleSheets.push(styleSheet);

        this.#empty = this.#options.empty ?? {};

        if (undefined !== this.#options.cron) {
            this.#cron = new Cron(this.#options.cron, this.#update.bind(this));
            document.addEventListener(
                "visibilitychange",
                this.#wake.bind(this),
            );
        }
        await this.#update(true);
    }
}
