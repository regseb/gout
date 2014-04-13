(function() {
    "use strict";

    var gates = { };

    var create = function(id, url) {
        $.getJSON(url + "/config.json", function(args) {
            $("#" + id).css("background-color", args.color);

            gates[id] = {
                "updated": true
            };

            // Mettre a jour les informations une fois par jour (a 1h du matin).
            setCron(update, args.cron, id);

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

        // Si la page est cachee : ne pas actualiser les informations et
        // indiquer qu'il faudrait actualiser les informations quand
        // l'utilisateur affichera la page.
        if (document.hidden) {
            args.updated = true;
            return;
        }
        args.updated = false;

        extract(args.user).then(function(data) {
            $("#" + id + " a").attr("href", data.link)
                              .text(data.title);
        });
    }; // update()

    var extract = function(user) {
        var url = "http://fr.wikipedia.org/wiki/Sp%C3%A9cial:Page_au_hasard";
        return $.get(url).then(function(data) {
            return { "link": "http://fr.wikipedia.org" +
                             $("#ca-view a", data).attr("href"),
                     "title": $("#firstHeading", data).text() };
        });
    }; // extract()

    app.mod["fr/regseb/articleauhasard"] = create;

})();
