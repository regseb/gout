define(["jquery"], function ($) {
    "use strict";

    return class {
        constructor({ url, icon = null }) {
            this.url  = url;
            this.icon = icon;
        } // constructor()

        extract(size) {
            const that = this;
            return $.get(this.url).then(function (xml) {
                return $("entry:lt(" + size + ")", xml).map(function () {
                    let desc = $("summary", this).text().trim();
                    if (0 === desc.length) {
                        desc = $("content", this).text().trim();
                    }
                    return {
                        "date":  new Date($("updated", this).text()).getTime(),
                        "desc":  desc,
                        "guid":  $("id", this).text(),
                        "icon":  that.icon,
                        "link":  $("link", this).attr("href"),
                        "title": $("title", this).text()
                    };
                }).get().map(function (item) {
                    // Enlever les propriétés surperflues des éléments.
                    if (0 === item.desc.length) {
                        delete item.desc;
                    }
                    if (null === item.icon) {
                        delete item.icon;
                    }
                    return item;
                });
            });
        } // extract()
    };
});
