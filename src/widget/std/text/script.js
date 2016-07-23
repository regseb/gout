define(["jquery"], function ($) {
    "use strict";

    const create = function (id, url, config) {
        const $root = $("#" + id);
        $root.css("background-color", config.color || "black");
        $("p", $root).css("text-align", config.align || "left")
                     .html(Array.isArray(config.text) ? config.text.join("")
                                                      : config.text || "");
    }; // create()

    return create;
});
