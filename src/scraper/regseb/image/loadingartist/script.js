define(["jquery"], function ($) {
    "use strict";

    return class {
        constructor() { }

        list(size) {
            const url = "http://www.loadingartist.com/archives";
            return $.get(url).then(function (data) {
                const items = [];
                $(".archive-thumbs a", data).slice(-1 * size).each(function () {
                    items.push({
                        "img":   "http://www.loadingartist.com/" +
                                 $("img", this).attr("src"),
                        "title": $("img", this).attr("title"),
                        "link":  $(this).attr("href"),
                        "guid":  $(this).attr("href"),
                        "date":  0
                    });
                });
                return items.reverse();
            });
        } // list()
    };
});
