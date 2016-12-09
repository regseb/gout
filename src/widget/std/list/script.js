define(["jquery", "scronpt"], function ($, Cron) {
    "use strict";

    const gates = {};

    const display = function ($root, data, size, empty = false) {
        // Supprimer éventuellement la ligne indiquant que la liste est vide.
        $("> ul > li.empty", $root).remove();

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
            const $li = $("<li>").attr({ "data-guid": data.guid,
                                         "class":     empty ? "empty" : "" })
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
                $("> ul > li:eq(" + pos + ")", $root).after($li).fadeIn("slow");
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
        $("ul", $root).empty();
        if (null !== args.empty) {
            display($root, args.empty, args.size, true);
        }
        args.scrapers.forEach(function (scraper) {
            scraper.extract(args.size).then(function (items) {
                for (let item of items) {
                    display($root, item, args.size);
                }
            });
        });
    }; // update()

    const wake = function () {
        for (let id in gates) {
            if (!gates[id].cron.status()) {
                update(id);
            }
        }
    }; // wake()

    const create = function (id, { "config.json": config, "icon.svg": icon },
                             scrapers) {
        const $root = $("#" + id);
        $root.css({
            "background-color": config.color,
            "background-image": "url(\"data:image/svg+xml;base64," +
                                btoa(icon) + "\")"
        });

        gates[id] = {
            "scrapers": scrapers,
            "empty":    config.empty || null,
            "size":     $root.height() / 14 - 1,
            "cron":     new Cron(config.cron, update, id)
        };

        if (1 === Object.keys(gates).length) {
            document.addEventListener("visibilitychange", wake);
        }

        update(id);
    }; // create()

    return create;
});
