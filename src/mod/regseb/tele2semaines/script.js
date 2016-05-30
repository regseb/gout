define(["jquery", "scronpt"], function ($, Cron) {
    "use strict";

    const IMG_DIR = "mod/regseb/tele2semaines/img/";

    const gates = {};

    const deobfuscate = function (clazz) {
        const LUT = "0A12B34C56D78E9F";
        // Récupérer la deuxième "classe" de l'élément (la première contient
        // "encodedLinks").
        const coded = clazz.split(" ")[1];
        let plain = "";
        for (let i = 0; i < coded.length; i += 2) {
            plain += String.fromCharCode(LUT.indexOf(coded.charAt(i)) * 16 +
                                         LUT.indexOf(coded.charAt(i + 1)));
        }
        return plain;
    }; // deobfuscate()

    const extract = function (broadcasts) {
        const promises = [];
        $.each(broadcasts, function (broadcast, channels) {
            const url = "http://www.programme.tv/" + broadcast + "/";
            const promise = $.get(url).then(function (data) {
                return channels.map(function (channel) {
                    const $channel = $("#programs a[href$=\"-" + channel +
                                       "/\"]", data);
                    const name = $channel.attr("title").substr(10);

                    const $show = $channel.closest("li");
                    const title = $.trim($("h2", $show).text());
                    const subtitle = $.trim($(".subtitle", $show).text());
                    const link = "http://www.programme.tv" +
                                 deobfuscate($(".encodedLinks",
                                               $show).attr("class"));
                    const desc = $.trim($(".resume", $show).text());

                    const category = $(".type", $show).text();
                    const type = $(".type", $show).attr("class").substr(5);

                    let mark;
                    switch ($(".score", $show).attr("class").substr(11)) {
                        case "0": case "1": mark = 0; break;
                        case "2":           mark = 1; break;
                        case "3":           mark = 2; break;
                        case "4":           mark = 3; break;
                        case "5":           mark = 4; break;
                        default:            mark = 0;
                    }

                    return {
                        "channel":  channel,
                        "name":     name,
                        "title":    title,
                        "subtitle": subtitle,
                        "link":     link,
                        "desc":     desc,
                        "category": category,
                        "type":     type,
                        "mark":     mark
                    };
                });
            });
            promises.push(promise);
        });
        return Promise.all(promises).then (function (broadcasts) {
            return broadcasts.reduce(function (previous, current) {
                return previous.concat(current);
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
        extract(args.broadcasts).then(function (items) {
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
                "broadcasts": args.channels,
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
