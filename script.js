/* global window, setTimeout, $ */

/**
 * @file Portail Web personnalisable.
 * @author Sébastien Règne
 * @version 0.1.1
 * @license GNU General Public License
 */

var app = {
    "mod": {},

    "init": function() {
        "use strict";
        // Utiliser le proxy pour les requêtes externes.
        $.ajaxSetup({
            "beforeSend": function(jqXHR, settings) {
                // Si c'est une requete vers un serveur externe et que le
                // résultat attendu n'est pas au format JSON : passer par le
                // proxy pour contourner la restriction XSS du navigateur.
                if (settings.crossDomain && "json" !== settings.dataType)
                    settings.url = settings.url
                                        .replace(/^https:\/\//, "proxy/https/")
                                        .replace(/^http:\/\//,  "proxy/http/");
            }
        });

        // Récupérer les paramètres transmits dans l'URL.
        var user   = window.location.query.user   || "default";
        var config = window.location.query.config || "config";

        // Ouvrir les portes vers l'extérieur.
        var url = "gate/" + user + "/" + config + ".json";
        $.getJSON(url).then(function(gates) {
            for (var url in gates) {
                var args = gates[url];
                // Si la propriété 'active' n'est pas définie : considérer que
                // la passerelle est active.
                if (false === args.active) continue;

                var id = "gate" + $("article").length;
                var clazz = args.module.replace(/\//g, "-");

                // Si le module est utilisé pour la première fois.
                if (!(args.module in app.mod)) {
                    // Charger la feuille de style.
                    $("head").append($("<link />", {
                        "rel":  "stylesheet",
                        "href": "mod/" + args.module + "/style.css"
                    }));
                    // Passer en synchrone pour attendre que le HTML et le
                    // JavaScript soient chargés avant les utiliser.
                    $.ajaxSetup({ "async": false });
                    // Charger le JavaScript et le HTML.
                    $.getScript("mod/" + args.module + "/script.js");
                    $("body").append(
                        $("<template>").load("mod/" + args.module +
                                             "/index.html")
                                       .addClass(clazz));
                    $.ajaxSetup({ "async": true });
                }

                $("body").append(
                    $("<article>").attr("id", id)
                                  .addClass(clazz)
                                  .css({ "left": args.coord.x * 1.4 + "em",
                                         "top":  args.coord.y * 1.4 + "em" })
                                  .width(args.coord.w * 1.4 + "em")
                                  .height(args.coord.h * 1.4 + "em")
                                  .html($("body > template." + clazz).html()));
                setTimeout(app.mod[args.module], 0,
                           id, "gate/" + user + "/" + url);
            }
        });
    } // init()
}; // app
