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
                return $("item:lt(" + size + ")", xml).map(function () {
                    return {
                        "date":  new Date($("pubDate", this).text()).getTime(),
                        "desc":  $("description", this).text().trim(),
                        "guid":  $("guid", this).text(),
                        "icon":  that.icon,
                        "img":   $("enclosure[type^=\"image/\"]", this)
                                                                   .attr("url"),
                        "link":  $("link", this).text(),
                        "title": $("title", this).text()
                    };
                }).get().map(function (item) {
                    // Enlever les propriétés surperflues des éléments.
                    if (0 === item.desc.length) {
                        delete item.desc;
                    }
                    if (0 === item.guid.length) {
                        item.guid = item.link;
                    }
                    if (null === item.icon) {
                        delete item.icon;
                    }
                    if (undefined === item.img) {
                        delete item.img;
                    }
                    return item;
                });
            });
        } // extract()
    };
});
