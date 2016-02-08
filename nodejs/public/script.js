/* global require, define */

require.config({
    "baseUrl": "lib",
    "paths": {
        "mod": "../mod",
        "gate": "../gate"
    }
});

define(["require", "jquery", "wiloquery", "../loader"],
       function (require, $, wiloquery, loader) {
    "use strict";

    // Supprimer les variables globales de jQuery.
    $.noConflict(true);

    // Utiliser le proxy pour les requêtes externes.
    $.ajaxSetup({
        "beforeSend": function (jqXHR, settings) {
            // Si c'est une requête vers un serveur externe et que le résultat
            // attendu n'est pas au format JSON : passer par le proxy pour
            // contourner la restriction XSS du navigateur.
            if (settings.crossDomain && "json" !== settings.dataType) {
                settings.url = settings.url.replace("https:/", "proxy/https")
                                           .replace("http:/",  "proxy/http");
            }
        }
    });

    // Récupérer les paramètres transmits dans l'URL.
    const user   = wiloquery.user   || "default";
    const config = wiloquery.config || "config";

    loader(user, config);
});
