define([], function () {
    "use strict";

    return class {
        constructor({ url, icon = null }) {
            this.url  = url;
            this.icon = icon;
        }

        extract(size) {
            const that = this;
            return fetch(this.url).then(function (response) {
                return response.json();
            }).then(function (response) {
                return response.items.map(function (item) {
                    return {
                        "date":  new Date(item["date_published"]).getTime(),
                        "desc":  item.summary,
                        "guid":  item.id,
                        "icon":  that.icon,
                        "img":   item.image,
                        "link":  item.url,
                        "title": item.title
                    };
                }).sort(function (item1, item2) {
                    return item2.date - item1.date;
                }).slice(0, size).map(function (item) {
                    // Enlever les propriétés surperflues des éléments.
                    if (0 === item.desc.length) {
                        delete item.desc;
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
        }
    };
});
