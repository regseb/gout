/**
 * @module
 * @license MIT
 * @author Sébastien Règne
 */

import styleSheet from "./findrss.css" with { type: "css" };

const extract = async (url) => {
    const response = await fetch(url);
    const text = await response.text();
    const doc = new DOMParser().parseFromString(text, "text/html");

    const selector =
        'link[type="application/rss+xml"][href],' +
        ' link[type="application/atom+xml"][href]';
    return Array.from(doc.querySelectorAll(selector), (link) => ({
        icon: "https://cdn.simpleicons.org/rss/fff",
        link: new URL(link.getAttribute("href"), url).href,
        title: link.title,
    }));
};

export default class FindRSSModule extends HTMLElement {
    #options;

    #max;

    #empty;

    constructor(options) {
        super();
        this.#options = options;
    }

    #clean() {
        this.shadowRoot.querySelector("ul").replaceChildren();
    }

    #display(item, empty = false) {
        const ul = this.shadowRoot.querySelector("ul");
        const li = this.shadowRoot
            .querySelector("template")
            .content.querySelector("li")
            .cloneNode(true);

        li.classList.toggle("empty", empty);

        const img = li.querySelector("img");
        img.src = item.icon ?? "";

        const a = li.querySelector("a");
        a.textContent = item.title ?? item.link;
        if (undefined === item.link) {
            a.removeAttribute("href");
        } else {
            a.href = item.link;
        }
        a.target = item.target ?? "_blank";
        a.title = item.desc ?? "";

        ul.append(li);
    }

    async #update() {
        const input = this.shadowRoot.querySelector("input");

        const results = await extract(input.value);
        const items = results.flat().slice(0, this.#max);

        this.#clean();
        if (0 === items.length) {
            this.#display(this.#empty, true);
        } else {
            for (const item of items) {
                this.#display(item);
            }
        }
    }

    async connectedCallback() {
        const response = await fetch(import.meta.resolve("./findrss.tpl"));
        const text = await response.text();
        const template = new DOMParser()
            .parseFromString(text, "text/html")
            .querySelector("template");

        this.attachShadow({ mode: "open" });
        this.shadowRoot.append(document.importNode(template.content, true));
        this.shadowRoot.adoptedStyleSheets.push(styleSheet);

        this.#max = this.#options.max ?? Number.MAX_SAFE_INTEGER;
        this.#empty = this.#options.empty ?? { title: "(aucun flux)" };

        this.style.setProperty("--color", this.#options.color ?? "#757575");
        this.style.setProperty(
            "--icon",
            undefined === this.#options.icon
                ? "none"
                : `url("${new URL(this.#options.icon, location.href)}")`,
        );

        const input = this.shadowRoot.querySelector("input");
        input.addEventListener("input", this.#update.bind(this));
    }
}
