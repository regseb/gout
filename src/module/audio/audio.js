/**
 * @module
 */

import { Cron } from "https://cdn.jsdelivr.net/npm/cronnor@1";

const BASE_URI = import.meta.url.slice(0, import.meta.url.lastIndexOf("/"));

export default class extends HTMLElement {

    constructor(config, scrapers) {
        super();
        this._config = config;
        this._scrapers = scrapers;
    }

    _turn() {
        const audio = this.shadowRoot.querySelector("audio");
        const input = this.shadowRoot.querySelector("input");

        const volume = input.valueAsNumber;
        audio.volume = volume / 100;
        if (0 === volume) {
            audio.pause();
            input.classList.remove("active");
        } else {
            audio.play();
            input.classList.add("active");
        }
    }

    _display(item, empty = false) {
        const div = this.shadowRoot.querySelector("div");
        div.style.backgroundColor = item.color ?? "#9e9e9e";
        if (empty) {
            div.classList.add("empty");
        } else {
            div.classList.remove("empty");
        }

        const audio = this.shadowRoot.querySelector("audio");
        audio.src = item.audio ?? "";

        const a = this.shadowRoot.querySelector("a");
        a.title = item.title ?? "";
        a.target = item.target ?? "_blank";
        if (undefined === item.link) {
            a.removeAttribute("href");
        } else {
            a.href = item.link;
        }

        const img = this.shadowRoot.querySelector("img");
        img.src = item.icon ?? `${BASE_URI}/img/icon.svg`;
    }

    async _update() {
        // Si la page est cachée : ne pas actualiser les données et indiquer
        // qu'il faudra mettre à jour les données quand l'utilisateur reviendra
        // sur la page.
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
            this._display(this._config.empty ?? {}, true);
        } else {
            this._display(items[0]);
        }
    }

    _wake() {
        if (!this._cron.active) {
            this._cron.start();
            this._update();
        }
    }

    async connectedCallback() {
        this.attachShadow({ mode: "open" });

        const response = await fetch(`${BASE_URI}/audio.tpl`);
        const text = await response.text();
        const template = new DOMParser().parseFromString(text, "text/html")
                                        .querySelector("template");
        this.shadowRoot.append(template.content.cloneNode(true));

        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = `${BASE_URI}/audio.css`;
        this.shadowRoot.append(link);

        this._cron = new Cron(this._config.cron ?? [], this._update.bind(this));

        const input = this.shadowRoot.querySelector("input");
        input.addEventListener("change", this._turn.bind(this));

        document.addEventListener("visibilitychange", this._wake.bind(this));
        this._update();
    }
}
