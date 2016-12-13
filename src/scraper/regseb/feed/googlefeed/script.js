define([], function () {
    "use strict";

    return class {
        constructor(url) {
            this.url = url;
        } // constructor()

        extract(size) {
            const url = "https://ajax.googleapis.com/ajax/services/feed/load" +
                        "?v=1.0&q=" + encodeURIComponent(this.url) + "&num=" +
                        size;
            return fetch(url).then(function (response) {
                return response.json();
            }).then(function (data) {
                return data.responseData.feed.entries.map(function (entry) {
                    return {
                        "title": entry.title,
                        "desc":  entry.content,
                        "link":  entry.link,
                        "guid":  entry.link,
                        "date":  new Date(entry.publishedDate).getTime()
                    };
                });
            });
        } // extract()
    };
});
