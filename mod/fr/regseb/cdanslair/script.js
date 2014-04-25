(function() {
    "use strict";

    var updated = true;

    var create = function(id, url) {
        $.getJSON(url + "/config.json", function(args) {
            $("#" + id).css("background-color", args.color);

            // Mettre a jour une fois par heure entre 14h et 18h ; et une fois a
            // 1h pour effacer le sujet de l'emission d'hier.
            setCron(update, "0 1,14-18 * * *");

            document.addEventListener("visibilitychange", function() {
                if (updated) update();
            });

            update();
        });
    }; // create()

    var update = function() {
        // Si la page est cachee : ne pas mettre a jour le sujet de l'emission
        // et indiquer qu'il faudrait mettre a jour le sujet de l'emission quand
        // l'utilisateur affichera la page.
        if (document.hidden) {
            updated = true;
            return;
        }
        updated = false;

        var views = $(".fr-regseb-cdanslair");
        var now = new Date();
        // Si c'est le week-end (dimanche ou samedi) .
        if (0 === now.getDay() || 6 === now.getDay()) {
            $("a", views).attr("href", "http://www.france5.fr/emissions" +
                                       "/c-dans-l-air")
                         .text("(Pas d'\u00E9mission le week-end)");
            $("span", views).text(
                    "<em>C dans l'air</em> est diffus\u00E9e du lundi au" +
                    " vendredi.");
            return;
        }

        extract().then(function(data) {
            // Si le sujet du jour n'est pas encore indique.
            if (-1 === data.date.indexOf(now.format("dd/MM/yyyy"))) {
                $("a", views).attr("href", "http://www.france5.fr/emissions" +
                                           "/c-dans-l-air")
                             .text("(Sujet de l'\u00E9mission" +
                                       " non-d\u00E9fini)");
                $("span", views).text(
                        "Le sujet de l'\u00E9mission est" +
                        " g\u00E9n\u00E9ralement d\u00E9fini en d\u00E9but" +
                        " d'apr\u00E8s-midi.");
            } else {
                $("a", views).attr("href", data.link)
                             .text(data.title);
                $("span", views).html(data.description);
            }
        });
    }; // update()

    var extract = function(data) {
        return $.get("http://www.france5.fr/emissions/c-dans-l-air")
                                                         .then(function(data) {
            data = $(".cartouche", data);

            return {
                "date": $(".sous_titre", data).text(),
                "title": $("a:first", data).text(),
                "link": "http://www.france5.fr" + $("a", data).attr("href"),
                "description": $(".accroche p", data).html()
            };
        });
    }; // extract()

    app.mod["fr/regseb/cdanslair"] = create;

})();
