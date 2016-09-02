require.config({
    "baseUrl": "lib",
    "paths":   {
        "widget":  "../widget",
        "scraper": "../scraper",
        "gate":    "../gate"
    }
});

define(["require", "jquery", "../loader"], function (require, $, loader) {
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
    const params = new URLSearchParams(window.location.search.slice(1));
    const user   = params.get("user")   || "default";
    const config = params.get("config") || "config";

    loader(user, config);
});
