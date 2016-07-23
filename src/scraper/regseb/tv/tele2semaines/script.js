define(["jquery"], function ($) {
    "use strict";

    const CHANNELS = {
        "6ter": "6ter",
        "arte": "arte",
        "bein-sports-1": "bein-sports-1",
        "bein-sports-2": "bein-sports-2",
        "bfm-tv": "bfm-tv",
        "canalplus": "canalplus",
        "canalplus-sport": "canalplus-sport",
        "cherie-25": "cherie-25",
        "d17": "d17",
        "d8": "d8",
        "france-2": "france-2",
        "france-3": "france-3",
        "france-4": "france-4",
        "france-5": "france-5",
        "france-o": "france-o",
        "gulli": "gulli",
        "hd1": "hd1",
        "i-tele": "itele",
        "la-chaine-parlementaire-public-senat": "lcp-public-senat",
        "l-equipe-21": "l-equipe-21",
        "m6": "m6",
        "nrj-12": "nrj-12",
        "nt1": "nt1",
        "numero-23": "numero-23",
        "om-tv": "om-tv",
        "rmc-decouverte": "rmc-decouverte",
        "tf1": "tf1",
        "tmc": "tmc",
        "w9": "w9"
    };

    const deobfuscate = function (clazz) {
        const LUT = "0A12B34C56D78E9F";
        // Récupérer la deuxième "classe" de l'élément (la première contient
        // "encodedLinks").
        const coded = clazz.split(" ")[1];
        let plain = "";
        for (let i = 0; i < coded.length; i += 2) {
            plain += String.fromCharCode(LUT.indexOf(coded.charAt(i)) * 16 +
                                         LUT.indexOf(coded.charAt(i + 1)));
        }
        return plain;
    }; // deobfuscate()

    return class {
        constructor(broadcasts) {
            this.broadcasts = broadcasts;
        } // constuctor()

        list() {
            const self = this;
            const promises = [];
            $.each(self.broadcasts, function (broadcast, channels) {
                const url = "http://www.programme.tv/" + broadcast + "/";
                const promise = $.get(url).then(function (data) {
                    return channels.map(function (channel) {
                        const $channel = $("#programs a[href$=\"-" + channel +
                                           "/\"]", data);
                        const name = $channel.attr("title").substr(10);

                        const $show = $channel.closest("li");
                        const title = $.trim($("h2", $show).text());
                        const subtitle = $.trim($(".subtitle", $show).text());
                        const link = "http://www.programme.tv" +
                                     deobfuscate($(".encodedLinks",
                                                   $show).attr("class"));
                        const desc = $.trim($(".resume", $show).text());

                        const category = $(".type", $show).text();
                        const type = $(".type", $show).attr("class").substr(5);

                        let mark;
                        switch ($(".score", $show).attr("class").substr(11)) {
                            case "0": case "1": mark = 0; break;
                            case "2":           mark = 1; break;
                            case "3":           mark = 2; break;
                            case "4":           mark = 3; break;
                            case "5":           mark = 4; break;
                            default:            mark = 0;
                        }

                        return {
                            "channel":  CHANNELS[channel],
                            "name":     name,
                            "title":    title,
                            "subtitle": subtitle,
                            "link":     link,
                            "desc":     desc,
                            "category": category,
                            "type":     type,
                            "mark":     mark
                        };
                    });
                });
                promises.push(promise);
            });
            return Promise.all(promises).then (function (broadcasts) {
                return broadcasts.reduce(function (previous, current) {
                    return previous.concat(current);
                });
            });
        } // list()
    };
});
