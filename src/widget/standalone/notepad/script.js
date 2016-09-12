define(["jquery"], function ($) {
    "use strict";

    const change = function () {
        localStorage.setItem($(this).attr("data-url"), $(this).val());
    }; // change()

    const create = function (id, url, config) {
        const $root = $("#" + id);
        $root.css({
            "background-color": config.color,
            "background-image": "url(\"" + url + "/icon.svg\")"
        });
        $("textarea", $root).val(localStorage.getItem(url))
                            .attr({ "title":       config.desc,
                                    "placeholder": config.title,
                                    "data-url":    url })
                            .css("border-color", config.color || "black")
                            .change(change);
    }; // create()

    return create;
});
