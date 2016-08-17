define(["jquery"], function ($) {
    "use strict";

    const DTF = new Intl.DateTimeFormat("fr-FR", {
        "day":   "2-digit",
        "month": "2-digit",
        "year":  "numeric"
    });

    return class {
        get() {
            // Si c'est le week-end (dimanche ou samedi) : ne pas récupérer le
            // sujet de l'émission car il n'y a pas d'émission le week-end.
            const now = new Date();
            if (0 === now.getDay() || 6 === now.getDay()) {
                return Promise.resolve({
                    "title": "(Pas d'émission le week-end)",
                    "desc":  "<em>C dans l'air</em> est diffusée du lundi au" +
                             " vendredi.",
                    "link":  "http://www.france5.fr/emissions/c-dans-l-air"
                });
            }

            const url = "http://www.france5.fr/emissions/c-dans-l-air";
            return $.get(url).then(function (data) {
                const $data = $(".cartouche", data);

                // Si le sujet du jour n'est pas encore indiqué.
                const date = $(".sous_titre", $data).text();
                if (-1 === date.indexOf(DTF.format(now))) {
                    return {
                        "title": "(Sujet de l'émission non-défini)",
                        "desc":  "Le sujet de l'émission est généralement" +
                                 " défini en début d'après-midi.",
                        "link":  "http://www.france5.fr/emissions/c-dans-l-air"
                    };
                }
                return {
                    "title": $("a:first", $data).text(),
                    "desc":  $(".accroche p", $data).html(),
                    "link":  "http://www.france5.fr" +
                             $("a", $data).attr("href")
                };
            });
        } // get()
    };
});
