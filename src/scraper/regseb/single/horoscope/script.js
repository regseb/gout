define(["jquery"], function ($) {
    "use strict";

    return class {
        constructor(sign) {
            this.sign = sign[0].toUpperCase() + sign.substr(1).toLowerCase();
        } // constructor()

        get() {
            const self = this;
            const url = "http://www.elle.fr/Astro/Horoscope/Quotidien";
            return $.get(url).then(function (data) {
                const result = {
                    "title": "(Signe non-trouvé)",
                    "desc": null,
                    "link": "http://www.elle.fr/Astro/Horoscope/Quotidien/" +
                            self.sign
                };

                $(".signes .right", data).each(function () {
                    if (-1 !== $("a", this).attr("href").indexOf(self.sign)) {
                        result.title = $("p", this).text();
                        return false;
                    }
                    return true;
                });
                return result;
            });
        } // get()
    };
});
