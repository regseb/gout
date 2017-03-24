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
                const items = $("item:lt(" + size + ")", xml).map(function () {
                    return {
                        "title": $("title", this).text(),
                        "desc":  $("description", this).text().trim(),
                        "link":  $("link", this).text(),
                        "icon":  that.icon,
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
        } // extract()
    };
});
