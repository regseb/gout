(function () {
    "use strict";

    const owner = (document["_currentScript"] || document.currentScript)
                                                                 .ownerDocument;

    const $ = require("jquery");

    document.registerElement("core-search", class extends HTMLElement {

        setFiles(files) {
            this.engines = files["config.json"].engines;
            this.files  = files;
        } // setFiles()

        search() {
            // Ouvrir le résultat de la recherche dans un nouvel onglet.
            window.open($("form", this).attr("action")
                                       .replace("{searchTerms}",
                                                $("input", this).val()));
            $("input", this).val("").blur();
            return false;
        } // search()

        propose() {
            // Afficher la liste des moteurs de recherche.
            $("ul", this).show();
        } // propose()

        change(event) {
            // Cacher la liste des moteurs de recherche.
            $("ul", this).hide();

            // Mettre à jour le formulaire.
            const engine = this.engines[$(event.target).closest("li")
                                                       .data("index")];
            $("form",  this).attr("action", engine.url);
            $(this).css("background-color", engine.color);
            $("form img", this).attr("src", engine.icon);
            $("input", this).attr({ "name":        engine.terms,
                                    "placeholder": engine.title });
        } // change()

        display(data, i) {
            data.icon = "data:image/svg+xml;base64," +
                                                    btoa(this.files[data.icon]);
            $("ul", this).append(
                $("<li>").data("index", i)
                         .append($("<img>").attr("src", data.icon))
                         .append(data.title)
                         .click(this.change.bind(this)));
        } // display()

        createdCallback() {
            const template = owner.querySelector("template").content;
            const clone = owner.importNode(template, true);
            this.appendChild(clone);
        } // createdCallback()

        attachedCallback() {
            const height = parseInt(this.style.height, 10);
            const width  = parseInt(this.style.width,  10);
            $("form", this).submit(this.search.bind(this));
            $("img", this).width(height - 14)
                          .height(height - 14)
                          .click(this.propose.bind(this));
            $("input", this).width(width - height - 7)
                            .height(height - 15);

            this.engines.forEach(this.display.bind(this));

            // Sélectionner le premier élément.
            $("li:first", this).click();
        } // attachedCallback()
    });
})();
