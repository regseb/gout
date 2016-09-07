define(["jquery"], function ($) {
    "use strict";

    return class {
        list(size) {
            const url = "https://www.commitstrip.com/fr/";
            return $.get(url).then(function (data) {
                const events = [];
                $(".excerpts a:lt(" + size + ")", data).each(function () {
                    const link = $(this).attr("href");
                    const [,,, year, month, day] = link.split("/");
                    events.push({
                        "img":   $("img", this).attr("src"),
                        "title": $("strong", this).text(),
                        "link":  link,
                        "guid":  link,
                        "date":  new Date(year, month, day).getTime()
                    });
                });
                return events;
            });
        } // list()
    };
});
