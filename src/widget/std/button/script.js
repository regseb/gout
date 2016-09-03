define(["jquery"], function ($) {
    "use strict";

    const create = function (id, url, config) {
        const $root = $("#" + id);
        $root.css({
            "background-color": config.color,
            "background-image": "url(\"" + url + "/icon.svg\")"
        });
        $("a", $root).attr("href", config.link);
        if ("title" in config) {
            $("a", $root).attr("title", config.desc);
        }
    }; // create()

    return create;
});
