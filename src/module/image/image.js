/**
 * @module
 */

import { Cron } from "https://cdn.jsdelivr.net/npm/cronnor@1";

const BASE_URI = import.meta.url.slice(0, import.meta.url.lastIndexOf("/"));

const hash = function (item) {
    return Math.abs(Array.from(item.guid ?? JSON.stringify(item))
                         .reduce((code, character) => {
        return (code << 5) - code + character.charCodeAt();
    }, 0)).toString(36);
};

export default class extends HTMLElement {

    constructor(config, scrapers) {
        super();
        this._config = config;
        this._scrapers = scrapers;
    }

    _refresh() {
        const lis = Array.from(this.shadowRoot.querySelectorAll("li"));
        for (const li of lis) {
            li.classList.remove("active");
        }
        lis[this._index].classList.add("active");
        if (0 === this._index) {
            this.shadowRoot.querySelector("span:first-of-type")
                           .classList.add("not-allowed");
        } else {
            this.shadowRoot.querySelector("span:first-of-type")
                           .classList.remove("not-allowed");
        }

        const ul = this.shadowRoot.querySelector("ul");
        if (ul.childElementCount - 1 === this._index) {
            this.shadowRoot.querySelector("span:last-of-type")
                           .classList.add("not-allowed");
        } else {
            this.shadowRoot.querySelector("span:last-of-type")
                           .classList.remove("not-allowed");
        }
    }

    _prev() {
        if (0 !== this._index) {
            --this._index;
            this._refresh();
        }
    }

    _next() {
        const ul = this.shadowRoot.querySelector("ul");
        if (ul.childElementCount - 1 !== this._index) {
            ++this._index;
            this._refresh();
        }
    }

    _clean(items) {
        const guids = new Set(items.map(hash));
        Array.from(this.shadowRoot.querySelectorAll("li"))
             .filter((l) => !guids.has(l.dataset.guid))
             .forEach((l) => l.remove());
    }

    _display(item, empty = false) {
        const ul = this.shadowRoot.querySelector("ul");
        const guid = hash(item);
        const li = ul.querySelector(`li[data-guid="${guid}"]`) ??
                   this.shadowRoot.querySelector("template")
                                  .content.querySelector("li")
                                  .cloneNode(true);

        li.dataset.guid = guid;
        li.dataset.date = item.date ?? 0;
        if (empty) {
            li.classList.add("empty");
        } else {
            li.classList.remove("empty");
        }

        const a = li.querySelector("a");
        a.title = item.title ?? "";
        if (undefined === item.link) {
            a.removeAttribute("href");
        } else {
            a.href = item.link;
        }
        a.target = item.target ?? "_blank";

        const img = li.querySelector("img");
        img.src = item.img ?? "";

        // Si l'image n'est pas dans la liste.
        if (!li.isConnected) {
            let pos = 0;
            // Trouver la future position chronologique de l'image.
            for (const other of ul.children) {
                if (li.dataset.date <= other.dataset.date) {
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

    async _update() {
        // Si la page est cachée : ne pas actualiser les données et indiquer
        // qu'il faudra mettre à jour les données quand l'utilisateur reviendra
        // sur la page.
        if (document.hidden) {
            this._cron.stop();
            return;
        }

        const results = await Promise.all(
            this._scrapers.map((s) => s.extract(this._max)),
        );
        const items = results.flat()
                             .sort((i1, i2) => (i2.date ?? 0) - (i1.date ?? 0))
                             .slice(0, this._max);

        if (0 === items.length) {
            this._clean([this._empty]);
            this._display(this._empty, true);
        } else {
            this._clean(items);
            for (const item of items) {
                this._display(item);
            }
        }

        this._index = 0;
        this._refresh();
    }

    _wake() {
        if (!this._cron.active) {
            this._cron.start();
            this._update();
        }
    }

    async connectedCallback() {
        this.attachShadow({ mode: "open" });

        const response = await fetch(`${BASE_URI}/image.tpl`);
        const text = await response.text();
        const template = new DOMParser().parseFromString(text, "text/html")
                                        .querySelector("template");
        this.shadowRoot.append(template.content.cloneNode(true));

        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = `${BASE_URI}/image.css`;
        this.shadowRoot.append(link);

        this._cron = new Cron(this._config.cron ?? [], this._update.bind(this));
        this._max = this._config.max ?? Number.MAX_SAFE_INTEGER;
        this._empty = this._config.empty ?? {};
        this._index = 0;

        if (1 === this._max) {
            Array.from(this.shadowRoot.querySelectorAll("span"))
                 .forEach((s) => s.remove());
        } else {
            this.shadowRoot.querySelector("span:first-of-type")
                           .addEventListener("click", this._prev.bind(this));
            this.shadowRoot.querySelector("span:last-of-type")
                           .addEventListener("click", this._next.bind(this));
        }

        document.addEventListener("visibilitychange", this._wake.bind(this));
        this._update();
    }
}
