define(["jquery"], function ($) {
    "use strict";

    return class {
        constructor({ url, icon = "" }) {
            this.url  = url;
            this.icon = icon;
        } // constructor()

        extract(size) {
            const that = this;
            return $.get(this.url).then(function (xml) {
                const items = $("entry:lt(" + size + ")", xml).map(function () {
                    let desc = $("summary", this).text().trim();
                    if (0 === desc.length) {
                        desc = $("content", this).text().trim();
                    }
                    return {
                        "title": $("title", this).text(),
                        "desc":  desc,
                        "link":  $("link", this).attr("href"),
                        "icon":  that.icon,
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
        } // extract()
    };
});
