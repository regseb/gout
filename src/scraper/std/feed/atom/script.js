define(["jquery"], function ($) {
    "use strict";

    return class {
        constructor(url) {
            this.url = url;
        } // constuctor()

        list(size) {
            return $.get(this.url).then(function (data) {
                // Si le serveur n'indique pas que les données sont au format
                // XML : il faut les convertir.
                const xml = "string" === typeof data ? $.parseXML(data)
                                                     : data;

                const items = $("entry:lt(" + size + ")", xml).map(function () {
                    let desc = $("summary", this).text().trim();
                    if (0 === desc.length) {
                        desc = $("content", this).text().trim();
                    }
                    return {
                        "title": $("title", this).text(),
                        "desc":  desc,
                        "link":  $("link", this).attr("href"),
                        "guid":  $("id", this).text(),
                        "date":  new Date($("updated", this).text()).getTime()
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
