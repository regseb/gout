define(["jquery", "scronpt"], function ($, Cron) {
    "use strict";

    const gates = {};

    const display = function ($root, data) {
        $("a", $root).attr("href", data.link)
                     .html(data.title);
        if (null === data.desc) {
            $("span", $root).hide();
        } else {
            $("span", $root).html(data.desc)
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
        args.scraper.get().then(function (data) {
            display($root, data);
        });
    }; // update()

    const create = function (id, url, config, scrapers) {
        const $root = $("#" + id);
        $root.css({
            "background-color": config.color,
            "background-image": "url(\"" + url + "/icon.svg\")"
        });

        gates[id] = {
            "scraper": scrapers[0],
            "cron": new Cron(config.cron, update, id)
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
