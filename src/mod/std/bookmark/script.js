define(["jquery"], function ($) {
    "use strict";

    const display = function ($root, data) {
        const $li = $("<li>").append($("<a>").attr({ "href":   data.link,
                                                     "target": "_blank" })
                                             .text(data.title || data.link));
        if (data.desc) {
            $li.append($("<span>").html(data.desc));
        }
        $("> ul", $root).append($li);
    }; // display()

    const create = function (id, url) {
        $.getJSON(url + "/config.json").then(function (args) {
            const $root = $("#" + id);
            $root.css({
                "background-color": args.color,
                "background-image": "url(\"" + url + "/icon.svg\")"
            });

            for (let site of args.sites) {
                display($root, site);
            }
        });
    }; // create()

    return create;
});
