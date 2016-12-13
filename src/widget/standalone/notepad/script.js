define(["jquery"], function ($) {
    "use strict";

    const save = function (id, value) {
        localStorage.setItem("widget/standalone/notepad/" + id, value);
    }; // save()

    const load = function (id) {
        return localStorage.getItem("widget/standalone/notepad/" + id);
    }; // load()

    const change = function () {
        const $root = $(this).closest("article");

        save($root.attr("id"), $(this).val());
    }; // change()

    const create = function (id, { "config.json": config, "icon.svg": icon }) {
        const $root = $("#" + id);
        $root.css({
            "background-color": config.color || "black",
            "background-image": "url(\"data:image/svg+xml;base64," +
                                btoa(icon) + "\")"
        });
        $("textarea", $root).val(load(id))
                            .attr({ "title":       config.desc,
                                    "placeholder": config.title })
                            .css("border-color", config.color || "black")
                            .change(change);
    }; // create()

    return create;
});
