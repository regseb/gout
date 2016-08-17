define(["jquery"], function ($) {
    "use strict";

    const CHANNELS = {
        "6ter":             "6ter",
        "arte":             "arte",
        "bein-sports-1":    "bein-sports-1",
        "bein-sports-2":    "bein-sports-2",
        "bfm-tv":           "bfm-tv",
        "canal":            "canalplus",
        "canal-sport":      "canalplus-sport",
        "cherie-25":        "cherie-25",
        "d17":              "d17",
        "d8":               "d8",
        "france-2":         "france-2",
        "france-3":         "france-3",
        "france-4":         "france-4",
        "france-5":         "france-5",
        "france-o":         "france-o",
        "gulli":            "gulli",
        "hd1":              "hd1",
        "i-tele":           "itele",
        "lcp-public-senat": "lcp-public-senat",
        "l-equipe-21":      "l-equipe-21",
        "m6":               "m6",
        "nrj12":            "nrj-12",
        "nt1":              "nt1",
        "numero-23":        "numero-23",
        "omtv":             "om-tv",
        "rmc-decouverte":   "rmc-decouverte",
        "tf1":              "tf1",
        "tmc":              "tmc",
        "w9":               "w9"
    };

    return class {
        constructor({ broadcast = "tnt", channels }) {
            this.broadcast = broadcast;
            this.channels = channels;
        } // constuctor()

        list() {
            const that = this;
            const url = "http://www.programme-television.org/?bouquet=" +
                        that.broadcast;
            return $.get(url).then(function (data) {
                return that.channels.map(function (channel) {
                    const $channel = $("#prime-broadcasts" +
                                       " a[href=\"/chaines-tv/" + channel +
                                       "\"]", data);
                    const name = $channel.text().substr(10);

                    const $show = $channel.parent().next();
                    const title = $.trim($("a:first", $show).text());
                    const subtitle = $(".texte_description", $show).text();
                    const link = "http://www.programme-television.org" +
                                 $("a:first", $show).attr("href");

                    const category = $(".texte_cat a", $show).text();
                    const RE = /([^\/]+)/;
                    let type = RE.exec($(".texte_cat a",
                                         $show).attr("href"))[1];
                    switch (type) {
                        case "films-telefilms":
                            type = -1 === category.indexOf("Téléfilm")
                                                                   ? "film"
                                                                   : "telefilm";
                            break;
                        case "series-tv": type = "serie"; break;
                        case "documentaires": type = "documentaire"; break;
                        case "jeunesse": break;
                        case "divertissement": break;
                        case "magazine": type = "information"; break;
                        case "sport": break;
                        case "musique": type = "culture"; break;
                        case "divers": type = "divers";
                    }

                    const mark = $(".texte_infos .picto7", $show).text().length;

                    return {
                        "channel":  CHANNELS[channel],
                        "name":     name,
                        "title":    title,
                        "subtitle": subtitle,
                        "link":     link,
                        "desc":     null,
                        "category": category,
                        "type":     type,
                        "mark":     mark
                    };
                });
            });
        } // list()
    };
});
