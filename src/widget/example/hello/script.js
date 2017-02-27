(function () {
    "use strict";

    const owner = (document["_currentScript"] || document.currentScript)
                                                                 .ownerDocument;

    const $ = require("jquery");

    document.registerElement("example-hello", class extends HTMLElement {

        setFiles({ "config.json": config, "icon.svg": icon }) {
            this.config = config;
            this.icon   = icon;
        } // setFiles()

        setScrapers() {
            // Ne rien faire.
        } // setScrapers()

        createdCallback() {
            const template = owner.querySelector("template").content;
            const clone = owner.importNode(template, true);
            this.appendChild(clone);
        } // createdCallback()

        attachedCallback() {
            // Adapter le CSS du cadre en fonction de la configuration de la
            // passerelle.
            $(this).css({
                // Définir la couleur de fond du cadre. Si le propriété "color"
                // n'existe pas : utiliser du noir.
                "background-color": this.config.color || "black",
                // Ajouter l'image dans le cadre. La variable 'icon' contient le
                // code SVG de l'image ; il faut donc la convertir en base 64
                // pour l'ajouter en image de fond.
                "background-image": "url(\"data:image/svg+xml;base64," +
                                         btoa(this.icon) + "\")"
            });

            // Insérer le nom de la personne saluée.
            $("span", this).text(this.config.who);
        } // attachedCallback()
    });
})();
