define(["jquery"], function ($) {
    "use strict";

    const CHANNELS = {
        "canal":       "canalplus",
        "canal-sport": "canalplus-sport",
        "franceinfo":  "france-info",
        "i-tele":      "canal-news",
        "l-equipe-21": "l-equipe",
        "nrj12":       "nrj-12",
        "omtv":        "om-tv"
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
                return $.parseHTML(data);
            }).then(function (data) {
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
                    let type = /[^/]+/.exec($(".texte_cat a",
                                              $show).attr("href"))[0];
                    switch (type) {
                        case "films-telefilms":
                            type = category.includes("Téléfilm") ? "telefilm"
                                                                 : "film";
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
                        "channel":  channel in CHANNELS ? CHANNELS[channel]
                                                        : channel,
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
