define(["jquery"], function ($) {
    "use strict";

    const create = function (id, url, config) {
        const $root = $("#" + id);
        $("iframe", $root).attr({ "src":    config,
                                  "width":  $root.width(),
                                  "height": $root.height() });
    }; // create()

    return create;
});
