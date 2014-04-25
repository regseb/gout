(function() {
    "use strict";

    var gates = { };

    var create = function(id, url) {
        $.getJSON(url + "/config.json", function(args) {
            $("#" + id).css("background-color", args.color);

            gates[id] = {
                "lang":    args.lang,
                "updated": true
            };

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

        extract(args.lang).then(function(data) {
            $("#" + id + " a").attr("href", data.link)
                              .text(data.title);
        });
    }; // update()

    var extract = function(lang) {
        var url = "http://" + lang + ".wikipedia.org/w/api.php?action=query" +
                  "&list=random&rnnamespace=0&format=json&callback=?";
        return $.getJSON(url).then(function(data) {
            return {
                "link": "http://" + lang + ".wikipedia.org/wiki/" +
                        data.query.random[0].title,
                "title": data.query.random[0].title
            };
        });
    }; // extract()

    app.mod["fr/regseb/articleauhasard"] = create;

})();
