define(["jquery"], function ($) {
    "use strict";

    return class {
        constructor(user) {
            this.user = user;
        } // constructor()

        list(size) {
            const self = this;
            const url = "https://www.instagram.com/" + self.user + "/media/";
            return $.get(url).then(function (data) {
                return data.items.slice(0, size).map(function (item) {
                    return {
                        "img":   item.images["standard_resolution"].url,
                        "title": item.caption.text,
                        "link":  item.link,
                        "guid":  item.id,
                        "date":  parseInt(item["created_time"], 10) * 1000
                    };
                });
            });
        } // list()
    };
});
