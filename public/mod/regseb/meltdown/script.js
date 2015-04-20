/* @flow */
/* global document, Promise, define */

define(["jquery", "scronpt"], function ($, Cron) {
    "use strict";

    var gates = {};

    var create = function (id, url) {
        $.getJSON(url + "/config.json").then(function (args) {
            var $root = $("#" + id);
            $root.css("background-color", args.color || "#4caf50");
            $("a", $root).attr("href", "http://www.meltdown.bar/" + args.city +
                                       "/planning");

            gates[id] = {
                "city": args.city,
                // Par défaut, mettre à jour chaque matin à 6h.
                "cron": new Cron(args.cron || "0 6 * * *", update, id)
            };

            if (1 === Object.keys(gates).length)
                document.addEventListener("visibilitychange", function () {
                    for (var id in gates)
                        if (!gates[id].cron.status())
                            update(id);
                });

            update(id);
        });
    }; // create()

    var update = function (id) {
        var args = gates[id];

        // Si la page est cachée : ne pas actualiser les données et indiquer
        // qu'il faudra mettre à jour les données quand l'utilisateur reviendra
        // sur la page.
        if (document.hidden) {
            args.cron.stop();
            return;
        }
        args.cron.start();

        var $root = $("#" + id);
        extract(args.city).then(function (data) {
            display($root, data);
        });
    }; // update()

    var extract = function (city) {
        var url = "http://www.meltdown.bar/" + city + "/planning";
        return $.get(url).then(function (data) {
            var $data = $("#event-detail_0 .event-detail:first", data);

            return {
                "title": $("h3", $data).text(),
                "desc":  $(".event-detail-text", $data).html(),
            };
        });
    }; // extract()

    var display = function ($root, data) {
        $("a", $root).text(data.title);
        $("span", $root).html(data.desc);
    }; // display()

    return create;

});
