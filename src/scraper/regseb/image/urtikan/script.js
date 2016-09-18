define(["jquery"], function ($) {
    "use strict";

    return class {
        list(size) {
            const url = "http://www.urtikan.net/dessin-du-jour/";
            return $.get(url).then(function (data) {
                return $.parseHTML(data);
            }).then(function (data) {
                const events = [];
                $("#posts-dessin li:lt(" + size + ")", data).each(
                                                            function (i, item) {
                    const $img = $("img", item);
                    events.push({
                        "img":   $img.attr("src"),
                        "title": $img.attr("alt"),
                        "link":  $img.parent().attr("href"),
                        "guid":  $img.attr("src"),
                        "date":  0
                    });
                });
                return events;
            });
        } // list()
    };
});
