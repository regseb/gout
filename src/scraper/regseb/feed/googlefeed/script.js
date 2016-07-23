define(["jquery"], function ($) {
    "use strict";

    return class {
        constructor(url) {
            this.url = url;
        } // constuctor()

        list(size) {
            const url = "https://ajax.googleapis.com/ajax/services/feed/load" +
                        "?v=1.0&q=" + encodeURIComponent(this.url) + "&num=" +
                        size + "&callback=?";
            return $.getJSON(url).then(function (data) {
                const items = [];
                for (let entry of data.responseData.feed.entries) {
                    items.push({
                        "title": entry.title,
                        "desc":  entry.content,
                        "link":  entry.link,
                        "guid":  entry.link,
                        "date":  new Date(entry.publishedDate).getTime()
                    });
                }
                return items;
            });
        }
    };
});
