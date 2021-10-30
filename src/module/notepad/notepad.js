/**
 * @module
 */

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

    #guid;

    constructor(config) {
        super();
        this.#config = config;
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
        const response = await fetch(resolve("./notepad.tpl"));
        const text = await response.text();
        const template = new DOMParser().parseFromString(text, "text/html")
                                        .querySelector("template");

        this.attachShadow({ mode: "open" });
        this.shadowRoot.append(template.content.cloneNode(true));

        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = resolve("./notepad.css");
        this.shadowRoot.append(link);

        this.#guid = hashCode(this.#config);

        const textarea = this.shadowRoot.querySelector("textarea");
        textarea.style.backgroundColor = this.#config.color ?? "#9e9e9e";
        if (undefined !== this.#config.icon) {
            textarea.style.backgroundImage = `url("${this.#config.icon}")`;
        }
        textarea.value = localStorage.getItem(import.meta.url + this.#guid);
        textarea.title = this.#config.desc ?? "";
        textarea.placeholder = this.#config.title ?? "";
        textarea.style.borderColor = this.#config.color ?? "#9e9e9e";
        textarea.addEventListener("input", this.#save.bind(this));
        this.#resize();

        setTimeout(() => this.#resize(), 100);
    }
}
