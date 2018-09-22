fetch("module/core/iframe/index.html").then(function (response) {
    return response.text();
}).then(function (data) {
    return new DOMParser().parseFromString(data, "text/html")
                          .querySelector("template");
}).then(function (template) {
    const $    = require("jquery");
    const Cron = require("scronpt");

    customElements.define("core-iframe", class extends HTMLElement {

        set files({ "config.json": config }) {
            this._config = config;
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

            $("iframe", this).attr("src", $("iframe", this).attr("src"));
        }

        wake() {
            if (!this.cron.status()) {
                this.update();
            }
        }

        connectedCallback() {
            this.appendChild(template.content.cloneNode(true));

            this.cron = new Cron(this._config.cron || "@yearly",
                                 this.update.bind(this));

            $("iframe", this).attr("src", this._config.url);

            document.addEventListener("visibilitychange", this.wake.bind(this));
        }
    });
});
