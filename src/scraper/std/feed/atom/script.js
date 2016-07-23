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
                if ("string" === typeof data) {
                    data = $.parseXML(data);
                }

                const items = [];
                $("entry:lt(" + size + ")", data).each(function () {
                    let desc = $("summary", this).text().trim();
                    if (0 === desc.length) {
                        desc = $("content", this).text().trim();
                    }
                    items.push({
                        "title": $("title", this).text(),
                        "desc":  desc,
                        "link":  $("link", this).attr("href"),
                        "guid":  $("id", this).text(),
                        "date":  new Date($("updated", this).text()).getTime()
                    });
                });

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
