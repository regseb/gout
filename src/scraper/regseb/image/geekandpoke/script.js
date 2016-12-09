define(["jquery"], function ($) {
    "use strict";

    return class {
        extract(size) {
            const url = "https://feeds.feedburner.com/GeekAndPoke";
            return $.get(url).then(function (data) {
                const events = [];
                $("item:lt(" + size + ")", data).each(function () {
                    const description = $("description", this).text();
                    events.push({
                        "img":   $(description)[0].getAttribute("data-image") +
                                 "?format=300w",
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
