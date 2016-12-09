define(["jquery"], function ($) {
    "use strict";

    const change = function () {
        localStorage.setItem($(this).attr("data-url"), $(this).val());
    }; // change()

    const create = function (id, { "config.json": config, "icon.svg": icon }) {
        const $root = $("#" + id);
        $root.css({
            "background-color": config.color,
            "background-image": "url(\"data:image/svg+xml;base64," +
                                btoa(icon) + "\")"
        });
        $("textarea", $root).val(localStorage.getItem(id))
                            .attr({ "title":       config.desc,
                                    "placeholder": config.title,
                                    "data-url":    id })
                            .css("border-color", config.color || "black")
                            .change(change);
    }; // create()

    return create;
});
