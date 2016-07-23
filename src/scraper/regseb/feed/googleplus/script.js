define(["jquery"], function ($) {
    "use strict";

    return class {
        constructor({ user, key }) {
            this.user = user;
            this.key  = key;
        } // constuctor()

        list(size) {
            const url = "https://www.googleapis.com/plus/v1/people/" +
                        this.user + "/activities/public?key=" + this.key +
                        "&maxResults=" + size;
            return $.getJSON(url).then(function (data) {
                const items = [];
                for (let item of data.items) {
                    items.push({
                        "title": item.title,
                        "desc":  "",
                        "link":  item.url,
                        "guid":  item.id,
                        "date":  new Date(item.updated).getTime()
                    });
                }
                return items;
            });
        } // list()
    }
});
