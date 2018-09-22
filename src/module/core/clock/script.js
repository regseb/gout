fetch("module/core/clock/index.html").then(function (response) {
    return response.text();
}).then(function (data) {
    return new DOMParser().parseFromString(data, "text/html")
                          .querySelector("template");
}).then(function (template) {
    const $    = require("jquery");
    const Cron = require("scronpt");

    const transform = function (time, center) {
        const element = document.createElementNS("http://www.w3.org/2000/svg",
                                                 "animateTransform");
        element.setAttribute("attributeName", "transform");
        element.setAttribute("type",          "rotate");
        element.setAttribute("dur",           time + "s");
        element.setAttribute("values",        center);
        element.setAttribute("repeatCount",   "indefinite");
        return element;
    };

    customElements.define("core-clock", class extends HTMLElement {

        set files({ "config.json": config, "icon.svg": icon }) {
            this._config = config;
            this._icon   = icon;
        }

        set scrapers(scrapers) {
            this._scraper = scrapers[0];
        }

        display(time) {
            const date = new Date(time);
            const svg = $("object", this).is("[data]")
                              ? $("object", this)[0].contentDocument.rootElement
                              : $("svg", this)[0];

            const view = svg.getAttribute("viewBox").split(" ");
            const cx = parseInt(view[2], 10) / 2;
            const cy = parseInt(view[3], 10) / 2;

            const seconds = date.getUTCSeconds();
            for (const child of svg.getElementById("second").children) {
                child.setAttribute("transform",
                               "rotate(" + seconds * 6 + ", " + cx + ", " + cy +
                               ")");
            }

            const minutes = date.getUTCMinutes() + seconds / 60;
            for (const child of svg.getElementById("minute").children) {
                child.setAttribute("transform",
                               "rotate(" + minutes * 6 + ", " + cx + ", " + cy +
                               ")");
            }

            const hours = date.getUTCHours() + minutes / 60;
            for (const child of svg.getElementById("hour").children) {
                child.setAttribute("transform",
                                "rotate(" + hours * 30 + ", " + cx + ", " + cy +
                                ")");
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

            this._scraper.extract().then(this.display.bind(this));
        }

        wake() {
            if (!this.cron.status()) {
                this.update();
            }
        }

        connectedCallback() {
            this.appendChild(template.content.cloneNode(true));
            this.cron = new Cron(this._config.cron || "@daily",
                                 this.update.bind(this));

            $(this).css("background-color", this._config.color || "black");
            if (undefined !== this._icon) {
                $("object", this).removeAttr("data").html(this._icon);
            }

            const svg = $("object", this).is("[data]")
                              ? $("object", this)[0].contentDocument.rootElement
                              : $("svg", this)[0];

            const view = svg.getAttribute("viewBox").split(" ");
            const cx = parseInt(view[2], 10) / 2;
            const cy = parseInt(view[3], 10) / 2;
            const center = "0, " + cx + ", " + cy + "; 360, " + cx + ", " + cy;

            svg.getElementById("second").appendChild(transform(60, center));
            svg.getElementById("minute").appendChild(transform(3600, center));
            svg.getElementById("hour").appendChild(transform(43200, center));

            document.addEventListener("visibilitychange", this.wake.bind(this));

            this.update();
        }
    });
});
