/* global app, document, $, setCron */

(function() {
    "use strict";

    var IMG_DIR = "mod/regseb/om/img/";
    var TOURNAMENTS = {
        "?":  { "img": "unknown",             "name": "Inconnue" },
        "11": { "img": "ligue1",              "name": "Ligue 1" },
        "12": { "img": "amical",              "name": "Amical" },
        "13": { "img": "coupedefrance",       "name": "Coupe de France" },
        "14": { "img": "coupedelaligue",      "name": "Coupe de la Ligue" },
        "15": { "img": "liguedeschampions",   "name": "Ligue des Champions" },
        "16": { "img": "ligueeuropa",         "name": "Ligue Europa" },
        "20": { "img": "tropheedeschampions", "name": "Trophée des Champions" }
    };
    var CHANNELS = {
        "?":  { "img": "unknown",         "name": "Inconnue" },
        "1":  { "img": "canal",           "name": "Canal+" },
        "2":  { "img": "plussport",       "name": "+Sport" },
        "3":  { "img": "footplus",        "name": "Foot+" },
        "4":  { "img": "tf1",             "name": "TF1" },
        "5":  { "img": "france2",         "name": "France 2" },
        "6":  { "img": "france3",         "name": "France 3" },
        "7":  { "img": "france4",         "name": "France 4" },
        "8":  { "img": "france5",         "name": "France 5" },
        "9":  { "img": "m6",              "name": "M6" },
        "10": { "img": "d8",              "name": "D8" },
        "11": { "img": "eurosport",       "name": "Eurosport" },
        "12": { "img": "orangesport",     "name": "Orange sport" },
        "13": { "img": "cfoot",           "name": "CFOOT" },
        "14": { "img": "sportplus",       "name": "Sport +" },
        "15": { "img": "tmc",             "name": "TMC" },
        "16": { "img": "nt1",             "name": "NT1" },
        "17": { "img": "w9",              "name": "W9" },
        "18": { "img": "bein1",           "name": "Bein Sport 1" },
        "19": { "img": "bein1_canal",     "name": "Bein Sport 1 / Canal+" },
        "20": { "img": "bein2",           "name": "Bein Sport 2" },
        "21": { "img": "beinmax",         "name": "Bein Sport Max" },
        "22": { "img": "bein2max",        "name": "Bein Sport 2 / Max" },
        "23": { "img": "bein1max",        "name": "Bein Sport 1 / Max" },
        "24": { "img": "bein1_plussport", "name": "Bein Sport 1 / + Sport" }
    };

    var gates = {};

    var create = function(id, url) {
        $.getJSON(url + "/config.json").then(function(args) {
            var $root = $("#" + id);
            $root.css("background-color", args.color || "#03a9f4");

            gates[id] = {
                "updated": true
            };

            // Par défaut, mettre à jour tous les matins à 7h.
            setCron(update, args.cron || "0 7 * * *", id);

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
            display($root, data);
        });
    }; // update()

    var extract = function() {
        var url = "http://www.om.net/fr/Saison/102001/Calendrier_Resultats";
        return $.get(url).then(function(data) {
            var $last = $("#calendar-last-match", data);
            var last = {
                "link": "http://www.om.net" + $("a:first", $last).attr("href"),
                "tournament": extractId($(".competition img:first", $last)),
                "score": $(".competition span", $last).text(),
                "desc": $(".container p", $last).html()
            };

            var $next = $("#calendar-next-match", data);
            var next = null;
            if ($("a", $next).length)
                next = {
                    "link": "http://www.om.net" +
                            $("a:first", $next).attr("href"),
                    "tournament": extractId($(".competition img:first", $next)),
                    "teams": $("h2", $next).text(),
                    "date": new Date($("time", $next).attr("datetime")),
                    "channel": extractId($(".tv img", $next))
                };

            return {
                "last": last,
                "next": next
            };
        });
    }; // extract()

    var extractId = function($img) {
        return 0 !== $img.length ? /\/([0-9]+)\.png$/.exec($img.attr("src"))[1]
                                 : "?";
    }; // extractId()

    var display = function($root, data) {
        // Afficher le dernier match joué.
        var $last = $("p:first", $root);
        var tournament = TOURNAMENTS[data.last.tournament];
        $("img", $last).attr({ "src": IMG_DIR + tournament.img + ".svg",
                               "alt": tournament.name,
                               "title": tournament.name });
        $("a", $last).text(data.last.score)
                     .attr({ "href": data.last.link,
                             "title": data.last.desc });

        // Afficher l'éventuel prochain match.
        var $next = $("p:last", $root);
        if (null !== data.next) {
            tournament = TOURNAMENTS[data.next.tournament];
            var channel = CHANNELS[data.next.channel];
            $("img:first", $next).attr({ "src": IMG_DIR + tournament.img +
                                                ".svg",
                                         "alt": tournament.name,
                                         "title": tournament.name });
            $("a", $next).text(data.next.teams)
                         .attr("href", data.next.link);
            $("time", $next).text(data.next.date.format("dd/MM HH:mm"))
                            .attr("title",
                                  data.next.date.format("EEEEE dd MMMMM yyyy" +
                                                        " HH:mm"));
            $("img:last", $next).attr({ "src": IMG_DIR + channel.img + ".svg",
                                        "alt": channel.name,
                                        "title": channel.name });
        } else
            $("a", $next).text("(Aucun match programmé)")
                         .attr("href", "http://www.om.net/");
    }; // display()

    app.mod["regseb/om"] = create;

})();
