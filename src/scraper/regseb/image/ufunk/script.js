define(["jquery"], function ($) {
    "use strict";

    return class {
        constructor() { }

        list(size) {
            const url = "http://www.ufunk.net/";
            return $.get(url).then(function (data) {
                const events = [];
                $("#loopgrid article", data).not("[class*=\"advice\"]:lt(" +
                                                 size + ")").each(
                                                            function (i, item) {
                    const $a = $("a:first", item);
                    const $img = $("img", $a);

                    let src = $img.attr("src");
                    src = src.substr(src.indexOf("src=") + 4);
                    src = src.substr(0, src.indexOf("&"));
                    events.push({
                        "img":   src,
                        "title": $img.attr("alt"),
                        "link":  $a.attr("href"),
                        "guid":  src,
                        "date":  0
                    });
                });
                return events;
            });
        } // list()
    };
});
