(function () {
    "use strict";

    const owner = (document["_currentScript"] || document.currentScript)
                                                                 .ownerDocument;

    const $    = require("jquery");
    const Cron = require("scronpt");

    const IMG_DIR = "widget/core/podcast/img/";

    document.registerElement("core-podcast", class extends HTMLElement {

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

        start(event) {
            const $li = $(event.target).closest("li");
            const audio = $("> audio", $li)[0];
            $("> a", $li).hide();
            $("> input", $li).css("display", "inline-block")
                             .attr("max", audio.duration);
            $("> img:first", $li).attr("src", IMG_DIR + "pause.svg")
                                 .off("click")
                                 .on("click", this.pause.bind(this));
            $("> img:last", $li).show();
            audio.play();
        } // start()

        play(event) {
            const $li = $(event.target).closest("li");
            const audio = $("> audio", $li)[0];
            $("> img:first", $li).attr("src", IMG_DIR + "pause.svg")
                                 .off("click")
                                 .on("click", this.pause.bind(this));
            audio.play();
        } // play()

        pause(event) {
            const $li = $(event.target).closest("li");
            const audio = $("> audio", $li)[0];
            $("> img:first", $li).attr("src", IMG_DIR + "play.svg")
                                 .off("click")
                                 .on("click", this.play.bind(this));
            audio.pause();
        } // pause()

        elapse(event) {
            const $li = $(event.target).closest("li");
            const audio = $("> audio", $li)[0];
            $("> input", $li).val(audio.currentTime);
        } // elapse()

        move(event) {
            const $li = $(event.target).closest("li");
            const audio = $("> audio", $li)[0];
            audio.currentTime = $("> input", $li).val();
        } // move()

        menu(event) {
            const $li = $(event.target).closest("li");
            if (0 === $("> input:hidden", $li).length) {
                $("> input", $li).hide();
                $("> div", $li).css("display", "inline-block");
            } else {
                $("> input", $li).css("display", "inline-block");
                $("> div", $li).hide();
            }
        } // menu()

        turn(event) {
            const $li = $(event.target).closest("li");
            const audio = $("audio", $li)[0];
            audio.volume = $("> div input[type=\"range\"]", $li).val() / 100.0;
        } // turn()

        speed(event) {
            const $li = $(event.target).closest("li");
            const audio = $("audio", $li)[0];
            audio.playbackRate = $("> div input[type!=\"range\"]", $li).val();
        } // speed()

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

                    const icon = "icon" in data ? data.icon
                                                : IMG_DIR + "play.svg";
                    $li.append($("<img>").attr("src", icon)
                                         .click(this.start.bind(this)));

                    $li.append($("<a>").attr({ "href":   data.link,
                                               "target": "_blank" })
                                       .text(data.title));

                    if ("desc" in data) {
                        $li.append($("<span>").html(data.desc));
                    }
                    $li.append($("<input>").attr({ "type": "range",
                                                   "min":  "0" })
                                           .on("input", this.move.bind(this)));
                    $li.append($("<audio>").attr("src", data.audio)
                                           .on("timeupdate",
                                               this.elapse.bind(this)));

                    const $div = $("<div>");
                    $div.append($("<img>").attr("src", IMG_DIR + "volume.svg"));
                    $div.append($("<input>").attr("type", "range")
                                            .on("input", this.turn.bind(this)));
                    $div.append($("<img>").attr("src", IMG_DIR + "speed.svg"));
                    $div.append($("<input>").attr("type", "text")
                                            .val("1")
                                            .on("input",
                                                this.speed.bind(this)));
                    $li.append($div);

                    $li.append($("<img>").attr("src", IMG_DIR + "menu.svg")
                                         .click(this.menu.bind(this)));

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
