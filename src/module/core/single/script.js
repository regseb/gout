fetch("module/core/single/index.html").then(function (response) {
    return response.text();
}).then(function (data) {
    return new DOMParser().parseFromString(data, "text/html")
                          .querySelector("template");
}).then(function (template) {
    const $    = require("jquery");
    const Cron = require("scronpt");

    customElements.define("core-single", class extends HTMLElement {

        set files({ "config.json": config, "icon.svg": icon = null }) {
            this._config = config;
            this._icon   = icon;
        }

        set scrapers(scrapers) {
            this._scrapers = scrapers;
        }

        display(data) {
            $("a", this).html(data.title);
            if ("link" in data) {
                $("a", this).attr("href", data.link);
            } else {
                $("a", this).removeAttr("href");
            }
            if ("desc" in data) {
                $("span", this).html(data.desc).show();
            } else {
                $("span", this).hide();
            }
            if ("color" in data) {
                this.style.backgroundColor = data.color;
            }
            if ("icon" in data) {
                $("> img", this).attr("src", data.icon);
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
                scraper.extract(that.size).then(function (items) {
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

            this.cron = new Cron(this._config.cron, this.update.bind(this));
            if ("color" in this._config) {
                this.style.backgroundColor = this._config.color;
            }
            if (null !== this._icon) {
                $("> img", this).attr("src", this.icon);
            }

            document.addEventListener("visibilitychange", this.wake.bind(this));
            this.update();
        }
    });
});
