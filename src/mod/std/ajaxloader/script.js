/* global document, define */

define(["jquery"], function ($) {
    "use strict";

    const IMG_DIR = "mod/std/ajaxloader/img/";

    const create = function (id, url) {
        $.getJSON(url + "/config.json").then(function (args) {
            const $root = $("#" + id);
            $root.css("background-color", args.color || "black");

            $(document).ajaxStart(function () {
                $(".std-ajaxloader").css("background-image",
                                         "url(\"" + IMG_DIR + "loader.svg\")");
            });
            $(document).ajaxStop(function () {
                $(".std-ajaxloader").css("background-image", "none");
            });
        });
    }; // create()

    return create;
});
