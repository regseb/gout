/**
 * @module
 */

const hashCode = function (item) {
    return Math.abs(Array.from(item.guid ?? JSON.stringify(item))
                         .reduce((code, character) => {
        return (code << 5) - code + character.codePointAt();
    }, 0)).toString(36);
};

export default class Notepad extends HTMLElement {

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
        textarea.style.height = 7 + textarea.scrollHeight + "px";
    }

    async connectedCallback() {
        const response = await fetch(import.meta.resolve("./notepad.tpl"));
        const text = await response.text();
        const template = new DOMParser().parseFromString(text, "text/html")
                                        .querySelector("template");

        this.attachShadow({ mode: "open" });
        this.shadowRoot.append(template.content.cloneNode(true));

        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = import.meta.resolve("./notepad.css");
        this.shadowRoot.append(link);

        this.#guid = hashCode(this.#options);

        const textarea = this.shadowRoot.querySelector("textarea");
        textarea.style.backgroundColor = this.#options.color ?? "#757575";
        if (undefined !== this.#options.icon) {
            textarea.style.backgroundImage = `url("${this.#options.icon}")`;
        }
        textarea.value = localStorage.getItem(import.meta.url + this.#guid);
        textarea.title = this.#options.desc ?? "";
        textarea.placeholder = this.#options.title ?? "";
        textarea.style.borderColor = this.#options.color ?? "#757575";
        textarea.addEventListener("input", this.#save.bind(this));
        this.#resize();

        setTimeout(() => this.#resize(), 100);
    }
}
