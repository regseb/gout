(function () {
    "use strict";

    const owner = (document["_currentScript"] || document.currentScript)
                                                                 .ownerDocument;

    const $    = require("jquery");
    const Cron = require("scronpt");

    document.registerElement("core-feed", class extends HTMLElement {

        setFiles({ "config.json": config, "icon.svg": icon }) {
            this.cron = new Cron(config.cron, this.update.bind(this));

            this.style.backgroundColor = config.color;
            if (undefined !== icon) {
                this.style.backgroundImage = "url(\"data:image/svg+xml;" +
                                             "base64," + btoa(icon) + "\")";
            }
        } // setFiles()

        setScrapers(scrapers) {
            this.scrapers = scrapers;
        } // setScrapers()

        display(data) {
            let $li = $("li[data-guid=\"" + data.guid + "\"]", this);

            if (0 === $li.length) { // Si l'évènement n'est pas affiché.
                // Trouver la future position chronologique de l'évènement.
                let pos = -1;
                $("> ul > li", this).each(function (i) {
                    if (data.date <= $(this).data("date")) {
                        pos = i;
                    }
                });
                if (pos !== this.size - 1) {
                    // Supprimer le plus ancien évènement (si la liste est
                    // pleine).
                    $("> ul > li:eq(" + (this.size - 1) + ")", this).remove();

                    // Créer la ligne du nouvel évènement.
                    $li = $("<li>").attr("data-guid", data.guid)
                                   .data("date", data.date);

                    if ("icon" in data) {
                        $li.append($("<img>").attr("src", data.icon));
                    }

                    $li.append($("<a>").attr({ "href":   data.link,
                                               "target": "_blank" })
                                       .text(data.title));

                    if ("desc" in data) {
                        $li.append($("<span>").html(data.desc));
                    }

                    if (-1 === pos) {
                        $("> ul", this).prepend($li).fadeIn("slow");
                    } else {
                        $("> ul > li:eq(" + pos + ")", this).after($li)
                                                            .fadeIn("slow");
                    }
                }
            } else { // Si l'évènement est déjà affiché.
                // Si des éléments de l'évènement ont changé, les mettre à jour.
                const $img = $("> img", $li);
                if ($img.attr("src") !== data.icon) {
                    $img.attr("src", data.icon);
                }
                const $a = $("> a", $li);
                if ($a.attr("href") !== data.link) {
                    $a.attr("href", data.link);
                }
                if ($a.text() !== data.title) {
                    $a.text(data.title);
                }
                if ($a.next().html() !== data.desc) {
                    $a.next().html(data.desc);
                }
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
            this.size = parseInt(this.style.height, 10) / 14 - 1;

            document.addEventListener("visibilitychange", this.wake.bind(this));
            this.update();
        } // attachedCallback()
    });
})();
