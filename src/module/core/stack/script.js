fetch("module/core/stack/index.html").then(function (response) {
    return response.text();
}).then(function (data) {
    return new DOMParser().parseFromString(data, "text/html")
                          .querySelector("template");
}).then(function (template) {
    const $    = require("jquery");
    const Cron = require("scronpt");

    const STORAGE_KEY = location.search + "module/code/stack/";
    const IMG_DIR = "module/core/stack/img/";

    customElements.define("core-stack", class extends HTMLElement {

        set files({ "config.json": config, "icon.svg": icon }) {
            this._config = config;
            this._icon   = icon;
        }

        set scrapers(scrapers) {
            this._scrapers = scrapers;
        }

        save() {
            localStorage.setItem(STORAGE_KEY + this.id, JSON.stringify({
                "items":   this.items,
                "hiddens": this.hiddens
            }));
        }

        filter(item) {
            return !this.hiddens.some((hidden) => hidden === item.guid);
        }

        hide(event) {
            const $li = $(event.target).closest("li");
            const guid = $li.attr("data-guid");
            this.items = this.items.filter((item) => guid !== item.guid);
            this.hiddens.push(guid);
            this.save();
            $li.remove();
        }

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
                if (pos !== this.max - 1) {
                    this.items.push(data);
                    this.save();

                    // Supprimer le plus ancien évènement (si la liste est
                    // pleine).
                    $("> ul > li:eq(" + (this.max - 1) + ")", this).remove();

                    // Créer la ligne du nouvel évènement.
                    $li = $("<li>").attr("data-guid", data.guid)
                                   .data("date", data.date);

                    const icon = "icon" in data ? data.icon
                                                : IMG_DIR + "hide.svg";
                    $li.append($("<img>").attr({ "src":   icon,
                                                 "title": "Cacher" })
                                         .click(this.hide.bind(this)));

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
                    items.filter(that.filter.bind(that))
                         .forEach(that.display.bind(that));
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

            this.style.backgroundColor = this._config.color;
            if (undefined !== this._icon) {
                this.style.backgroundImage = "url(\"data:image/svg+xml;" +
                                             "base64," + btoa(this._icon) +
                                             "\")";
            }

            const value = localStorage.getItem(STORAGE_KEY + this.id);
            if (null === value) {
                this.items   = [];
                this.hiddens = [];
            } else {
                const storage = JSON.parse(value);
                this.items   = storage.items;
                this.hiddens = storage.hiddens;
            }
            this.items.forEach(this.display.bind(this));

            document.addEventListener("visibilitychange", this.wake.bind(this));
            this.update();
        }
    });
});
