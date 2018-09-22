fetch("module/core/icon/index.html").then(function (response) {
    return response.text();
}).then(function (data) {
    return new DOMParser().parseFromString(data, "text/html")
                          .querySelector("template");
}).then(function (template) {
    const $    = require("jquery");
    const Cron = require("scronpt");

    customElements.define("core-icon", class extends HTMLElement {

        set files({ "config.json": config }) {
            this._config = config;
        }

        set scrapers(scrapers) {
            this._scrapers = scrapers;
        }

        display(data) {
            this.style.backgroundColor = data.color;
            $("> a", this).attr("href", data.link);
            $("> a img", this).attr("src", data.icon);
            if ("title" in data) {
                $("> span", this).html(data.title).show();
            } else {
                $("> span", this).hide();
            }
        }

        update() {
            // Si la page est cachée : ne pas actualiser les données et indiquer
            // qu'il faudra mettre à jour les données quand l'utilisateur
            // reviendra sur la page.
            if (document.hidden) {
                this.cron.stop();
                return;
            }
            this.cron.start();

            const that = this;
            this._scrapers.forEach(function (scraper) {
                scraper.extract(1).then(function (items) {
                    items.forEach(that.display.bind(that));
                });
            });
        }

        wake() {
            if (!this.cron.status()) {
                this.update();
            }
        }

        connectedCallback() {
            this.appendChild(template.content.cloneNode(true));

            this.querySelector("a").setAttribute(
                                     "target", this._config.target || "_blank");
            this.cron = new Cron(this._config.cron || "@yearly",
                                 this.update.bind(this));

            document.addEventListener("visibilitychange", this.wake.bind(this));
            this.update();
        }
    });
});
