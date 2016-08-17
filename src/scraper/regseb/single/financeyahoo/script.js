define(["jquery"], function ($) {
    "use strict";

    return class {
        constructor({ share, lang = "fr" }) {
            this.share = share;
            this.lang = lang;
        }

        get() {
            const that = this;
            const url = "https://finance.yahoo.com/webservice/v1/symbols/" +
                        that.share + "/quote?view=detail&format=json";
            // Ne pas utiliser le fonction getJSON() car le serveur de Yahoo ne
            // retourne pas l'entête HTTP : "Access-Control-Allow-Origin".
            return $.get(url).then(function (data) {
                const fields = data.list.resources[0].resource.fields;
                return {
                    "title": parseFloat(fields.price).toFixed(2) + " (" +
                             (0 < parseFloat(fields.change) ? "+" : "") +
                             parseFloat(fields.change).toFixed(2) + " %)",
                    "desc": fields["issuer_name"],
                    "link": "https://" + that.lang + ".finance.yahoo.com/q?s=" +
                            that.share
                };
            });
        } // get()
    };
});
