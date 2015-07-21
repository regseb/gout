/* global document, define */

define(["jquery", "scronpt"], function ($, Cron) {
    "use strict";

    var gates = {};

    var create = function (id, url) {
        $.getJSON(url + "/config.json").then(function (args) {
            var $root = $("#" + id);
            $root.css("background-color", args.color || "#795548");
            $("a", $root).attr("href",
                               "https://secure.worldcommunitygrid.org/stat/" +
                               "viewMemberInfo.do?userName=" + args.user);

            gates[id] = {
                "user": args.user,
                // Par défaut, mettre à jour les données tous les jours à 1h.
                "cron": new Cron(args.cron || "0 1 * * *", update, id)
            };

            if (1 === Object.keys(gates).length) {
                document.addEventListener("visibilitychange", function () {
                    for (var id in gates) {
                        if (!gates[id].cron.status()) {
                            update(id);
                        }
                    }
                });
            }

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
        extract(args.user).then(function (data) {
            display($root, data);
        });
    }; // update()

    var extract = function (user) {
        var url = "http://www.worldcommunitygrid.org/getDynamicImage.do" +
                  "?memberName=" + user + "&stat=1&rankOn=true&language=fr_FR";
        return $.get(url).then(function (data) {
            return {
                "points": /\t([^\t&]+)&#160;Points/.exec(data)[1],
                "rank": /\(Rang :&#160;&#35;([^(]+)\)/.exec(data)[1]
            };
        });
    }; // extract()

    var display = function ($root, data) {
        $("strong", $root).text(data.points);
        $("em", $root).text(data.rank);
    }; // display()

    return create;

});
