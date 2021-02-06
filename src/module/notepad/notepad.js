/**
 * @module
 */

const BASE_URL = import.meta.url.slice(0, import.meta.url.lastIndexOf("/") + 1);

const hash = function (text) {
    return Math.abs(Array.from(text).reduce((code, character) => {
        return (code << 5) - code + character.charCodeAt();
    }, 0)).toString(36);
};

export const Module = class extends HTMLElement {

    constructor(config) {
        super();
        this._config = config;
    }

    save() {
        const textarea = this.shadowRoot.querySelector("textarea");
        localStorage.setItem(this._guid, textarea.value);
        this.resize();
    }

    resize() {
        // Adapter la hauteur de zone de saisie en fonction du nombre de lignes.
        const textarea = this.shadowRoot.querySelector("textarea");
        textarea.style.height = "auto";
        textarea.style.height = 7 + textarea.scrollHeight + "px";
    }

    async connectedCallback() {
        this.attachShadow({ mode: "open" });

        const response = await fetch(BASE_URL + "notepad.tpl");
        const text = await response.text();
        const template = new DOMParser().parseFromString(text, "text/html")
                                        .querySelector("template");
        this.shadowRoot.append(template.content.cloneNode(true));

        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = BASE_URL + "notepad.css";
        this.shadowRoot.append(link);

        this._guid = hash(BASE_URL +
                          (this._config.guid ?? JSON.stringify(this._config)));

        const textarea = this.shadowRoot.querySelector("textarea");
        textarea.style.backgroundColor = this._config.color ?? "grey";
        if (undefined !== this._config.icon) {
            textarea.style.backgroundImage = `url("${this._config.icon}")`;
        }
        textarea.value = localStorage.getItem(this._guid);
        textarea.title = this._config.desc ?? "";
        textarea.placeholder = this._config.title ?? "";
        textarea.style.borderColor = this._config.color ?? "grey";
        textarea.addEventListener("input", this.save.bind(this));
        this.resize();

        setTimeout(() => this.resize(), 100);
    }
};
