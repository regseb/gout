define(["jquery"], function ($) {
    "use strict";

    return class {
        constructor(user) {
            this.user = user;
        } // constuctor()

        list(size) {
            const url = "https://twitter.com/" + this.user;
            return $.get(url).then(function (data) {
                return $.parseHTML(data);
            }).then(function (data) {
                const items = [];
                $(".ProfileTweet:lt(" + size + ")", data).each(function () {
                    const link = $(".ProfileTweet-timestamp",
                                   this).attr("href");
                    items.push({
                        "title": $(".ProfileTweet-text", this).text(),
                        "desc":  $(".ProfileTweet-text", this).html(),
                        "link":  "https://twitter.com/" + link,
                        "guid":  link,
                        "date":  link.substr(link.lastIndexOf("/") + 1)
                    });
                });
                return items;
            });
        } // list()
    };
});
