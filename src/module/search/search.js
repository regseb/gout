/**
 * @module
 */

const BASE_URL = import.meta.url.slice(0, import.meta.url.lastIndexOf("/") + 1);

export const Module = class extends HTMLElement {

    constructor(_config, scrapers) {
        super();
        this._scrapers = scrapers;
    }

    async search(event) {
        event.preventDefault();

        const input = this.shadowRoot.querySelector("input");
        const url = await this._scraper.result(input.value);

        const info = await this._scraper.info();
        const target = info.target ?? "_blank";
        if ("_blank" === target) {
            // Ouvrir le résultat de la recherche dans un nouvel onglet.
            window.open(url);
            input.value = "";
            input.blur();

            const datalist = this.shadowRoot.querySelector("datalist");
            while (null !== datalist.firstChild) {
                datalist.firstChild.remove();
            }
        } else {
            window.location.assign(url);
        }
    }

    propose() {
        // Afficher la liste des moteurs de recherche.
        this.shadowRoot.querySelector("ul").classList.add("active");
    }

    change(event) {
        // Cacher la liste des moteurs de recherche.
        this.shadowRoot.querySelector("ul").classList.remove("active");

        // Mettre à jour le formulaire.
        const li = event.target.closest("li");
        this._scraper = this._scrapers[Number.parseInt(li.dataset.index, 10)];
        this.style.backgroundColor = li.dataset.color;
        this.shadowRoot.querySelector("form img").src =
                                                    li.querySelector("img").src;
        this.shadowRoot.querySelector("input").placeholder =
                                           li.querySelector("span").textContent;
        this.shadowRoot.querySelector("input").title = li.title;

        const datalist = this.shadowRoot.querySelector("datalist");
        while (null !== datalist.firstChild) {
            datalist.firstChild.remove();
        }
    }

    async suggest() {
        const terms = this.shadowRoot.querySelector("input").value;
        const suggestions = await this._scraper.suggest(terms);
        const datalist = this.shadowRoot.querySelector("datalist");
        while (null !== datalist.firstChild) {
            datalist.firstChild.remove();
        }
        for (const suggestion of suggestions) {
            datalist.append(new Option("", suggestion));
        }
    }

    display(i, data) {
        const li = this.shadowRoot.querySelector("template")
                                  .content.querySelector("li")
                                  .cloneNode(true);
        li.title = data.desc ?? "";
        li.dataset.index = i;
        li.dataset.color = data.color;
        li.querySelector("img").src = data.icon;
        li.querySelector("span").textContent = data.title;
        li.addEventListener("click", this.change.bind(this));

        this.shadowRoot.querySelector("ul").append(li);
    }

    async connectedCallback() {
        this.attachShadow({ mode: "open" });

        const response = await fetch(BASE_URL + "search.tpl");
        const text = await response.text();
        const template = new DOMParser().parseFromString(text, "text/html")
                                        .querySelector("template");
        this.shadowRoot.append(template.content.cloneNode(true));

        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = BASE_URL + "search.css";
        this.shadowRoot.append(link);

        this.shadowRoot.querySelector("form")
                       .addEventListener("submit", this.search.bind(this));
        this.shadowRoot.querySelector("img")
                       .addEventListener("click", this.propose.bind(this));
        this.shadowRoot.querySelector("input")
                       .addEventListener("input", this.suggest.bind(this));

        const infos = await Promise.all(this._scrapers.map((s) => s.info()));
        for (const [i, info] of infos.entries()) {
            this.display(i, info);
        }

        // Sélectionner le premier élément.
        this.shadowRoot.querySelector("li").click();
    }
};
