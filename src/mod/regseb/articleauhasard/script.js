/* global document, define */

define(["jquery", "scronpt"], function ($, Cron) {
    "use strict";

    const gates = {};

    const extract = function (lang) {
        const url = "http://" + lang + ".wikipedia.org/w/api.php?action=query" +
                    "&list=random&rnnamespace=0&format=json&callback=?";
        return $.getJSON(url).then(function (data) {
            return {
                "title": data.query.random[0].title,
                "link":  "http://" + lang + ".wikipedia.org/wiki/" +
                         data.query.random[0].title
            };
        });
    }; // extract()

    const display = function ($root, data) {
        $("a", $root).attr("href", data.link)
                     .text(data.title);
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
        extract(args.lang).then(function (data) {
            display($root, data);
        });
    }; // update()

    const create = function (id, url) {
        $.getJSON(url + "/config.json").then(function (args) {
            const $root = $("#" + id);
            $root.css("background-color", args.color || "#607d8b");

            gates[id] = {
                "lang": args.lang || "fr",
                "cron": new Cron(args.cron || "0 * * * *", update, id)
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
        });
    }; // create()

    return create;
});
