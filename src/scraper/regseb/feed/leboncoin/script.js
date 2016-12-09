define(["jquery"], function ($) {
    "use strict";

    const MONTHS = [
        "janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août",
        "sept", "oct", "nov", "déc"
    ];

    return class {
        constructor(url) {
            this.url = url;
        } // constructor()

        extract(size) {
            return $.get(this.url).then(function (data) {
                return $.parseHTML(data);
            }).then(function (data) {
                const items = [];
                $(".tabsContent a:lt(" + size + ")", data).each(function () {
                    const parts = $(".item_absolute", this).text()
                                                          .replace("Urgent", "")
                                                          .trim()
                                                          .split(/[,:] */);
                    const date = new Date();
                    if ("Aujourd'hui" === parts[0]) {
                        // Ne rien faire.
                    } else if ("Hier" === parts[0]) {
                        date.setDate(date.getDate() - 1);
                    } else {
                        const subparts = parts[0].split(" ");
                        date.setMonth(MONTHS.indexOf(subparts[1]));
                        date.setDate(parseInt(subparts[0], 10));
                    }
                    date.setHours(parseInt(parts[1], 10));
                    date.setMinutes(parseInt(parts[2], 10));

                    items.push({
                        "title": $(this).attr("title"),
                        "desc":  "",
                        "link":  "https:" + $(this).attr("href"),
                        "guid":  $(this).attr("href"),
                        "date":  date.getTime()
                    });
                });
                return items;
            });
        } // extract()
    };
});
