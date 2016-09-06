define(["jquery"], function ($) {
    "use strict";

    return class {
        constructor(sign) {
            this.sign = sign[0].toUpperCase() + sign.substr(1).toLowerCase();
        } // constructor()

        get() {
            const that = this;
            const url = "http://www.elle.fr/Astro/Horoscope/Quotidien";
            return $.get(url).then(function (data) {
                const result = {
                    "title": "(Signe non-trouvé)",
                    "desc":  null,
                    "link":  "http://www.elle.fr/Astro/Horoscope/Quotidien/" +
                             that.sign
                };

                $(".signes .right", data).each(function () {
                    if ($("a", this).attr("href").includes(that.sign)) {
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
