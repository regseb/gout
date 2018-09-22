fetch("module/core/image/index.html").then(function (response) {
    return response.text();
}).then(function (data) {
    return new DOMParser().parseFromString(data, "text/html")
                          .querySelector("template");
}).then(function (template) {
    const $    = require("jquery");
    const Cron = require("scronpt");

    customElements.define("core-image", class extends HTMLElement {

        set files({ "config.json": config }) {
            this._config = config;
        }

        set scrapers(scrapers) {
            this._scrapers = scrapers;
        }

        refresh() {
            $("li", this).hide();
            $("li:eq(" + this.index + ")", this).show();
            if (0 === this.index) {
                $("span:first", this).css("cursor", "not-allowed");
            } else {
                $("span:first", this).css("cursor", "pointer");
            }

            if ($("li", this).length - 1 === this.index) {
                $("span:last", this).css("cursor", "not-allowed");
            } else {
                $("span:last", this).css("cursor", "pointer");
            }
        }

        prev() {
            if (0 !== this.index) {
                --this.index;
                this.refresh();
            }
        }

        next() {
            if ($("li", this).length - 1 !== this.index) {
                ++this.index;
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
                if (pos !== this.max - 1) {
                    // Supprimer la plus ancienne image (si la liste est
                    // pleine).
                    $("> ul > li:eq(" + (this.max - 1) + ")", this).remove();

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
            this._scrapers.forEach(function (scraper) {
                scraper.extract(that.max).then(function (items) {
                    items.forEach(that.display.bind(that));
                    that.index = 0;
                    that.refresh();
                });
            });
        }

        wake() {
            if (!this.cron.status()) {
                this.update();
            }
        }

        connectedCallback() {
            this.appendChild(template.content.cloneNode(true));
            this.cron = new Cron(this._config.cron, this.update.bind(this));
            this.max = this._config.max || 1;
            this.index = 0;

            if (1 === this.max) {
                $("span", this).remove();
            } else {
                $("span:first", this).click(this.prev.bind(this));
                $("span:last",  this).click(this.next.bind(this));
            }

            document.addEventListener("visibilitychange", this.wake.bind(this));
            this.update();
        }
    });
});
