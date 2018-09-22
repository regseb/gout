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

        filter(items) {
            // S'il faut afficher les éléments déjà visités : ne rien filtrer.
            if (this.visited) {
                return Promise.resolve(items);
            }

            // Sinon, chercher si les éléments sont déjà dans l'historique.
            const researchs = items.map(function (item) {
                const query = {
                    "text":       item.link,
                    "startTime":  0,
                    "maxResults": 1
                };
                return browser.history.search(query).then(function (histories) {
                    return 0 === histories.length ? item : null;
                });
            });
            return Promise.all(researchs).then(function (research) {
                return research.filter((i) => null !== i);
            });
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
            if (pos !== this.max - 1) {
                // Supprimer le plus ancien évènement (si la liste est pleine).
                $("> ul > li:eq(" + (this.max - 1) + ")", this).remove();

                // Créer la ligne du nouvel évènement.
                const $li = $("<li>").addClass(empty ? "empty" : "")
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
                scraper.extract(that.max).then(that.filter)
                                         .then(function (items) {
                    items.forEach(that.display.bind(that));
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
            this.max = this._config.max || Number.MAX_SAFE_INTEGER;
            this.visited = this._config.visited || true;
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
