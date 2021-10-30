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

    #audio;

    #cron;

    #empty;

    constructor(config, scrapers) {
        super();
        this.#config = config;
        this.#scrapers = scrapers;
    }

    async #turn() {
        const input = this.shadowRoot.querySelector("input");

        const volume = input.valueAsNumber;
        if (0 === volume && null !== this.#audio) {
            this.#audio.pause();
            this.#audio = null;
            input.classList.remove("active");
        } else if (0 !== volume && null === this.#audio) {
            this.#audio = new Audio(input.dataset.audio);
            this.#audio.volume = volume / 100;
            await this.#audio.play();
            input.classList.add("active");
        } else if (0 !== volume && null !== this.#audio) {
            this.#audio.volume = volume / 100;
        }
    }

    #display(item, empty = false) {
        const div = this.shadowRoot.querySelector("div");
        div.style.backgroundColor = item.color ?? "#9e9e9e";
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
        img.src = item.icon ?? resolve("./img/icon.svg");

        const input = this.shadowRoot.querySelector("input");
        input.dataset.audio = item.audio;
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
        const response = await fetch(resolve("./audio.tpl"));
        const text = await response.text();
        const template = new DOMParser().parseFromString(text, "text/html")
                                        .querySelector("template");

        this.attachShadow({ mode: "open" });
        this.shadowRoot.append(template.content.cloneNode(true));

        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = resolve("./audio.css");
        this.shadowRoot.append(link);

        this.#cron = new Cron(this.#config.cron ?? [], this.#update.bind(this));
        this.#empty = this.#config.empty ?? {};
        this.#audio = null;

        const input = this.shadowRoot.querySelector("input");
        input.addEventListener("change", this.#turn.bind(this));

        document.addEventListener("visibilitychange", this.#wake.bind(this));
        this.#update();
    }
}
