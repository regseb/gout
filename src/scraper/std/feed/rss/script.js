define(["jquery"], function ($) {
    "use strict";

    return class {
        constructor(url) {
            this.url = url;
        } // constructor()

        list(size) {
            return $.get(this.url).then(function (data) {
                // Si le serveur n'indique pas que les données sont au format
                // XML : il faut les convertir.
                const xml = "string" === typeof data ? $.parseXML(data)
                                                     : data;

                const items = $("item:lt(" + size + ")", xml).map(function () {
                    return {
                        "title": $("title", this).text(),
                        "desc":  $("description", this).text().trim(),
                        "link":  $("link", this).text(),
                        "guid":  $("guid", this).text(),
                        "date":  new Date($("pubDate", this).text()).getTime()
                    };
                }).get();

                for (let item of items) {
                    if ("" === item.guid) {
                        item.guid = item.link;
                    }
                }
                return items;
            });
        } // list()
    };
});
