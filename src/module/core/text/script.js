fetch("module/core/text/index.html").then(function (response) {
    return response.text();
}).then(function (data) {
    return new DOMParser().parseFromString(data, "text/html")
                          .querySelector("template");
}).then(function (template) {
    const $    = require("jquery");
    const Cron = require("scronpt");

    customElements.define("core-text", class extends HTMLElement {

        set files({ "config.json": config, "icon.svg": icon }) {
            this._config = config;
            this._icon   = icon;
        }

        set scrapers(scrapers) {
            this._scraper = scrapers[0];
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
            this._scraper.extract().then(function (data) {
                $("p", that).html(Array.isArray(data) ? data.join("") : data);
            });
        }

        wake() {
            if (!this.cron.status()) {
                this.update();
            }
        }

        connectedCallback() {
            this.appendChild(template.content.cloneNode(true));

            this.cron = new Cron(this._config.cron, this.update.bind(this));

            this.style.backgroundColor = this._config.color || "black";
            this.style.backgroundImage = "url(\"data:image/svg+xml;base64," +
                                         btoa(this._icon) + "\")";
            $("p", this).css("text-align", this._config.align || "left");

            document.addEventListener("visibilitychange", this.wake.bind(this));
            this.update();
        }
    });
});
