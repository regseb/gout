define(["require", "jquery", "scronpt"], function (require, $, Cron) {
    "use strict";

    const gates = {};

    const refresh = function ($root) {
        if ("0px" === $("ul", $root).css("left")) {
            $("span:first", $root).css("cursor", "not-allowed");
        } else {
            $("span:first", $root).css("cursor", "pointer");
        }

        if (-1 * $root.width() * ($("li", $root).length - 1) + "px" ===
                $("ul", $root).css("left")) {
            $("span:last", $root).css("cursor", "not-allowed");
        } else {
            $("span:last", $root).css("cursor", "pointer");
        }
    }; // refresh()

    const prev = function () {
        const $root = $(this).closest("article");

        if ("0px" !== $("ul", $root).css("left")) {
            $("ul", $root).css("left",
                               parseInt($("ul", $root).css("left"), 10) +
                               parseInt($root.css("width"), 10));
            refresh($root);
        }
    }; // prev()

    const next = function () {
        const $root = $(this).closest("article");

        if (-1 * $root.width() * ($("li", $root).length - 1) + "px" !==
                $("ul", $root).css("left")) {
            $("ul", $root).css("left",
                               parseInt($("ul", $root).css("left"), 10) -
                               parseInt($root.css("width"), 10));
            refresh($root);
        }
    }; // next()

    const display = function ($root, data, size) {
        let $li = $("li[data-guid=\"" + data.guid + "\"]", $root);

        if (!$li.length) { // Si l'évènement n'est pas affiché.
            // Trouver la future position chronologique de l'évènement.
            let pos = -1;
            $("> ul > li", $root).each(function (i) {
                if (data.date <= $(this).data("date")) {
                    pos = i;
                }
            });
            if (pos !== size - 1) {
                // Supprimer le plus ancien évènement (si la liste est pleine).
                $("> ul > li:eq(" + (size - 1) + ")", $root).remove();

                // Créer la ligne du nouvel évènement.
                const $a = $("<a>").attr({ "href":   data.link,
                                           "target": "_blank",
                                           "title":  data.title })
                                   .css("background-image",
                                        "url(\"" + data.img + "\")");
                $li = $("<li>").attr("data-guid", data.guid)
                               .data("date", data.date)
                               .height($root.height())
                               .width($root.width())
                               .append($a);

                if (-1 === pos) {
                    $("> ul", $root).prepend($li);
                } else {
                    $("> ul > li:eq(" + pos + ")", $root).after($li);
                }
            }
        } else { // Si l'évènement est déjà affiché.
            // Si des éléments de l'évènement ont changé, les mettre à jour.
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
    }; // display()

    const update = function (id) {
        const args = gates[id];

        // Si la page est cachée : ne pas actualiser les données et indiquer
        // qu'il faudra mettre à jour les données quand l'utilisateur reviendra
        // sur la page.
        if (document.hidden) {
            args.cron.stop();
            return;
        }
        args.cron.start();

        const $root = $("#" + id);
        args.scrapers.forEach(function (scraper) {
            scraper.list(args.size).then(function (items) {
                for (let item of items) {
                    display($root, item, args.size);
                }
                refresh($root);
            });
        });
    }; // update()

    const create = function (id, url, config, scrapers) {
        const $root = $("#" + id);
        $("ul", $root).width($root.width() * config.size);
        $("span:first", $root).click(prev);
        $("span:last",  $root).click(next);

        gates[id] = {
            "scrapers": scrapers,
            "size":     config.size,
            "cron":     new Cron(config.cron, update, id)
        };

        if (1 === Object.keys(gates).length) {
            document.addEventListener("visibilitychange", function () {
                for (let id in gates) {
                    if (!gates[id].cron.status()) {
                        update(id);
                    }
                }
            });
        }

        update(id);
    }; // create()

    return create;
});
