define(["jquery"], function ($) {
    "use strict";

    const create = function (id, url, config) {
        const $root = $("#" + id);
        $root.css("background-color", config.color);
    }; // create()

    return create;
});
