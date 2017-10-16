(function () {
    "use strict";

    const owner = (document["_currentScript"] || document.currentScript)
                                                                 .ownerDocument;

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

    document.registerElement("core-clock", class extends HTMLElement {

        setFiles({ "config.json": config, "icon.svg": icon }) {
            this.config = config;
            this.icon   = icon;
        }

        setScrapers(scrapers) {
            this.scraper = scrapers[0];
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

            this.scraper.extract().then(this.display.bind(this));
        }

        wake() {
            if (!this.cron.status()) {
                this.update();
            }
        }

        createdCallback() {
            const template = owner.querySelector("template").content;
            const clone = owner.importNode(template, true);
            this.appendChild(clone);
        }

        attachedCallback() {
            this.cron = new Cron(this.config.cron || "0 0 * * *",
                                 this.update.bind(this));

            $(this).css("background-color", this.config.color || "black");
            if (undefined !== this.icon) {
                $("object", this).removeAttr("data").html(this.icon);
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
})();
