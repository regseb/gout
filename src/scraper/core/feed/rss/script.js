define(["jquery"], function ($) {
    "use strict";

    const hash = function (str) {
        return Array.from(str).reduce(function (acc, curr) {
            return (acc << 5) - acc + curr.charCodeAt();
        }, 0);
    };

    return class {
        constructor({ url, icon = null }) {
            this.url  = url;
            this.icon = icon;
        }

        extract(size) {
            const that = this;
            return $.get(this.url).then(function (xml) {
                return $("item", xml).map(function () {
                    return {
                        "audio": $("enclosure[type^=\"audio/\"]", this)
                                                                   .attr("url"),
                        "date":  new Date($("pubDate", this).text()).getTime(),
                        "desc":  $("description", this).text().trim(),
                        "guid":  $("guid", this).text(),
                        "icon":  that.icon,
                        "img":   $("enclosure[type^=\"image/\"]", this)
                                                                   .attr("url"),
                        "link":  $("link", this).text(),
                        "title": $("title", this).text()
                    };
                }).get().sort(function (item1, item2) {
                    return item2.date - item1.date;
                }).slice(0, size).map(function (item) {
                    if (0 === item.guid.length) {
                        item.guid = hash(that.url + item.title + item.desc);
                    }

                    // Enlever les propriétés surperflues des éléments.
                    if (undefined === item.audio) {
                        delete item.audio;
                    }
                    if (0 === item.desc.length) {
                        delete item.desc;
                    }
                    if (null === item.icon) {
                        delete item.icon;
                    }
                    if (undefined === item.img) {
                        delete item.img;
                    }
                    if (0 === item.link.length) {
                        delete item.link;
                    }
                    return item;
                });
            });
        }
    };
});
