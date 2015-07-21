/* global define */

define(["jquery"], function ($) {
    "use strict";

    var create = function (id, url) {
        $.getJSON(url + "/config.json").then(function (args) {
            var $root = $("#" + id);
            $root.css({
                "background-color": args.color,
                "background-image": "url(\"" + url + "/icon.svg\")"
            });

            for (var site of args.sites) {
                display($root, site);
            }
        });
    }; // create()

    var display = function ($root, data) {
        var $li = $("<li>").append($("<a>").attr({ "href":   data.link,
                                                   "target": "_blank" })
                                           .text(data.title || data.link));
        if (data.desc) {
            $li.append($("<span>").html(data.desc));
        }
        $("> ul", $root).append($li);
    }; // display()

    return create;

});
