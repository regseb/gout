define(["jquery", "scronpt"], function ($, Cron) {
    "use strict";

    const gates = {};

    const display = function ($root, data, size) {
        let $li = $("li[data-guid=\"" + data.guid + "\"]", $root);

        if (0 === $li.length) { // Si l'évènement n'est pas affiché.
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
                $li = $("<li>").attr("data-guid", data.guid)
                               .data("date", data.date)
                               .append($("<a>").attr({ "href":   data.link,
                                                       "target": "_blank" })
                                               .text(data.title));
                if ("" !== data.desc) {
                    $li.append($("<span>").html(data.desc));
                }

                if (-1 === pos) {
                    $("> ul", $root).prepend($li).fadeIn("slow");
                } else {
                    $("> ul > li:eq(" + pos + ")", $root).after($li)
                                                         .fadeIn("slow");
                }
            }
        } else { // Si l'évènement est déjà affiché.
            // Si des éléments de l'évènement ont changé, les mettre à jour.
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
            });
        });
    }; // update()

    const create = function (id, url, config, scrapers) {
        const $root = $("#" + id);
        $root.css({
            "background-color": config.color,
            "background-image": "url(\"" + url + "/icon.svg\")"
        });

        gates[id] = {
            "scrapers": scrapers,
            "size":     $root.height() / 14 - 1,
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
