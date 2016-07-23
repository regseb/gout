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

    const create = function (id, url, config) {
        const $root = $("#" + id);
        $root.css({
            "background-color": config.color,
            "background-image": "url(\"" + url + "/icon.svg\")"
        });

        for (let site of config.sites) {
            display($root, site);
        }
    }; // create()

    return create;
});
