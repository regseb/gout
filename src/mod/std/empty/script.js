define(["jquery"], function ($) {
    "use strict";

    const create = function (id, url) {
        $.getJSON(url + "/config.json").then(function (args) {
            const $root = $("#" + id);
            $root.css("background-color", args.color);
        });
    }; // create()

    return create;
});
