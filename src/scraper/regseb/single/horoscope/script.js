define(["jquery"], function ($) {
    "use strict";

    return class {
        constructor(sign) {
            this.sign = sign[0].toUpperCase() + sign.substr(1).toLowerCase();
        } // constructor()

        extract() {
            const that = this;
            const url = "http://www.elle.fr/Astro/Horoscope/Quotidien";
            return $.get(url).then(function (data) {
                return $.parseHTML(data);
            }).then(function (data) {
                const result = {
                    "title": "(Signe non-trouvé)",
                    "desc":  "",
                    "link":  "http://www.elle.fr/Astro/Horoscope/Quotidien"
                };

                $(".signes .right", data).each(function () {
                    if ($("a", this).attr("href").includes(that.sign)) {
                        result.title = $("p", this).text();
                        result.link  = $("a", this);
                        return false;
                    }
                    return true;
                });
                return result;
            });
        } // extract()
    };
});
