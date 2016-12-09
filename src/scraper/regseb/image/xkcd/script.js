define(["jquery"], function ($) {
    "use strict";

    return class {
        extract(size) {
            const url = "https://xkcd.com/rss.xml";
            return $.get(url).then(function (data) {
                const events = [];
                $("item:lt(" + size + ")", data).each(function () {
                    events.push({
                        "img":   $($("description", this).text()).attr("src"),
                        "title": $("title", this).text(),
                        "link":  $("link", this).text(),
                        "guid":  $("guid", this).text(),
                        "date":  new Date($("pubDate", this).text()).getTime()
                    });
                });
                return events;
            });
        } // extract()
    };
});
