/**
 * @module
 */

import { Cron } from "https://cdn.jsdelivr.net/npm/cronnor@1";

const BASE_URL = import.meta.url.slice(0, import.meta.url.lastIndexOf("/") + 1);

const animate = function (time, center) {
    const element = document.createElementNS("http://www.w3.org/2000/svg",
                                             "animateTransform");
    element.setAttribute("attributeName", "transform");
    element.setAttribute("type",          "rotate");
    element.setAttribute("dur",           time + "s");
    element.setAttribute("values",        center);
    element.setAttribute("repeatCount",   "indefinite");
    return element;
};

export const Module = class extends HTMLElement {

    constructor(config, scrapers) {
        super();
        this._config = config;
        this._scrapers = scrapers;
    }

    async display(item, empty = false) {
        const object = this.shadowRoot.querySelector("object");
        object.style.backgroundColor = item.color ?? "grey";
        if (empty) {
            object.classList.add("empty");
        } else {
            object.classList.remove("empty");
        }

        const response = await fetch(item.icon ?? BASE_URL + "img/icon.svg");
        const text = await response.text();
        const xml = new DOMParser().parseFromString(text, "image/svg+xml");
        object.replaceChildren(xml.documentElement);
        const svg = this.shadowRoot.querySelector("svg");

        const cx = svg.viewBox.baseVal.width  / 2;
        const cy = svg.viewBox.baseVal.height / 2;
        const center = `0, ${cx}, ${cy}; 360, ${cx}, ${cy}`;

        svg.querySelector("#second").append(animate(60, center));
        svg.querySelector("#minute").append(animate(3600, center));
        svg.querySelector("#hour").append(animate(43_200, center));

        const date = new Date(item.date ?? Date.now());
        const seconds = date.getSeconds();
        for (const child of svg.querySelector("#second").children) {
            child.setAttribute("transform",
                               `rotate(${seconds * 6}, ${cx}, ${cy})`);
        }

        const minutes = date.getMinutes() + seconds / 60;
        for (const child of svg.querySelector("#minute").children) {
            child.setAttribute("transform",
                               `rotate(${minutes * 6}, ${cx}, ${cy})`);
        }

        const hours = date.getHours() + minutes / 60;
        for (const child of svg.querySelector("#hour").children) {
            child.setAttribute("transform",
                               `rotate(${hours * 30}, ${cx}, ${cy})`);
        }
    }

    async update() {
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
        const response = await fetch(BASE_URL + "clock.tpl");
        const text = await response.text();
        const template = new DOMParser().parseFromString(text, "text/html")
                                        .querySelector("template");

        this.attachShadow({ mode: "open" });
        this.shadowRoot.append(template.content.cloneNode(true));

        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = BASE_URL + "clock.css";
        this.shadowRoot.append(link);

        this._cron = new Cron(this._config.cron ?? [], this.update.bind(this));
        this._empty = this._config.empty ?? {};

        document.addEventListener("visibilitychange", this.wake.bind(this));
        this.update();
    }
};
