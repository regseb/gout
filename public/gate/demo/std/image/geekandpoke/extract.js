/* @flow */
/* global define */

define(["jquery"], function ($) {
    "use strict";

    return function (size) {
        var url = "http://feeds.feedburner.com/GeekAndPoke";
        return $.get(url).then(function (data) {
            var events = [];
            $("item:lt(" + size + ")", data).each(function () {
                events.push({
                    "img":   $($("description",
                                 this).text())[0].getAttribute("data-image") +
                             "?format=300w",
                    "title": $("title", this).text(),
                    "link":  $("link", this).text(),
                    "guid":  $("guid", this).text(),
                    "date":  new Date($("pubDate", this).text()).getTime()
                });
            });
            return events;
        });
    };
});
