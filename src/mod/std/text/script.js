define(["jquery"], function ($) {
    "use strict";

    const create = function (id, url) {
        $.getJSON(url + "/config.json").then(function (args) {
            const $root = $("#" + id);
            $root.css("background-color", args.color || "black");
            $("p", $root).css("text-align", args.align || "left")
                         .html(Array.isArray(args.text) ? args.text.join("")
                                                        : args.text || "");
        });
    }; // create()

    return create;
});
