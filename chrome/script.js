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

    // Récupérer les paramètres transmits dans l'URL.
    const user   = wiloquery.user   || "default";
    const config = wiloquery.config || "config";

    loader(user, config);
});
