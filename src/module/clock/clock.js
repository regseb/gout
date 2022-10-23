/**
 * @module
 */

import Cron from "https://cdn.jsdelivr.net/npm/cronnor@2/+esm";

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

    async #display(item, empty = false) {
        const object = this.shadowRoot.querySelector("object");
        object.style.backgroundColor = item.color ?? "#757575";
        if (empty) {
            object.classList.add("empty");
        } else {
            object.classList.remove("empty");
        }

        const response = await fetch(item.icon ??
                                     import.meta.resolve("./img/icon.svg"));
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
        const response = await fetch(import.meta.resolve("./clock.tpl"));
        const text = await response.text();
        const template = new DOMParser().parseFromString(text, "text/html")
                                        .querySelector("template");

        this.attachShadow({ mode: "open" });
        this.shadowRoot.append(template.content.cloneNode(true));

        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = import.meta.resolve("./clock.css");
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
