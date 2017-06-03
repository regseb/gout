(function () {
    "use strict";

    const owner = (document["_currentScript"] || document.currentScript)
                                                                 .ownerDocument;

    const $    = require("jquery");
    const Cron = require("scronpt");

    document.registerElement("core-stack", class extends HTMLElement {

        setFiles({ "config.json": config, "icon.svg": icon }) {
            this.cron = new Cron(config.cron, this.update.bind(this));
            this.size = config.size || 10;

            this.style.backgroundColor = config.color;
            if (undefined !== icon) {
                this.style.backgroundImage = "url(\"data:image/svg+xml;" +
                                             "base64," + btoa(icon) + "\")";
            }
        } // setFiles()

        setScrapers(scrapers) {
            this.scrapers = scrapers;
        } // setScrapers()

        clean() {
            $("> ul > li > a", this).each(function () {
                const that = this;
                const query = {
                    "text":       $(this).attr("href"),
                    "startTime":  0,
                    "maxResults": 1
                };
                browser.history.search(query).then(function (histories) {
                    if (0 !== histories.length) {
                        $(that).parent().remove();
                    }
                });
            });
        } // clean()

        mouseup(event) {
            switch (event.which) {
                case 1:
                case 2:
                    setTimeout(function () {
                        $(event.target).parent().remove();
                    }, 0);
            }
        } // mousedown()

        display(data) {
            let $li = $("> ul > li[data-guid=\"" + data.guid + "\"]", this);

            if (0 === $li.length) { // Si l'évènement n'est pas affiché.
                // Trouver la future position chronologique de l'évènement.
                let pos = -1;
                $("> ul > li", this).each(function (i) {
                    if (data.date <= $(this).data("date")) {
                        pos = i;
                    }
                });
                // Créer la ligne du nouvel évènement.
                $li = $("<li>").attr("data-guid", data.guid)
                               .data("date", data.date);

                if ("icon" in data) {
                    $li.append($("<img>").attr("src", data.icon));
                }

                $li.append($("<a>").attr({ "href":   data.link,
                                           "target": "_blank" })
                                   .mouseup(this.mouseup.bind(this))
                                   .text(data.title));

                if ("desc" in data) {
                    $li.append($("<span>").html(data.desc));
                }

                if (-1 === pos) {
                    $("> ul", this).prepend($li);
                } else {
                    $("> ul > li:eq(" + pos + ")", this).after($li);
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

            this.clean();
            const that = this;
            this.scrapers.forEach(function (scraper) {
                scraper.extract(that.size).then(function (items) {
                    for (const item of items) {
                        const query = {
                            "text":       item.link,
                            "startTime":  0,
                            "maxResults": 1
                        };
                        browser.history.search(query)
                                       .then(function (histories) {
                            if (0 === histories.length) {
                                that.display(item);
                            }
                        });
                    }
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
            const size = parseInt(this.style.height, 10) / 14;
            // Cacher les éléments qui sortent du cadre.
            $(this).append(
                "<style>" +
                "    #" + this.id + " > ul > li:nth-child(n+" + size + ") {" +
                "        display: none;" +
                "    }" +
                "</style>");

            document.addEventListener("visibilitychange", this.wake.bind(this));
            this.update();
        } // attachedCallback()
    });
})();
