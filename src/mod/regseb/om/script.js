define(["jquery", "scronpt"], function ($, Cron) {
    "use strict";

    const IMG_DIR = "mod/regseb/om/img/";
    const TOURNAMENTS = {
        "amical":            "Amical",
        "coupe_france":      "Coupe de France",
        "coupe_ligue":       "Coupe de la Ligue",
        "ligue_1":           "Ligue 1",
        "ligue_champions":   "Ligue des Champions",
        "ligue_europa":      "Ligue Europa",
        "trophee_champions": "Trophée des Champions",
        "trophee_rld":       "Trophée Robert Louis-Dreyfus",
        "unknown":           "Inconnue"
    };
    const CHANNELS = {
        "bein1":                 "Bein Sport 1",
        "canalplus":             "Canal+",
        "canalplus-sport-bein1": "Canal+ Sport / Bein Sport 1",
        "eurosport_2":           "Eurosport 2",
        "undisclosed":           "Non communiquée",
        "unknown":               "Inconnue",
        "w9":                    "W9"
    };
    // dd/MM HH:mm.
    const DTF_SHORT = new Intl.DateTimeFormat("fr-FR", {
        "day": "2-digit", "month": "2-digit", "hour": "2-digit",
        "minute": "2-digit" });
    // EEEEE dd MMMMM yyyy HH:mm.
    const DTF_LONG = new Intl.DateTimeFormat("fr-FR", {
        "weekday": "long", "day": "2-digit", "month": "long", "year": "numeric",
        "hour": "2-digit", "minute": "2-digit" });

    const gates = {};

    const reckonTournament = function (id) {
        switch (id) {
            case "480": return "trophee_rld";
            case "483": return "ligue_europa";
            case "484": return "coupe_france";
            case "485": return "trophee_champions";
            case "487": return "ligue_1";
            case "492": return "ligue_champions";
            case "514": return "amical";
            case "521": return "coupe_ligue";
            default:    return "unknown";
        }
    }; // reckonTournament()

    const reckonChannel = function ($img) {
        if (0 === $img.length) {
            return "undisclosed";
        }
        switch (/\/([^\/]+)\.png$/.exec($img.attr("data-src"))[1]) {
            case "canalplus-logo-ok-min":       return "canalplus";
            case "eurosport_2":                 return "eurosport_2";
            case "logo-w9-min":                 return "w9";
            case "canal-plus-sport-beinsport1": return "canalplus-sport-bein1";
            case "beinsport1-transparent":      return "bein1";
            default:                            return "unknown";
        }
    }; // reckonChannel()

    const extract = function () {
        const url = "https://www.om.net/calendrier-resultats";
        return $.get(url).then(function (data) {
            const $last = $(".current-match", data);
            const last = {
                "link": "https://www.om.net" +
                        $(".about-match", $last).attr("href"),
                "tournament": reckonTournament($last.attr("data-competition")),
                "host": {
                    "name": $(".field-visuel span:first", $last).text(),
                    "score": parseInt($(".host span", $last).text(), 10)
                },
                "guest": {
                    "name": $(".field-visuel span:last", $last).text(),
                    "score": parseInt($(".guest span", $last).text(), 10)
                }
            };
            const $next = $last.nextAll(":not(.om-row-month-title):first",
                                        data);
            let next = null;
            if (0 !== $next.length) {
                // Récupérer les informations de la date.
                const year = parseInt($(".year", $next).text(), 10);
                const month = parseInt($next.attr("data-month"), 10) - 1;
                const day = parseInt($(".day", $next).text(), 10);
                const parts = $(".time", $next).text().split(":");
                const hour = parseInt(parts[0], 10);
                const minute = parseInt(parts[1], 10);

                next = {
                    "link": "https://www.om.net" +
                            $(".presentation-match", $next).attr("href"),
                    "tournament": reckonTournament(
                                                $next.attr("data-competition")),
                    "host": $(".field-visuel span:first", $next).text(),
                    "guest": $(".field-visuel span:last", $next).text(),
                    "date": new Date(year, month, day, hour, minute),
                    "channel": reckonChannel($(".live-img", $next))
                };
            }

            return {
                "last": last,
                "next": next
            };
        });
    }; // extract()

    const display = function ($root, data) {
        // Afficher le dernier match joué.
        const $last = $("p:first", $root);
        const last = data.last;
        let tournament = last.tournament;
        $("img", $last).attr({ "src":   IMG_DIR + tournament + ".svg",
                               "alt":   TOURNAMENTS[tournament],
                               "title": TOURNAMENTS[tournament] });
        $("a", $last).attr("href",  last.link)
                     .text(last.host.name + " " + last.host.score + " - " +
                           last.guest.score + " " + last.guest.name);

        // Afficher l'éventuel prochain match.
        const $next = $("p:last", $root);
        if (null !== data.next) {
            const next = data.next;
            const channel = next.channel;
            tournament = next.tournament;
            $("img:first", $next).attr({ "src":   IMG_DIR + tournament + ".svg",
                                         "alt":   TOURNAMENTS[tournament],
                                         "title": TOURNAMENTS[tournament] });
            $("a", $next).attr("href", data.next.link)
                         .text(next.host + " - " + next.guest);
            $("time", $next).attr("title", DTF_LONG.format(next.date))
                            .text(DTF_SHORT.format(next.date));
            $("img:last", $next).attr({ "src":   IMG_DIR + channel + ".svg",
                                        "alt":   CHANNELS[channel],
                                        "title": CHANNELS[channel] });
        } else {
            $("a", $next).attr("href", "https://www.om.net/")
                         .text("(Aucun match programmé)");
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
        extract().then(function (data) {
            display($root, data);
        });
    }; // update()

    const create = function (id, url) {
        $.getJSON(url + "/config.json").then(function (args) {
            const $root = $("#" + id);
            $root.css("background-color", args.color || "#03a9f4");

            gates[id] = {
                // Par défaut, mettre à jour tous les matins à 7h.
                "cron": new Cron(args.cron || "0 7 * * *", update, id)
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
