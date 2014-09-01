/* global app, document, $, setCron */

// TODO Colorer en blanc les symboles des signes et adapter les tailles.

(function() {
    "use strict";

    var IMG_DIR = "mod/regseb/horoscope/img/";

    var gates = { };

    var create = function(id, url) {
        $.getJSON(url + "/config.json").then(function(args) {
            var $root = $("#" + id);
            var sign = args.sign[0].toUpperCase() +
                       args.sign.substr(1).toLowerCase();
            $root.css({
                "background-color": args.color || "black",
                "background-image": "url(\"" + IMG_DIR + args.sign + ".svg\")"
            });
            $("a", $root).attr("href", "http://www.elle.fr/Astro/Horoscope/" +
                                       "Quotidien/" + sign);

            gates[id] = {
                "sign":    sign,
                "updated": true
            };

            setCron(update, "0 6 * * *", id);

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
        extract(args.sign).then(function(data) {
            display($root, data);
        });
    }; // update()

    var extract = function(sign) {
        var url = "http://www.elle.fr/Astro/Horoscope/Quotidien";
        return $.get(url).then(function(data) {
            var text = "(Signe non-trouvé)";
            $(".horoscope-hub .text", data).each(function() {
                if (-1 !== $("a.title", this).attr("href").indexOf(sign)) {
                    text = $("p", this).text();
                    return false;
                }
            });
            return text;
        });
    }; // extract()

    var display = function($root, data) {
        $("a", $root).text(data);
    }; // display()

    app.mod["regseb/horoscope"] = create;

})();
