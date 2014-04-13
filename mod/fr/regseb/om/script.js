(function() {
    "use strict";

    var IMG_DIR = "mod/fr/regseb/om/img/";
    var TOURNAMENTS = {
        "11": { "img": "ligue1",            "name": "Ligue 1" },
        "12": { "img": "amical",            "name": "Amical" },
        "13": { "img": "coupedefrance",     "name": "Coupe de France" },
        "14": { "img": "coupedelaligue",    "name": "Coupe de la Ligue" },
        "15": { "img": "liguedeschampions", "name": "Ligue des Champions" },
        "16": { "img": "ligueeuropa",       "name": "Ligue Europa" },
        "20": { "img": "tropheedeschampions",
                "name": "Troph\u00E9e des Champions" }
    };
    var CHANNELS = {
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

    var updated = true;

    var create = function(id, url) {
        $.getJSON(url + "/config.json", function(args) {
            $("#" + id).css("background-color", args.color);

            // Mettre a jour tous les jours a 7h.
            setCron(update, "0 7 * * *");

            document.addEventListener("visibilitychange", function() {
                if (updated) update();
            });

            update();
        });
    }; // create()

    var update = function() {
        // Si la page est cachee : ne pas mettre a jour la liste des matchs et
        // indiquer qu'il faudrait mettre a jour la liste des matchs quand
        // l'utilisateur affichera la page.
        if (document.hidden) {
            updated = true;
            return;
        }
        updated = false;

        var views = $(".fr-regseb-om");
        $.get("http://www.om.net/fr/Saison/102001/Calendrier_Resultats",
              function(data) {
            data = extract(data);

            // Afficher le dernier match joue.
            var tournament = TOURNAMENTS[data.last.tournament];
            $("p:first img", views).attr({ "src": IMG_DIR + tournament.img +
                                                  ".svg",
                                           "alt": tournament.name,
                                           "title": tournament.name });
            $("p:first a", views).text(data.last.score)
                                 .attr("href", data.last.link);

            // Afficher le prochain match.
            tournament = TOURNAMENTS[data.next.tournament];
            var channel = CHANNELS[data.next.channel];
            $("p:last img:first", views).attr({ "src": IMG_DIR +
                                                       tournament.img + ".svg",
                                                "alt": tournament.name,
                                                "title": tournament.name });
            $("p:last a", views).text(data.next.teams)
                                .attr("href", data.next.link);
            $("p:last time", views).text(data.next.time.format("dd/MM HH:mm"))
                                   .attr("title",
                                         data.next.time.format("EEEEE dd" +
                                                               " MMMMM yyyy" +
                                                               " HH:mm"));
            $("p:last img:last", views).attr({ "src": IMG_DIR + channel.img +
                                                      ".svg",
                                               "alt": channel.name,
                                               "title": channel.name });
        }, "html");
    }; // update()

    var extract = function(data) {
        var RE = /\/([0-9]+)\.png$/;
        var last = $("#calendar-last-match", data);
        var next = $("#calendar-next-match", data);
        return {
            "last": {
                "link": "http://www.om.net" + $("a:first", last).attr("href"),
                "tournament": RE.exec($(".competition img:first",
                                        last).attr("src"))[1],
                "score": $(".competition span", last).text()
            },
            "next": {
                "link": "http://www.om.net" + $("a:first", next).attr("href"),
                "tournament": RE.exec($(".competition img:first",
                                        next).attr("src"))[1],
                "teams": $("h2", next).text(),
                "time": new Date($("time", next).attr("datetime")),
                "channel": RE.exec($(".tv img", next).attr("src"))[1]
            }
        };
    }; // extract()

    app.mod["fr/regseb/om"] = create;

})();
