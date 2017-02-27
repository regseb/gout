(function () {
    "use strict";

    const owner = (document["_currentScript"] || document.currentScript)
                                                                 .ownerDocument;

    const $    = require("jquery");
    const Cron = require("scronpt");

    document.registerElement("core-text", class extends HTMLElement {

        setFiles({ "config.json": config, "icon.svg": icon }) {
            this.cron = new Cron(config.cron, this.update.bind(this));

            this.style.backgroundColor = config.color || "black";
            this.style.backgroundImage = "url(\"data:image/svg+xml;base64," +
                                         btoa(icon) + "\")";
            $("p", this).css("text-align", config.align || "left");
        } // setFiles()

        setScrapers(scrapers) {
            this.scraper = scrapers[0];
        } // setScrapers()

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
            this.scraper.extract().then(function (data) {
                $("p", that).html(Array.isArray(data) ? data.join("") : data);
            });
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
