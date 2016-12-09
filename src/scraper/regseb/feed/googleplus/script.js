define(["jquery"], function ($) {
    "use strict";

    return class {
        constructor({ user, key }) {
            this.user = user;
            this.key  = key;
        } // constructor()

        extract(size) {
            const url = "https://www.googleapis.com/plus/v1/people/" +
                        this.user + "/activities/public?key=" + this.key +
                        "&maxResults=" + size;
            return $.getJSON(url).then(function (data) {
                return data.items.map(function (item) {
                    return {
                        "title": item.title,
                        "desc":  "",
                        "link":  item.url,
                        "guid":  item.id,
                        "date":  new Date(item.updated).getTime()
                    };
                });
            });
        } // extract()
    };
});
