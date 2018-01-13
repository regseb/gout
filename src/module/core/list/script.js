fetch("module/core/list/index.html").then(function (response) {
    return response.text();
}).then(function (data) {
    return new DOMParser().parseFromString(data, "text/html")
                          .querySelector("template");
}).then(function (template) {
    const $    = require("jquery");
    const Cron = require("scronpt");

    customElements.define("core-list", class extends HTMLElement {

        set files({ "config.json": config, "icon.svg": icon }) {
            this._config = config;
            this._icon   = icon;
        }

        set scrapers(scrapers) {
            this._scrapers = scrapers;
        }

        display(data, empty = false) {
            // Supprimer éventuellement la ligne indiquant que la liste est
            // vide.
            $("> ul > li.empty", this).remove();

            // Trouver la future position chronologique de l'évènement.
            let pos = -1;
            $("> ul > li", this).each(function (i) {
                if (data.date <= $(this).data("date")) {
                    pos = i;
                }
            });
            if (pos !== this.size - 1) {
                // Supprimer le plus ancien évènement (si la liste est pleine).
                $("> ul > li:eq(" + (this.size - 1) + ")", this).remove();

                // Créer la ligne du nouvel évènement.
                const $li = $("<li>")
                        .attr({ "data-guid": data.guid,
                                "class":     empty ? "empty" : "" })
                        .data("date", data.date);

                if ("icon" in data) {
                    $li.append($("<img>").attr("src", data.icon));
                }

                const $a = $("<a>").text(data.title)
                                   .attr("target", "_blank");
                if ("link" in data) {
                    $a.attr("href", data.link);
                }
                $li.append($a);

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

            $("ul", this).empty();
            if (null !== this.empty) {
                this.display(this.empty, true);
            }
            const that = this;
            this._scrapers.forEach(function (scraper) {
                scraper.extract(that.size).then(function (items) {
                    for (const item of items) {
                        that.display(item);
                    }
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
            this.size = this.clientHeight / 14 - 1;
            this.cron = new Cron(this._config.cron, this.update.bind(this));
            this.empty = this._config.empty || null;

            this.style.backgroundColor = this._config.color;
            if (undefined !== this._icon) {
                this.style.backgroundImage = "url(\"data:image/svg+xml;" +
                                             "base64," + btoa(this._icon) +
                                             "\")";
            }

            document.addEventListener("visibilitychange", this.wake.bind(this));
            this.update();
        }
    });
});
