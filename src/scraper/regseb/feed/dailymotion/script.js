define([], function () {
    "use strict";

    return class {
        constructor(user) {
            this.user = user;
        } // constructor()

        extract(size) {
            const url = "https://api.dailymotion.com/user/" + this.user +
                        "/videos?fields=title,description,url,id,created_time" +
                               "&limit=" + size;
            return fetch(url).then(function (response) {
                return response.json();
            }).then(function (data) {
                return data.list.map(function (item) {
                    return {
                        "title": item.title,
                        "desc":  item.description,
                        "link":  item.url,
                        "guid":  item.id,
                        "date":  item["created_time"]
                    };
                });
            });
        } // extract()
    };
});
