/**
 * @module
 * @license MIT
 * @author Sébastien Règne
 */

import styleSheet from "./notepad.css" with { type: "css" };

const hashCode = (item) => {
    return Math.abs(
        Array.from(item.guid ?? JSON.stringify(item)).reduce(
            (code, character) => {
                return (code << 5) - code + character.codePointAt(0);
            },
            0,
        ),
    ).toString(36);
};

export default class NotepadModule extends HTMLElement {
    #options;

    #guid;

    constructor(options) {
        super();
        this.#options = options;
    }

    #save() {
        const textarea = this.shadowRoot.querySelector("textarea");
        localStorage.setItem(import.meta.url + this.#guid, textarea.value);
        this.#resize();
    }

    #resize() {
        // Adapter la hauteur de zone de saisie en fonction du nombre de lignes.
        const textarea = this.shadowRoot.querySelector("textarea");
        textarea.style.height = "auto";
        textarea.style.height = `${7 + textarea.scrollHeight}px`;
    }

    async connectedCallback() {
        const response = await fetch(import.meta.resolve("./notepad.tpl"));
        const text = await response.text();
        const template = new DOMParser()
            .parseFromString(text, "text/html")
            .querySelector("template");

        this.attachShadow({ mode: "open" });
        this.shadowRoot.append(document.importNode(template.content, true));
        this.shadowRoot.adoptedStyleSheets.push(styleSheet);

        this.style.setProperty("--color", this.#options.color ?? "#757575");
        this.style.setProperty(
            "--icon",
            undefined === this.#options.icon
                ? "none"
                : `url("${new URL(this.#options.icon, location.href)}")`,
        );

        this.#guid = hashCode(this.#options);

        const textarea = this.shadowRoot.querySelector("textarea");
        textarea.value = localStorage.getItem(import.meta.url + this.#guid);
        textarea.title = this.#options.desc ?? "";
        textarea.placeholder = this.#options.title ?? "";
        textarea.addEventListener("input", this.#save.bind(this));
        this.#resize();

        setTimeout(() => this.#resize(), 100);
    }
}
