define(["jquery", "scronpt"], function ($, Cron) {
    "use strict";

    const gates = {};

    const display = function ($root, data) {
        $root.css("background-color", data.color);
        $("> a", $root).attr("href", data.link);
        $("> a img", $root).attr("src", data.icon);
        if (!("desc" in data) || null === data.desc || "" === data.desc) {
            $("> span", $root).hide();
        } else {
            $("> span", $root).html(data.desc)
                              .show();
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
        args.scraper.extract().then(function (data) {
            display($root, data);
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
        gates[id] = {
            "scraper": scrapers[0],
            "cron":    new Cron(config.cron || "0 0 1 1 0", update, id)
        };

        if (1 === Object.keys(gates).length) {
            document.addEventListener("visibilitychange", wake);
        }

        update(id);
    }; // create()

    return create;
});
