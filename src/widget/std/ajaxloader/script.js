define(["jquery"], function ($) {
    "use strict";

    const IMG_DIR = "widget/std/ajaxloader/img/";

    const create = function (id, url, config) {
        const $root = $("#" + id);
        $root.css("background-color", config || "black");

        $(document).ajaxStart(function () {
            $(".std-ajaxloader").css("background-image",
                                     "url(\"" + IMG_DIR + "loader.svg\")");
        });
        $(document).ajaxStop(function () {
            $(".std-ajaxloader").css("background-image", "none");
        });
    }; // create()

    return create;
});
