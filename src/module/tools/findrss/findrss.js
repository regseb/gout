/**
 * @module
 */

const extract = async function (url) {
    const response = await fetch(url);
    const text = await response.text();
    const doc = new DOMParser().parseFromString(text, "text/html");

    const selector = `link[type="application/rss+xml"][href], ` +
                     ` link[type="application/atom+xml"][href]`;
    return Array.from(doc.querySelectorAll(selector)).map((link) => ({
        icon:  import.meta.resolve("./img/rss.svg"),
        link:  new URL(link.getAttribute("href"), url).href,
        title: link.title,
    }));
};

export default class extends HTMLElement {

    #config;

    #max;

    #empty;

    constructor(config) {
        super();
        this.#config = config;
    }

    #clean() {
        this.shadowRoot.querySelector("ul").replaceChildren();
    }

    #display(item, empty = false) {
        const ul = this.shadowRoot.querySelector("ul");
        const li = this.shadowRoot.querySelector("template")
                                  .content.querySelector("li")
                                  .cloneNode(true);

        if (empty) {
            li.classList.add("empty");
        } else {
            li.classList.remove("empty");
        }

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
        const items = results.flat()
                             .slice(0, this.#max);

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
        const template = new DOMParser().parseFromString(text, "text/html")
                                        .querySelector("template");

        this.attachShadow({ mode: "open" });
        this.shadowRoot.append(template.content.cloneNode(true));

        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = import.meta.resolve("./findrss.css");
        this.shadowRoot.append(link);

        this.#max = this.#config.max ?? Number.MAX_SAFE_INTEGER;
        this.#empty = this.#config.empty ?? { title: "(aucun flux)" };

        const div = this.shadowRoot.querySelector("div");
        div.style.backgroundColor = this.#config.color ?? "#757575";
        if (undefined !== this.#config.icon) {
            div.style.backgroundImage = `url("${this.#config.icon}")`;
        }

        const input = this.shadowRoot.querySelector("input");
        input.addEventListener("input", this.#update.bind(this));
    }
}
