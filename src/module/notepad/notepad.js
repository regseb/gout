/**
 * @module
 */

const BASE_URI = import.meta.url.slice(0, import.meta.url.lastIndexOf("/"));

const hash = function (item) {
    return Math.abs(Array.from(BASE_URI + (item.guid ?? JSON.stringify(item)))
                         .reduce((code, character) => {
        return (code << 5) - code + character.charCodeAt();
    }, 0)).toString(36);
};

export default class extends HTMLElement {

    constructor(config) {
        super();
        this._config = config;
    }

    _save() {
        const textarea = this.shadowRoot.querySelector("textarea");
        localStorage.setItem(this._guid, textarea.value);
        this._resize();
    }

    _resize() {
        // Adapter la hauteur de zone de saisie en fonction du nombre de lignes.
        const textarea = this.shadowRoot.querySelector("textarea");
        textarea.style.height = "auto";
        textarea.style.height = 7 + textarea.scrollHeight + "px";
    }

    async connectedCallback() {
        this.attachShadow({ mode: "open" });

        const response = await fetch(`${BASE_URI}/notepad.tpl`);
        const text = await response.text();
        const template = new DOMParser().parseFromString(text, "text/html")
                                        .querySelector("template");
        this.shadowRoot.append(template.content.cloneNode(true));

        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = `${BASE_URI}/notepad.css`;
        this.shadowRoot.append(link);

        this._guid = hash(this._config);

        const textarea = this.shadowRoot.querySelector("textarea");
        textarea.style.backgroundColor = this._config.color ?? "#9e9e9e";
        if (undefined !== this._config.icon) {
            textarea.style.backgroundImage = `url("${this._config.icon}")`;
        }
        textarea.value = localStorage.getItem(this._guid);
        textarea.title = this._config.desc ?? "";
        textarea.placeholder = this._config.title ?? "";
        textarea.style.borderColor = this._config.color ?? "#9e9e9e";
        textarea.addEventListener("input", this._save.bind(this));
        this._resize();

        setTimeout(() => this._resize(), 100);
    }
}
