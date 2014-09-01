/* global app, document, $, setCron */

(function() {
    "use strict";

    var gates = { };

    var create = function(id, url) {
        $.getJSON(url + "/config.json").then(function(args) {
            var $root = $("#" + id);
            $root.css("background-color", args.color || "#607d8b");

            gates[id] = {
                "lang":    args.lang || "fr",
                "updated": true
            };

            setCron(update, args.cron || "0 * * * *", id);

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
        extract(args.lang).then(function(data) {
            display($root, data);
        });
    }; // update()

    var extract = function(lang) {
        var url = "http://" + lang + ".wikipedia.org/w/api.php?action=query" +
                  "&list=random&rnnamespace=0&format=json&callback=?";
        return $.getJSON(url).then(function(data) {
            return {
                "title": data.query.random[0].title,
                "link":  "http://" + lang + ".wikipedia.org/wiki/" +
                         data.query.random[0].title
            };
        });
    }; // extract()

    var display = function($root, data) {
        $("a", $root).attr("href", data.link)
                     .text(data.title);
    }; // display()

    app.mod["regseb/articleauhasard"] = create;

})();
