define([], function () {
    "use strict";

    const STORAGE_KEY = location.search + "scraper/core/stack/watcher/";

    return class {
        constructor({ url, selector = "html", title = url, icon = null }) {
            this.url      = url;
            this.selector = selector;
            this.title    = title;
            this.icon     = icon;
            this.key      = STORAGE_KEY + url + selector;
        }

        extract(size) {
            const that = this;
            return fetch(this.url).then(function (response) {
                return response.text();
            }).then(function (data) {
                const doc = new DOMParser().parseFromString(data, "text/html");
                const fragment = doc.querySelector(that.selector).innerHTML
                                                                 .trim();
                const reference = localStorage.getItem(that.key);
                if (reference === fragment) {
                    return [];
                }

                localStorage.setItem(that.key, fragment);

                const now = Date.now();
                return [{
                    "date":  now,
                    "desc":  fragment,
                    "guid":  that.url + that.selector + now,
                    "icon":  that.icon,
                    "link":  that.url,
                    "title": that.title
                }].slice(0, size).map(function (item) {
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
        }
    };
});
