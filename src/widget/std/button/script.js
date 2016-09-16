define(["jquery"], function ($) {
    "use strict";

    const create = function (id, url, config) {
        const $root = $("#" + id);
        $root.css("background-color", config.color);
        $("a", $root).attr("href", config.link);
        if ("desc" in config) {
            $("a", $root).attr("title", config.desc);
        }
        $("img", $root).attr({ "src": url + "/icon.svg",
                               "alt": config.desc });
    }; // create()

    return create;
});
