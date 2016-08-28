define(["jquery", "scronpt"], function ($, Cron) {
    "use strict";

    const gates = {};

    const display = function ($root, data, empty = false) {
        $("ul", $root).append(
            $("<li>").attr("class", empty ? "empty" : "")
                     .html($("<a>").attr({ "href":   data.link,
                                           "target": "_blank",
                                           "title":  data.desc })
                                   .text(data.title)));
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
            display($root, args.empty, true);
        }
        args.scrapers.forEach(function (scraper) {
            scraper.list(args.size).then(function (items) {
                if (0 !== items.length) {
                    $(".empty", $root).remove();
                }
                for (let item of items) {
                    display($root, item);
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
            "empty":    config.empty || null,
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
