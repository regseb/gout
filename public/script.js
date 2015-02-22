/* @flow */
/* global require, define */

/**
 * @file Portail Web personnalisable.
 * @author Sébastien Règne
 * @version 0.2
 * @license GNU General Public License
 */

require.config({
    "baseUrl": "lib",
    "paths": {
        "mod": "../mod",
        "gate": "../gate"
    }
});

define(["require", "jquery", "wiloquery"], function (require, $, wiloquery) {
    "use strict";

    var load = function (gate, user, url) {
        // Si la propriété 'active' n'est pas définie : considérer que la
        // passerelle est active.
        if (false === gate.active) return;

        var id = "gate" + $("article").length;
        var clazz = gate.module.replace(/\//g, "-");

        // Si le module est utilisé pour la première fois.
        if (!$("body > template." + clazz).length) {
            // Charger la feuille de style.
            $("head").append($("<link />", {
                "rel":  "stylesheet",
                "href": "mod/" + gate.module + "/style.css"
            }));
            // Passer en synchrone pour attendre que le HTML soit chargés
            // avant l'utiliser.
            $.ajaxSetup({ "async": false });
            // Charger le HTML.
            $("body").append(
                $("<template>").load("mod/" + gate.module +
                                     "/index.html")
                               .addClass(clazz));
            $.ajaxSetup({ "async": true });
        }

        $("body").append(
            $("<article>").attr("id", id)
                          .addClass(clazz)
                          .css({ "left": gate.coord.x * 1.4 + "em",
                                 "top":  gate.coord.y * 1.4 + "em" })
                          .width(gate.coord.w * 1.4 + "em")
                          .height(gate.coord.h * 1.4 + "em")
                          .html($("body > template." + clazz).html()));

        require(["mod/" + gate.module + "/script"], function (factory) {
            factory(id, "gate/" + user + "/" + url);
        });
    };

    // Supprimer les variables globales de jQuery.
    $.noConflict(true);

    // Utiliser le proxy pour les requêtes externes.
    $.ajaxSetup({
        "beforeSend": function (jqXHR, settings) {
            // Si c'est une requete vers un serveur externe et que le résultat
            // attendu n'est pas au format JSON : passer par le proxy pour
            // contourner la restriction XSS du navigateur.
            if (settings.crossDomain && "json" !== settings.dataType)
                settings.url = settings.url.replace("https:/", "proxy/https")
                                           .replace("http:/",  "proxy/http");
        }
    });

    // Récupérer les paramètres transmits dans l'URL.
    var user   = wiloquery.user   || "default";
    var config = wiloquery.config || "config";

    // Ouvrir les portes vers l'extérieur.
    var url = "gate/" + user + "/" + config + ".json";
    $.getJSON(url).then(function (gates) {
        for (var url in gates)
            load(gates[url], user, url);
    });
});
