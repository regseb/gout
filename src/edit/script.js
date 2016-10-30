require.config({
    "baseUrl": "lib"
});

/**
 * Calcule le multiple de 14 le plus proche.
 */
const multiple14 = function (num) {
    "use strict";

    return Math.round(num / 14) * 14;
}; // multiple14()

define(["jquery", "dialog-polyfill"], function ($, dialogPolyfill) {
    "use strict";

    // Supprimer les variables globales de jQuery.
    $.noConflict(true);

    let dataTransfer = null;

    const mousedown = function (event) {
        const target = event.target;
        if ("ARTICLE" === target.tagName) {
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
    }; // mousemove()

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
    }; // mousemove()

    const mouseup = function () {
        dataTransfer = null;
    }; // mouseup()

    const set = function (key, gate) {
        const $dialog = $("#edit-dialog");
        if (undefined === key) {
            $("[name=\"key\"]", $dialog).val("");
            $("[name=\"widget\"]", $dialog).val("");
            $("[name=\"config\"]", $dialog).val("null");
            $("[name=\"scrapers\"]", $dialog).val("[]");
            $("[value=\"Ajouter\"]", $dialog).show();
            $("[value=\"Supprimer\"]", $dialog).hide();
            $("[value=\"Enregistrer\"]", $dialog).hide();
        } else {
            $("[name=\"key\"]", $dialog).val(key);
            $("[name=\"widget\"]", $dialog).val(gate.widget);
            $("[name=\"config\"]", $dialog).val(
                                          JSON.stringify(gate.config, null, 4));
            $("[name=\"scrapers\"]", $dialog).val(
                                        JSON.stringify(gate.scrapers, null, 4));
            $("[value=\"Ajouter\"]", $dialog).hide();
            $("[value=\"Supprimer\"]", $dialog).show();
            $("[value=\"Enregistrer\"]", $dialog).show();
        }
    }; // set()

    const get = function () {
       const $dialog = $("#edit-dialog");
       return {
           "key":  $("[name=\"key\"]", $dialog).val(),
           "gate": {
               "widget":   $("[name=\"widget\"]", $dialog).val(),
               "config":   JSON.parse($("[name=\"config\"]", $dialog).val()),
               "scrapers": JSON.parse($("[name=\"scrapers\"]", $dialog).val())
           }
       };
    }; // get()

    const dblclick = function (event) {
        set($(".key", event.target).text(), $(event.target).data("gate"));
        const dialog = document.getElementById("edit-dialog");
        dialogPolyfill.registerDialog(dialog);
        dialog.showModal();
        dialog.addEventListener("close", function () {
            if ("Supprimer" === this.returnValue) {
                $(event.target).remove();
            } else if ("Enregistrer" === this.returnValue) {
                const { gate } = get();
                $(event.target).data("gate", gate);
            }
        });
    }; // dblclick()

    const insert = function (key, gate) {
        const $article =
            $("<article>").attr("draggable", true)
                          .data("gate", gate)
                          .css({ "left": gate.coord.x * 1.4 + "em",
                                 "top":  gate.coord.y * 1.4 + "em" })
                          .width(gate.coord.w * 1.4 + "em")
                          .height(gate.coord.h * 1.4 + "em")
                          .html($("template").html())
                          .on("mousedown", mousedown)
                          .on("dblclick", dblclick);
        $(".key", $article).text(key);

        $("body").append($article);
    }; // insert()

    const add = function () {
        set();
        const dialog = document.getElementById("edit-dialog");
        dialogPolyfill.registerDialog(dialog);
        dialog.showModal();
        dialog.addEventListener("close", function () {
            if ("Ajouter" === this.returnValue) {
                const { key, gate } = get();
                insert(key, Object.assign({}, gate, { "coord": {
                                           "x": 1, "y": 1, "w": 5, "h": 5 } }));
            }
        });
    }; // add()

    const code = function () {
        const config = {};
        $("article").each(function () {
            const $article = $(this);
            const gate = $article.data("gate");
            config[$(".key", $article).text()] = {
                "widget": gate.widget,
                "active": "active" in gate ? gate.active : true,
                "coord":  {
                    "x": Math.round($article.offset().left / 14),
                    "y": Math.round($article.offset().top / 14),
                    "w": Math.round($article.width() / 14),
                    "h": Math.round($article.height() / 14)
                },
                "config":   gate.config,
                "scrapers": gate.scrapers
            };
        });
        const dialog = document.getElementById("code-dialog");
        dialogPolyfill.registerDialog(dialog);
        $("textarea", dialog).val(JSON.stringify(config, null, 4));
        dialog.showModal();
    }; // code()

    $("button.add").click(add);
    $("button.code").click(code);

    $(document).on("mousemove", mousemove)
               .on("mouseup",   mouseup);

    // Récupérer les paramètres transmits dans l'URL.
    const params = new URLSearchParams(window.location.search.slice(1));
    const user   = params.get("user")   || "default";
    const config = params.get("config") || "config";

    $.getJSON("../gate/" + user + "/" + config + ".json").then(
                                                              function (gates) {
        for (let key in gates) {
            insert(key, gates[key]);
        }
    }, (err) => console.log(err));
});
