/* @flow */
/* global document, define */

define(["jquery", "scronpt"], function ($, Cron) {
    "use strict";

    const IMG_DIR = "mod/regseb/tele2semaines/img/";
    const CHANNELS = [
        "Mosaïque", "TF1", "France 2", "France 3", "Canal+", "France 5", "M6",
        "Arte", "D8", "W9", "TMC", "NT1", "NRJ 12", "LCP-AN / Public Sénat",
        "France 4", "BFM TV", "i>Télé", "D17", "Gulli", "France Ô", "HD1",
        "L'Equipe 21", "6ter", "Numéro 23", "RMC Découverte", "Chérie 25"
    ];

    var gates = {};

    var create = function (id, url) {
        $.getJSON(url + "/config.json").then(function (args) {
            var $root = $("#" + id);
            $root.css("background-color", args.color || "#9e9e9e");

            gates[id] = {
                "channels": args.channels || {},
                // Mettre à jour les données tous les jours à 1h.
                "cron": new Cron("0 1 * * *", update, id)
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
        extract(args.channels).then(function (items) {
            $("ul", $root).empty();
            for (var index in items)
                display($root, parseInt(index, 10), items[index]);
        });
    }; // update()

    var extract = function (channels) {
        var url = "http://www.programme.tv/";
        return $.get(url).then(function (data) {
            var progs = {};
            $("#programs li", data).each(function () {
                var channel = $(".bheader img", this).attr("alt").substr(10);
                var index;
                switch (channel) {
                    case "TF1":                index =  1; break;
                    case "France 2":           index =  2; break;
                    case "France 3":           index =  3; break;
                    case "Canal+":             index =  4; break;
                    case "France 5":           index =  5; break;
                    case "M6":                 index =  6; break;
                    case "Arte":               index =  7; break;
                    case "D8":                 index =  8; break;
                    case "W9":                 index =  9; break;
                    case "TMC":                index = 10; break;
                    case "NT1":                index = 11; break;
                    case "NRJ 12":             index = 12; break;
                    case "LCP - Public Senat": index = 13; break;
                    case "France 4":           index = 14; break;
                    case "BFM TV":             index = 15; break;
                    case "itele":              index = 16; break;
                    case "D17":                index = 17; break;
                    case "Gulli":              index = 18; break;
                    case "France Ô":           index = 19; break;
                    case "HD1":                index = 20; break;
                    case "L'Equipe 21":        index = 21; break;
                    case "6ter":               index = 22; break;
                    case "Numéro 23":          index = 23; break;
                    case "RMC Découverte":     index = 24; break;
                    case "Chérie 25":          index = 25; break;
                    default:                   return true;
                }
                if (channels.include &&
                        -1 === channels.include.indexOf(index) ||
                        channels.exclude &&
                        -1 !== channels.exclude.indexOf(index))
                    return true;

                var title = $("h2 a", this).text();
                var link = "http://www.programme.tv" +
                           $("h2 a", this).attr("href");
                // S'il n'y a pas de lien vers la fiche.
                if ("" === title) {
                    title = $.trim($("h2", this).text());
                    link = "http://www.programme.tv";
                }
                var desc = $(".resume", this).text();
                var type = $(".type", this).attr("class").substr(5);

                var mark;
                switch ($(".score", this).attr("class")) {
                    case "score score1": mark = 0; break;
                    case "score score2": mark = 1; break;
                    case "score score3": mark = 2; break;
                    case "score score4": mark = 3; break;
                    default:             mark = 0;
                }

                progs[index] = {
                    "title": title,
                    "link":  link,
                    "desc":  desc,
                    "type":  type,
                    "mark":  mark
                };
            });
            return progs;
        });
    }; // extract()

    var display = function ($root, i, data) {
        var $mark = $("<span>");
        for (var j = 0; j < data.mark; ++j)
            $mark.append($("<img>").attr({
                "src": IMG_DIR + "star.svg",
                "alt": "*"
            }));

        $("ul", $root).append(
            $("<li>").append($("<img>").attr({ "src":   IMG_DIR + i + ".svg",
                                               "alt":   CHANNELS[i],
                                               "title": CHANNELS[i] }))
                     .append($("<img>").attr({ "src": IMG_DIR + data.type +
                                                      ".svg",
                                               "alt": data.type })
                                       .addClass(data.type))
                     .append($mark)
                     .append($("<a>").text(data.title)
                                     .attr({ "href":   data.link,
                                             "target": "_blank" }))
                     .append($("<div>").html(data.desc)));
    }; // display()

    return create;

});
