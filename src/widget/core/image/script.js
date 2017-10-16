(function () {
    "use strict";

    const owner = (document["_currentScript"] || document.currentScript)
                                                                 .ownerDocument;

    const $    = require("jquery");
    const Cron = require("scronpt");

    document.registerElement("core-image", class extends HTMLElement {

        setFiles({ "config.json": config }) {
            this.cron = new Cron(config.cron, this.update.bind(this));
            this.size = config.size;

            if (1 === this.size) {
                $("span", this).remove();
            } else {
                $("span:first", this).click(this.prev.bind(this));
                $("span:last",  this).click(this.next.bind(this));
            }
        }

        setScrapers(scrapers) {
            this.scrapers = scrapers;
        }

        refresh() {
            const left = $("ul", this).position().left;
            if (0 === left) {
                $("span:first", this).css("cursor", "not-allowed");
            } else {
                $("span:first", this).css("cursor", "pointer");
            }

            if (-1 * $(this).width() * ($("li", this).length - 1) === left) {
                $("span:last", this).css("cursor", "not-allowed");
            } else {
                $("span:last", this).css("cursor", "pointer");
            }
        }

        prev() {
            const left = $("ul", this).position().left;
            if (0 !== left) {
                $("ul", this).css("left", left + $(this).width());
                this.refresh();
            }
        }

        next() {
            const left = $("ul", this).position().left;
            if (-1 * $(this).width() * ($("li", this).length - 1) !== left) {
                $("ul", this).css("left", left - $(this).width());
                this.refresh();
            }
        }

        display(data) {
            let $li = $("li[data-guid=\"" + data.guid + "\"]", this);

            if (0 === $li.length) { // Si l'image n'est pas affichée.
                // Trouver la future position chronologique de l'image.
                let pos = -1;
                $("> ul > li", this).each(function (i) {
                    if (data.date <= $(this).data("date")) {
                        pos = i;
                    }
                });
                if (pos !== this.size - 1) {
                    // Supprimer la plus ancienne image (si la liste est
                    // pleine).
                    $("> ul > li:eq(" + (this.size - 1) + ")", this).remove();

                    // Créer la case de la nouvelle image.
                    const $a = $("<a>").attr({ "href":   data.link,
                                               "target": "_blank" })
                                       .css("background-image",
                                            "url(\"" + data.img + "\")");
                    if ("title" in data) {
                        $a.attr("title", data.title);
                    }

                    $li = $("<li>").attr("data-guid", data.guid)
                                   .data("date", data.date)
                                   .height($(this).height())
                                   .width($(this).width())
                                   .append($a);

                    if (-1 === pos) {
                        $("> ul", this).prepend($li);
                    } else {
                        $("> ul > li:eq(" + pos + ")", this).after($li);
                    }
                }
            } else { // Si l'image est déjà affichée.
                // Si des éléments de l'image ont changé, les mettre à jour.
                const $a = $("> a", $li);
                if ($a.attr("href") !== data.link) {
                    $a.attr("href", data.link);
                }
                if ($a.attr("title") !== data.title) {
                    $a.attr("title", data.title);
                }
                if ($("img", $a).attr("src") !== data.img) {
                    $("img", $a).attr("src", data.img);
                }
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

            const that = this;
            this.scrapers.forEach(function (scraper) {
                scraper.extract(that.size).then(function (items) {
                    items.forEach(that.display.bind(that));
                    that.refresh();
                });
            });
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
            $("ul", this).width($(this).width() * this.size);

            document.addEventListener("visibilitychange", this.wake.bind(this));
            this.update();
        }
    });
})();
