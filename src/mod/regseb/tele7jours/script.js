/* global document, define */

define(["jquery", "scronpt"], function ($, Cron) {
    "use strict";

    const IMG_DIR = "mod/regseb/tele7jours/img/";

    const gates = {};

    const extract = function (broadcast, channels) {
        const url = "http://www.programme-television.org/?bouquet=" + broadcast;
        return $.get(url).then(function (data) {
            return channels.map(function (channel) {
                const $channel = $("#prime-broadcasts em" +
                                   "a[href=\"/chaines-tv/" + channel + "\"]",
                                   data);
                const name = $channel.text().substr(10);

                const $show = $channel.parent().parent().next();
                const title = $.trim($("a:first", $show).text());
                const subtitle = $(".texte_description", $show).text();
                const link = "http://www.programme-television.org" +
                             $("a:first", $show).attr("href");

                const category = $(".texte_cat a", $show).text();
                const RE = /genres\/([^\/]+)\//;
                let type = RE.exec($(".texte_cat a", $show).attr("href"))[1];
                if ("films-telefilms" === type) {
                    type = -1 !== category.indexOf("Téléfilm") ? "telefilms"
                                                               : "films";
                }

                const mark = $(".texte_infos .picto7", $show).text().length;

                return {
                    "channel":  channel,
                    "name":     name,
                    "title":    title,
                    "subtitle": subtitle,
                    "link":     link,
                    "category": category,
                    "type":     type,
                    "mark":     mark
                };
            });
        });
    }; // extract()

    const display = function ($root, data) {
        const $mark = $("<span>");
        for (let i = 0; i < data.mark; ++i) {
            $mark.append($("<img>").attr({
                "src": IMG_DIR + "star.svg",
                "alt": "*"
            }));
        }
        const text = data.title + ("" !== data.subtitle ? " - " + data.subtitle
                                                        : "");

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
                                             "target": "_blank" })));
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
        extract(args.broadcast, args.channels).then(function (items) {
            $("ul", $root).empty();
            for (let item of items) {
                display($root, item);
            }
        });
    }; // update()

    const create = function (id, url) {
        $.getJSON(url + "/config.json").then(function (args) {
            const $root = $("#" + id);
            $root.css("background-color", args.color || "#9e9e9e");

            gates[id] = {
                "broadcast": args.broadcast || "tnt",
                "channels":  args.channels,
                // Mettre à jour les données tous les jours à 1h.
                "cron": new Cron("0 1 * * *", update, id)
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
