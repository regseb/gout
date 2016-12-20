define(["jquery", "scronpt"], function ($, Cron) {
    "use strict";

    const gates = {};

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
            $("p", $root).html(Array.isArray(data) ? data.join("") : data);
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
            "background-color": config.color || "black",
            "background-image": "url(\"data:image/svg+xml;base64," +
                                btoa(icon) + "\")"
        });
        $("p", $root).css("text-align", config.align || "left");

        gates[id] = {
            "scraper": scrapers[0],
            "cron":    new Cron(config.cron, update, id)
        };

        if (1 === Object.keys(gates).length) {
            document.addEventListener("visibilitychange", wake);
        }

        update(id);
    }; // create()

    return create;
});
