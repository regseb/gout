define(["jquery", "scronpt"], function ($, Cron) {
    "use strict";

    const IMG_DIR = "widget/regseb/tv/img/";

    const gates = {};

    const display = function ($root, data) {
        const $mark = $("<span>");
        for (let i = 0; i < data.mark; ++i) {
            $mark.append($("<img>").attr({
                "src": IMG_DIR + "star.svg",
                "alt": "*"
            }));
        }
        const text = data.title +
                     ("" === data.subtitle ? ""
                                           : " - " + data.subtitle);

        $("ul", $root).append(
            $("<li>").append($("<img>").attr({ "src":   IMG_DIR + data.channel +
                                                        ".svg",
                                               "alt":   data.name,
                                               "title": data.name }))
                     .append($("<img>").attr({ "src":   IMG_DIR + data.type +
                                                        ".svg",
                                               "alt":   data.type,
                                               "title": data.category })
                                       .addClass(data.type))
                     .append($mark)
                     .append($("<a>").text(text)
                                     .attr({ "href":   data.link,
                                             "target": "_blank",
                                             "title":  data.desc })));
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
        args.scraper.extract().then(function (items) {
            $("ul", $root).empty();
            for (let item of items) {
                display($root, item);
            }
        });
    }; // update()

    const wake = function () {
        for (let id in gates) {
            if (!gates[id].cron.status()) {
                update(id);
            }
        }
    }; // wake()

    const create = function (id, { "config.json": config }, scrapers) {
        const $root = $("#" + id);
        $root.css("background-color", config.color || "#9e9e9e");

        gates[id] = {
            "scraper": scrapers[0],
            // Mettre à jour les données tous les jours à 1h.
            "cron":    new Cron("0 1 * * *", update, id)
        };

        if (1 === Object.keys(gates).length) {
            document.addEventListener("visibilitychange", wake);
        }

        update(id);
    }; // create()

    return create;
});
