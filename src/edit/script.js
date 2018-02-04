require.config({
    "baseUrl": "../lib"
});

define(["jquery"], function ($) {
    "use strict";

    // Supprimer les variables globales de jQuery.
    $.noConflict(true);

    const multiple14 = function (num) {
        return Math.round(num / 14) * 14;
    };

    let dataTransfer = null;

    const mousedown = function (event) {
        let target = event.target;
        if ("ARTICLE" === target.tagName || "key" === target.className) {
            target = "ARTICLE" === target.tagName ? target
                                                  : target.parentNode;
            const rect = target.getBoundingClientRect();
            dataTransfer = {
                "target": target,
                "left":   event.clientX - rect.left + document.body.scrollLeft,
                "top":    event.clientY - rect.top  + document.body.scrollTop
            };
        } else if ("resize" === target.className) {
            dataTransfer = {
                "target": target.parentNode,
                "width":  target.parentNode.offsetWidth - event.clientX,
                "height": target.parentNode.offsetHeight - event.clientY
            };
        }
    };

    const mousemove = function (event) {
        if (null === dataTransfer) {
            return;
        }
        if ("left" in dataTransfer) {
            const target = $(dataTransfer.target);
            target.css("left", multiple14(event.clientX - dataTransfer.left));
            target.css("top", multiple14(event.clientY - dataTransfer.top));
        } else if ("width" in dataTransfer) {
            const target = $(dataTransfer.target);
            target.width(multiple14(event.clientX + dataTransfer.width));
            target.height(multiple14(event.clientY + dataTransfer.height));
        }
    };

    const mouseup = function () {
        dataTransfer = null;
    };

    const set = function (key, widget) {
        const $dialog = $("#edit-dialog");
        if (undefined === key) {
            $("[name=\"origin\"]", $dialog).val("");
            $("[name=\"key\"]", $dialog).val("");
            $("[name=\"module\"]", $dialog).val("");
            $("[name=\"files\"]", $dialog).val("{}");
            $("[name=\"scrapers\"]", $dialog).val("[]");
            $("[value=\"Ajouter\"]", $dialog).show();
            $("[value=\"Supprimer\"]", $dialog).hide();
            $("[value=\"Enregistrer\"]", $dialog).hide();
        } else {
            $("[name=\"origin\"]", $dialog).val(key);
            $("[name=\"key\"]", $dialog).val(key);
            $("[name=\"module\"]", $dialog).val(widget.module);
            $("[name=\"files\"]", $dialog).val(
                                         JSON.stringify(widget.files, null, 4));
            $("[name=\"scrapers\"]", $dialog).val(
                                      JSON.stringify(widget.scrapers, null, 4));
            $("[value=\"Ajouter\"]", $dialog).hide();
            $("[value=\"Supprimer\"]", $dialog).show();
            $("[value=\"Enregistrer\"]", $dialog).show();
        }
    };

    const get = function () {
       const $dialog = $("#edit-dialog");
       return {
           "origin": $("[name=\"origin\"]", $dialog).val(),
           "key":    $("[name=\"key\"]", $dialog).val(),
           "widget": {
               "module":   $("[name=\"module\"]", $dialog).val(),
               "files":    JSON.parse($("[name=\"files\"]", $dialog).val()),
               "scrapers": JSON.parse($("[name=\"scrapers\"]", $dialog).val())
           }
       };
    };

    const dblclick = function (event) {
        set($(".key", event.target).text(), $(event.target).data("widget"));
        const dialog = document.getElementById("edit-dialog");
        dialogPolyfill.registerDialog(dialog);
        dialog.showModal();
    };

    const insert = function (key, widget) {
        const $article =
            $("<article>").attr("draggable", true)
                          .data("widget", widget)
                          .css({ "left": widget.coord.x * 1.4 + "em",
                                 "top":  widget.coord.y * 1.4 + "em" })
                          .width(widget.coord.w * 1.4 + "em")
                          .height(widget.coord.h * 1.4 + "em")
                          .html($("template").html())
                          .on("mousedown", mousedown)
                          .on("dblclick", dblclick);
        $(".key", $article).text(key);

        $("body").append($article);
    };

    const add = function () {
        set();
        const dialog = document.getElementById("edit-dialog");
        dialogPolyfill.registerDialog(dialog);
        dialog.showModal();
    };

    const code = function () {
        const config = {};
        $("article").each(function () {
            const $article = $(this);
            const widget = $article.data("widget");
            config[$(".key", $article).text()] = {
                "module": widget.module,
                "active": "active" in widget ? widget.active : true,
                "coord":  {
                    "x": Math.round($article.offset().left / 14),
                    "y": Math.round($article.offset().top / 14),
                    "w": Math.round($article.width() / 14),
                    "h": Math.round($article.height() / 14)
                },
                "files":    widget.files,
                "scrapers": widget.scrapers
            };
        });
        const dialog = document.getElementById("code-dialog");
        dialogPolyfill.registerDialog(dialog);
        $("textarea", dialog).val(JSON.stringify(config, null, 4));
        dialog.showModal();
    };

    $("button.add").click(add);
    $("button.code").click(code);

    $(document).on("mousemove", mousemove)
               .on("mouseup",   mouseup);

    document.getElementById("edit-dialog").addEventListener("close",
                                                            function () {
        if ("Ajouter" === this.returnValue) {
            const { key, widget } = get();
            insert(key, Object.assign(
                {}, widget, { "coord": { "x": 1, "y": 1, "w": 5, "h": 5 } }));
        } else if ("Supprimer" === this.returnValue) {
            const { origin } = get();
            $(".key").filter(function () {
                return origin === $(this).text();
            }).parent().remove();
        } else if ("Enregistrer" === this.returnValue) {
            const { origin, key, widget } = get();
            $(".key").filter(function () {
                return origin === $(this).text();
            }).text(key).parent().data("widget", widget);
        }
    });

    const load = function (key, widget) {
        // Définir des valeurs par défaut.
        widget.files    = widget.files    || {};
        widget.scrapers = widget.scrapers || [];

        const $article =
            $("<article>").attr("draggable", true)
                          .data("widget", widget)
                          .css({ "left": widget.coord.x * 14 + "px",
                                 "top":  widget.coord.y * 14 + "px" })
                          .width(widget.coord.w * 14 + "px")
                          .height(widget.coord.h * 14 + "px")
                          .html($("template").html())
                          .on("mousedown", mousedown)
                          .on("dblclick", dblclick);
        $(".key", $article).text(key);

        $("body").append($article);
    };

    // Récupérer les paramètres transmis dans l'URL.
    const params = new URL(window.location.href).searchParams;

    const dashboard = params.get("dashboard");
    $("a").attr("href", $("a").attr("href") + "?dashboard=" + dashboard);

    let config;
    if (params.has("config")) {
        config = params.get("config");
        $("a").attr("href", $("a").attr("href") + "&config=" + config);
    } else {
        config = "config";
    }

    // Charger les widgets contenus dans la configuration du tableau de bord.
    const url = "../widget/" + dashboard + "/" + config + ".json";
    fetch(url).then(function (response) {
        return response.json();
    }).then(function (widgets) {
        for (const [key, widget] of Object.entries(widgets)) {
            load(key, widget);
        }
    });
});
