/* global app, document, $, setCron */

// TODO Dessiner le symbole de la categorie jeunesse.
// TODO Récupérer aussi les chaines disponibles par ADSL ou satellite.

(function() {
    "use strict";

    var IMG_DIR = "mod/regseb/tv/img/";
    var CHANNELS = [
        "Mosaïque", "TF1", "France 2", "France 3", "Canal+", "France 5", "M6",
        "Arte", "D8", "W9", "TMC", "NT1", "NRJ 12", "LCP-AN / Public Sénat",
        "France 4", "BFM TV", "i>Télé", "D17", "Gulli", "France Ô", "HD1",
        "L'Equipe 21", "6ter", "Numéro 23", "RMC Découverte", "Chérie 25"
    ];

    var gates = {};

    var create = function(id, url) {
        $.getJSON(url + "/config.json").then(function(args) {
            var $root = $("#" + id);
            $root.css("background-color", args.color || "#9e9e9e");

            gates[id] = {
                "channels": args.channels || {},
                "updated":  true
            };

            // Mettre à jour les données tous les jours à 1h.
            setCron(update, "0 1 * * *", id);

            if (1 === Object.keys(gates).length)
                document.addEventListener("visibilitychange", function() {
                    for (var id in gates)
                        if (gates[id].updated)
                            update(id);
                });

            update(id);
        });
    }; // create()

    var update = function(id) {
        var args = gates[id];

        // Si la page est cachée : ne pas actualiser les données et indiquer
        // qu'il faudra mettre à jour les données quand l'utilisateur reviendra
        // sur la page.
        if (document.hidden) {
            args.updated = true;
            return;
        }
        args.updated = false;

        var $root = $("#" + id);
        extract().then(function(data) {
            // FIXME Gérer intelligemment le cas d'une mise à jour.
            $("ul", $root).empty();
            for (var i in data)
                display($root, parseInt(i, 10), data[i], args.channels);
        });
    }; // update()

    var extract = function() {
        var url = "http://www.programme-television.org/";
        return $.get(url).then(function(data) {
            var progs = {};
            $("#prime-broadcasts li", data).each(function() {
                var channel = $(".logo a", this).attr("href").substr(12);
                var index;
                switch (channel) {
                    case "tf1":                     index =  1; break;
                    case "france-2":                index =  2; break;
                    case "france-3":                index =  3; break;
                    case "canal":                   index =  4; break;
                    case "france-5":                index =  5; break;
                    case "m6":                      index =  6; break;
                    case "arte":                    index =  7; break;
                    case "d8":                      index =  8; break;
                    case "w9":                      index =  9; break;
                    case "tmc":                     index = 10; break;
                    case "nt-1":                    index = 11; break;
                    case "nrj-12":                  index = 12; break;
                    case "la-chaine-parlementaire": index = 13; break;
                    case "france-4":                index = 14; break;
                    case "bfm-tv":                  index = 15; break;
                    case "i-tele":                  index = 16; break;
                    case "d17":                     index = 17; break;
                    case "gulli":                   index = 18; break;
                    case "france-o":                index = 19; break;
                    case "hd1":                     index = 20; break;
                    case "l-equipe-21":             index = 21; break;
                    case "6ter":                    index = 22; break;
                    case "numero-23":               index = 23; break;
                    case "rmc-decouverte":          index = 24; break;
                    case "cherie-25":               index = 25; break;
                    default:                        return true;
                }

                var mark = $(".texte_infos:first .picto7", this).text().length;

                var title = $.trim($(".texte_titre:first", this).text());
                var link = $(".texte_titre:first a", this).attr("href") ||
                           "http://www.programme-television.org/";

                var category;
                var type;
                if ($(".texte_cat:first a", this).length) {
                    var RE = /genres\/([^\/]+)\//;
                    category = $.trim($(".texte_cat:first a", this).text());
                    type = RE.exec($(".texte_cat:first a",
                                     this).attr("href"))[1];
                } else {
                    category = "Non-défini";
                    type = "unknown";
                }
                if ("films-telefilms" === type)
                    if (-1 !== category.indexOf("Téléfilm"))
                        type = "telefilms";
                    else
                        type = "films";

                progs[index] = {
                    "title":    title,
                    "category": category,
                    "type":     type,
                    "mark":     mark,
                    "link":     link
                };
            });
            return progs;
        });
    }; // extract()

    var display = function($root, i, data, channels) {
        if (channels.include && -1 === channels.include.indexOf(i) ||
                channels.exclude && -1 !== channels.exclude.indexOf(i))
            return;

        var $mark = $("<span>");
        for (var j = 0; j < data.mark; ++j)
            $mark.append($("<img>").attr({
                "src": IMG_DIR + "star.svg",
                "alt": "*"
            }));

        $("ul", $root).append(
            $("<li>").append($("<img>").attr({ "src": IMG_DIR + i + ".svg",
                                               "alt": CHANNELS[i],
                                               "title": CHANNELS[i] }))
                     .append($("<img>").attr({ "src": IMG_DIR + data.type +
                                                      ".svg",
                                               "alt": data.type,
                                               "title": data.category })
                     .addClass(data.type))
                     .append($mark)
                     .append($("<a>").text(data.title)
                                     .attr({ "href": data.link,
                                             "target": "_blank" })));
    }; // display()

    app.mod["regseb/tv"] = create;

})();
