require.config({
    "baseUrl": "lib",
    "paths": {
        "mod": "../mod",
        "gate": "../gate"
    }
});

define(["require", "jquery", "../loader"], function (require, $, loader) {
    "use strict";

    // Supprimer les variables globales de jQuery.
    $.noConflict(true);

    // Récupérer les paramètres transmits dans l'URL.
    const params = new URLSearchParams(window.location.search.slice(1));
    const user   = params.get("user")   || "default";
    const config = params.get("config") || "config";

    loader(user, config);
});
