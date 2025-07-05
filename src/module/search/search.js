/**
 * @module
 * @license MIT
 * @author Sébastien Règne
 */

export default class SearchModule extends HTMLElement {
    #scrapers;

    #scraper;

    constructor(_options, scrapers) {
        super();
        this.#scrapers = scrapers;
    }

    async #search(event) {
        event.preventDefault();

        const input = this.shadowRoot.querySelector("input");
        const url = await this.#scraper.result(input.value);

        const info = await this.#scraper.info();
        const target = info.target ?? "_blank";
        if ("_blank" === target) {
            // Ouvrir le résultat de la recherche dans un nouvel onglet.
            window.open(url);
            input.value = "";
            input.blur();

            this.shadowRoot.querySelector("datalist").replaceChildren();
        } else {
            globalThis.location.assign(url);
        }
    }

    #propose() {
        // Afficher la liste des moteurs de recherche.
        this.shadowRoot.querySelector("ul").classList.add("active");
    }

    #change(event) {
        // Cacher la liste des moteurs de recherche.
        this.shadowRoot.querySelector("ul").classList.remove("active");

        // Mettre à jour le formulaire.
        const li = event.target.closest("li");
        this.#scraper = this.#scrapers[Number(li.dataset.index)];

        this.style.setProperty("--color", li.dataset.color);

        this.shadowRoot.querySelector("form img").src =
            li.querySelector("img").src;
        this.shadowRoot.querySelector("input").placeholder =
            li.querySelector("span").textContent;
        this.shadowRoot.querySelector("input").title = li.title;

        this.shadowRoot.querySelector("datalist").replaceChildren();
    }

    async #suggest() {
        const terms = this.shadowRoot.querySelector("input").value;
        const suggestions = await this.#scraper.suggest(terms);
        const datalist = this.shadowRoot.querySelector("datalist");
        datalist.replaceChildren();
        for (const suggestion of suggestions) {
            datalist.append(new Option("", suggestion));
        }
    }

    #display(i, data) {
        const li = this.shadowRoot
            .querySelector("template")
            .content.querySelector("li")
            .cloneNode(true);
        li.title = data.desc ?? "";
        li.dataset.index = i.toString();
        li.dataset.color = data.color;
        li.querySelector("img").src = data.icon;
        li.querySelector("span").textContent = data.title;
        li.addEventListener("click", this.#change.bind(this));

        this.shadowRoot.querySelector("ul").append(li);
    }

    async connectedCallback() {
        const response = await fetch(import.meta.resolve("./search.tpl"));
        const text = await response.text();
        const template = new DOMParser()
            .parseFromString(text, "text/html")
            .querySelector("template");

        this.attachShadow({ mode: "open" });
        this.shadowRoot.append(template.content.cloneNode(true));

        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = import.meta.resolve("./search.css");
        this.shadowRoot.append(link);

        this.shadowRoot
            .querySelector("form")
            .addEventListener("submit", this.#search.bind(this));
        this.shadowRoot
            .querySelector("img")
            .addEventListener("click", this.#propose.bind(this));
        this.shadowRoot
            .querySelector("input")
            .addEventListener("input", this.#suggest.bind(this));

        const infos = await Promise.all(this.#scrapers.map((s) => s.info()));
        for (const [i, info] of infos.entries()) {
            this.#display(i, info);
        }

        // Sélectionner le premier élément.
        this.shadowRoot.querySelector("li").click();
    }
}
