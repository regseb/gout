/* global document, define */

define(["jquery", "scronpt"], function ($, Cron) {
    "use strict";

    const gates = {};

    const extract = function (share) {
        const url = "https://finance.yahoo.com/webservice/v1/symbols/" + share +
                    "/quote?view=detail&format=json";
        // Ne pas utiliser le fonction getJSON() car le serveur de Yahoo ne
        // retourne pas l'entête HTTP : "Access-Control-Allow-Origin".
        return $.get(url).then(function (data) {
            const fields = data.list.resources[0].resource.fields;
            return {
                "name":   fields["issuer_name"],
                "price":  parseFloat(fields.price),
                "change": parseFloat(fields.change)
            };
        });
    }; // extract()

    const display = function ($root, data) {
        $("a", $root).attr("title", data.name)
                     .text(data.price.toFixed(2) + " (" +
                           (0 < data.change ? "" : "+") +
                           data.change.toFixed(2) + " %)");
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
        extract(args.share).then(function (data) {
            display($root, data);
        });
    }; // update()

    const create = function (id, url) {
        $.getJSON(url + "/config.json").then(function (args) {
            const $root = $("#" + id);
            $root.css({
                "background-color": args.color,
                "background-image": "url(\"" + url + "/icon.svg\")"
            });
            $("a", $root).attr("href", "https://" + (args.lang || "fr") +
                                       ".finance.yahoo.com/q?s=" + args.share);

            gates[id] = {
                "share": args.share,
                // Par défaut, mettre à jour toutes les cinq minutes.
                "cron": new Cron(args.cron || "*/5 * * * *", update, id)
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
