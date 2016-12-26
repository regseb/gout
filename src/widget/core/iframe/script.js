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
        $("iframe", $root).attr("src", $("iframe", $root).attr("src"));
    }; // update()

    const wake = function () {
        for (let id in gates) {
            if (!gates[id].cron.status()) {
                update(id);
            }
        }
    }; // wake()

    const create = function (id, { "config.json": config }) {
        const $root = $("#" + id);
        $("iframe", $root).attr({ "src":    config.url,
                                  "width":  $root.width(),
                                  "height": $root.height() });

        gates[id] = {
            "cron": new Cron(config.cron || "0 0 1 1 0", update, id)
        };

        if (1 === Object.keys(gates).length) {
            document.addEventListener("visibilitychange", wake);
        }
    }; // create()

    return create;
});
