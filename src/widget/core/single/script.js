(function () {
    "use strict";

    const owner = (document["_currentScript"] || document.currentScript)
                                                                 .ownerDocument;

    const $    = require("jquery");
    const Cron = require("scronpt");

    document.registerElement("core-single", class extends HTMLElement {

        setFiles({ "config.json": config, "icon.svg": icon = null }) {
            this.cron = new Cron(config.cron, this.update.bind(this));
            if ("color" in config) {
                this.style.backgroundColor = config.color;
            }
            if (null !== icon) {
                this.style.backgroundImage = "url(\"data:image/svg+xml;" +
                                             "base64," + btoa(icon) + "\")";
            }
        } // setFiles()

        setScrapers(scrapers) {
            this.scrapers = scrapers;
        } // setScrapers()

        display(data) {
            $("a", this).attr("href", data.link)
                        .html(data.title);
            if ("desc" in data) {
                $("span", this).html(data.desc).show();
            } else {
                $("span", this).hide();
            }
            if ("color" in data) {
                this.style.backgroundColor = data.color;
            }
            if ("icon" in data) {
                this.style.backgroundImage = "url(\"" + data.icon + "\")";
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

            const that = this;
            this.scrapers.forEach(function (scraper) {
                scraper.extract(that.size).then(function (items) {
                    items.forEach(that.display.bind(that));
                });
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
