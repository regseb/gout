fetch("module/core/search/index.html").then(function (response) {
    return response.text();
}).then(function (data) {
    return new DOMParser().parseFromString(data, "text/html")
                          .querySelector("template");
}).then(function (template) {
    const $ = require("jquery");

    customElements.define("core-search", class extends HTMLElement {

        set scrapers(scrapers) {
            this._scrapers = scrapers;
        }

        search() {
            const that = this;
            this._scraper.result($("input", this).val()).then(function (url) {
                // Ouvrir le résultat de la recherche dans un nouvel onglet.
                window.open(url);
                $("input", that).val("").blur();
                $("datalist", that).empty();
            });
            return false;
        }

        propose() {
            // Afficher la liste des moteurs de recherche.
            $("ul", this).show();
        }

        change(event) {
            // Cacher la liste des moteurs de recherche.
            $("ul", this).hide();

            // Mettre à jour le formulaire.
            const $li = $(event.target).closest("li");
            this._scraper = this._scrapers[parseInt($li.attr("data-index"),
                                                    10)];
            $(this).css("background-color", $li.attr("data-color"));
            $("form img", this).attr("src", $("img", $li).attr("src"));
            $("input", this).attr("placeholder", $li.text());
            $("input", this).attr("title", $li.attr("title"));
            $("datalist", this).empty();
        }

        suggest() {
            const that = this;
            const terms = $("input", this).val();
            this._scraper.suggest(terms).then(function (suggestions) {
                const $datalist = $("datalist", that);
                $datalist.empty();
                for (const suggestion of suggestions) {
                    $datalist.append($("<option>").text(suggestion));
                }
            });
        }

        display(i, data) {
            const $li = $("<li>");
            $li.attr({ "data-index": i,
                       "data-color": data.color })
               .append($("<img>").attr("src", data.icon))
               .append(data.title)
               .click(this.change.bind(this));

            if ("desc" in data) {
                $li.attr("title", data.desc);
            }

            $("ul", this).append($li);
        }

        connectedCallback() {
            this.appendChild(template.content.cloneNode(true));
            const height = parseInt(this.style.height, 10);
            const width  = parseInt(this.style.width,  10);
            $("form", this).submit(this.search.bind(this));
            $("img", this).width(height - 14)
                          .height(height - 14)
                          .click(this.propose.bind(this));
            $("input", this).width(width - height - 7)
                            .height(height - 15)
                            .on("input", this.suggest.bind(this));

            const that = this;
            Promise.all(this._scrapers.map((s) => s.info())).then(
                                                              function (infos) {
                for (const [i, info] of infos.entries()) {
                    that.display(i, info);
                }

                // Sélectionner le premier élément.
                $("li:first", that).click();
            });
        }
    });
});
