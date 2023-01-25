/**
 * @module
 */

import Cron from "https://cdn.jsdelivr.net/npm/cronnor@2/+esm";

export default class Audio extends HTMLElement {

    #options;

    #scrapers;

    #audio;

    #cron;

    #empty;

    constructor(options, scrapers) {
        super();
        this.#options = options;
        this.#scrapers = scrapers;
    }

    async #turn() {
        const input = this.shadowRoot.querySelector("input");

        const volume = input.valueAsNumber;
        if (0 === volume && undefined !== this.#audio) {
            this.#audio.pause();
            this.#audio = undefined;
            input.classList.remove("active");
        } else if (0 !== volume && undefined === this.#audio) {
            this.#audio = new Audio(input.dataset.audio);
            this.#audio.volume = volume / 100;
            await this.#audio.play();
            input.classList.add("active");
        } else if (0 !== volume && undefined !== this.#audio) {
            this.#audio.volume = volume / 100;
        }
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
        img.src = item.icon ?? import.meta.resolve("./img/icon.svg");

        const input = this.shadowRoot.querySelector("input");
        input.dataset.audio = item.audio;
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
        const response = await fetch(import.meta.resolve("./audio.tpl"));
        const text = await response.text();
        const template = new DOMParser().parseFromString(text, "text/html")
                                        .querySelector("template");

        this.attachShadow({ mode: "open" });
        this.shadowRoot.append(template.content.cloneNode(true));

        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = import.meta.resolve("./audio.css");
        this.shadowRoot.append(link);

        this.#empty = this.#options.empty ?? {};

        const input = this.shadowRoot.querySelector("input");
        input.addEventListener("change", this.#turn.bind(this));

        if (undefined !== this.#options.cron) {
            this.#cron = new Cron(this.#options.cron, this.#update.bind(this));
            document.addEventListener("visibilitychange",
                                      this.#wake.bind(this));
        }
        this.#update(true);
    }
}
