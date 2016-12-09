define(["jquery"], function ($) {
    "use strict";

    const WEBCAMS_ID = {
        "village":        "PRESTATAIRE-WEBCAMS-GENERAL",
        "parc-loisirs":   "PRESTATAIRE-WEBCAMS-VILLAGE",
        "seignus-bas":    "PRESTATAIRE-WEBCAMS-SEIGNUS2",
        "seignus-haut":   "PRESTATAIRE-WEBCAMS-SEIGNUS",
        "front-de-neige": "PRESTATAIRE-WEBCAMS-AIGUI2",
        "observatoire":   "PRESTATAIRE-WEBCAMS-AIGUILLE"
    };

    return class {
        constructor(webcams) {
            this.webcams = webcams;
        } // constructor()

        extract() {
            const that = this;
            const url = "http://www.valdallos.com/webcams.html";
            return $.get(url).then(function (data) {
                return $.parseHTML(data);
            }).then(function (data) {
                return that.webcams.map(function (webcam) {
                    const $div = $("#" + WEBCAMS_ID[webcam] +
                                   " .cadre_photo_principale", data);
                    return {
                        "img":   "http://www.valdallos.com" +
                                 $("img", $div).attr("src"),
                        "title": $("img", $div).attr("title"),
                        "link":  $("a", $div).attr("href"),
                        "guid":  webcam,
                        "date":  0
                    };
                });
            });
        } // extract()
    };
});
