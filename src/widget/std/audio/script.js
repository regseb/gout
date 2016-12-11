define(["jquery"], function ($) {
    "use strict";

    const change = function () {
        const $root = $(this).closest("article");
        const audio = $("audio", $root)[0];

        const volume = $(this).val();
        audio.volume = volume / 100.0;
        if (0 === volume) {
            audio.pause();
        } else {
            audio.play();
        }
    }; // change()

    const create = function (id, { "config.json": config, "icon.svg": icon }) {
        const $root = $("#" + id);

        $root.css("background-color", config.color);
        $("a", $root).attr("href", config.link);
        $("img", $root).attr("src", "data:image/svg+xml;base64," + btoa(icon));
        if (!("desc" in config) || null === config.desc || "" === config.desc) {
            $("span", $root).remove();
        } else {
            $("span", $root).html(config.desc);
        }

        $("audio", $root).attr("src", config.url);

        $("input", $root).change(change);
    }; // create()

    return create;
});
