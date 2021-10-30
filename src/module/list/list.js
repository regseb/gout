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

const hashCode = function (item) {
    return Math.abs(Array.from(item.guid ?? JSON.stringify(item))
                         .reduce((code, character) => {
        return (code << 5) - code + character.codePointAt();
    }, 0)).toString(36);
};

export default class extends HTMLElement {

    #config;

    #scrapers;

    #cron;

    #max;

    #empty;

    constructor(config, scrapers) {
        super();
        this.#config = config;
        this.#scrapers = scrapers;
    }

    #clean(items) {
        const guids = new Set(items.map(hashCode));
        Array.from(this.shadowRoot.querySelectorAll("li"))
             .filter((l) => !guids.has(l.dataset.guid))
             .forEach((l) => l.remove());
    }

    #display(item, empty = false) {
        const ul = this.shadowRoot.querySelector("ul");
        const guid = hashCode(item);
        const li = ul.querySelector(`li[data-guid="${guid}"]`) ??
                   this.shadowRoot.querySelector("template")
                                  .content.querySelector("li")
                                  .cloneNode(true);

        li.dataset.guid = guid;
        li.dataset.date = item.date?.toString() ?? "0";
        if (empty) {
            li.classList.add("empty");
        } else {
            li.classList.remove("empty");
        }

        const img = li.querySelector("img");
        img.src = item.icon ?? "";

        const a = li.querySelector("a");
        a.textContent = item.title ?? "";
        if (undefined === item.link) {
            a.removeAttribute("href");
        } else {
            a.href = item.link;
        }
        a.target = item.target ?? "_blank";
        a.title = item.desc ?? "";

        // Si l'élément n'est pas dans la liste.
        if (!li.isConnected) {
            let pos = 0;
            // Trouver la future position chronologique de l'élément.
            for (const other of ul.children) {
                if (Number.parseInt(li.dataset.date, 10) <=
                                      Number.parseInt(other.dataset.date, 10)) {
                    ++pos;
                }
            }

            if (0 === pos) {
                ul.prepend(li);
            } else {
                ul.children[pos - 1].after(li);
            }
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
            this.#scrapers.map((s) => s.extract(this.#max)),
        );
        const items = results.flat()
                             .sort((i1, i2) => (i2.date ?? 0) - (i1.date ?? 0))
                             .slice(0, this.#max);

        if (0 === items.length) {
            this.#clean([this.#empty]);
            this.#display(this.#empty, true);
        } else {
            this.#clean(items);
            for (const item of items) {
                this.#display(item);
            }
        }
    }

    #wake() {
        if (!this.#cron.active) {
            this.#cron.start();
            this.#update();
        }
    }

    async connectedCallback() {
        const response = await fetch(resolve("./list.tpl"));
        const text = await response.text();
        const template = new DOMParser().parseFromString(text, "text/html")
                                        .querySelector("template");

        this.attachShadow({ mode: "open" });
        this.shadowRoot.append(template.content.cloneNode(true));

        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = resolve("./list.css");
        this.shadowRoot.append(link);

        this.#cron = new Cron(this.#config.cron ?? [], this.#update.bind(this));
        this.#max = this.#config.max ?? Number.MAX_SAFE_INTEGER;
        this.#empty = this.#config.empty ?? {};

        const ul = this.shadowRoot.querySelector("ul");
        ul.style.backgroundColor = this.#config.color ?? "#9e9e9e";
        if (undefined !== this.#config.icon) {
            ul.style.backgroundImage = `url("${this.#config.icon}")`;
        }

        document.addEventListener("visibilitychange", this.#wake.bind(this));
        this.#update();
    }
}
