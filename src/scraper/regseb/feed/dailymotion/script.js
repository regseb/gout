define(["jquery"], function ($) {
    "use strict";

    return class {
        constructor(user) {
            this.user = user;
        } // constuctor()

        list(size) {
            const url = "https://api.dailymotion.com/user/" + this.user +
                        "/videos?fields=title,description,url,id,created_time" +
                               "&limit=" + size;
            return $.getJSON(url).then(function (data) {
                const items = [];
                for (let item of data.list) {
                    items.push({
                        "title": item.title,
                        "desc":  item.description,
                        "link":  item.url,
                        "guid":  item.id,
                        "date":  item["created_time"]
                    });
                }
                return items;
            });
        } // list()
    };
});
