(function () {
    "use strict";

    const owner = (document["_currentScript"] || document.currentScript)
                                                                 .ownerDocument;

    const $    = require("jquery");
    const Cron = require("scronpt");

    document.registerElement("core-iframe", class extends HTMLElement {

        setFiles({ "config.json": config }) {
            this.cron = new Cron(config.cron || "0 0 1 1 0",
                                 this.update.bind(this));

            $("iframe", this).attr("src", config.url);
        } // setFiles()

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
            $("iframe", this).attr({
                "width":  parseInt(this.style.width,  10),
                "height": parseInt(this.style.height, 10)
            });

            document.addEventListener("visibilitychange", this.wake.bind(this));
        } // attachedCallback()
    });
})();
