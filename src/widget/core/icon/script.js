(function () {
    "use strict";

    const owner = (document["_currentScript"] || document.currentScript)
                                                                 .ownerDocument;

    const $    = require("jquery");
    const Cron = require("scronpt");

    document.registerElement("core-icon", class extends HTMLElement {

        setFiles({ "config.json": config }) {
            this.cron = new Cron(config.cron || "0 0 1 1 0",
                                 this.update.bind(this));
        } // setFiles()

        setScrapers(scrapers) {
            this.scraper = scrapers[0];
        } // setScrapers()

        display(data) {
            $(this).css("background-color", data.color);
            $("> a", this).attr("href", data.link);
            $("> a img", this).attr("src", data.icon);
            if ("" === data.desc) {
                $("> span", this).hide();
            } else {
                $("> span", this).html(data.desc)
                                 .show();
            }
        } // display()

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
        } // update()

        wake() {
            if (!this.cron.status()) {
                this.update();
            }
        } // wake()

        createdCallback() {
            const template = owner.querySelector("template").content;
            const clone = owner.importNode(template, true);
            this.appendChild(clone);
        } // createdCallback()

        attachedCallback() {
            document.addEventListener("visibilitychange", this.wake.bind(this));
            this.update();
        } // attachedCallback()
    });
})();
