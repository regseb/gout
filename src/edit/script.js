require.config({
    "baseUrl": "../lib"
});

define(["dialog-polyfill", "jquery"], function (dialogPolyfill, $) {
    "use strict";

    // Supprimer les variables globales de jQuery.
    $.noConflict(true);

    const multiple14 = function (num) {
        return Math.round(num / 14) * 14;
    }; // multiple14()

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
            $("[name=\"origin\"]", $dialog).val("");
            $("[name=\"key\"]", $dialog).val("");
            $("[name=\"widget\"]", $dialog).val("");
            $("[name=\"files\"]", $dialog).val("{}");
            $("[name=\"scrapers\"]", $dialog).val("[]");
            $("[value=\"Ajouter\"]", $dialog).show();
            $("[value=\"Supprimer\"]", $dialog).hide();
            $("[value=\"Enregistrer\"]", $dialog).hide();
        } else {
            $("[name=\"origin\"]", $dialog).val(key);
            $("[name=\"key\"]", $dialog).val(key);
            $("[name=\"widget\"]", $dialog).val(gate.widget);
            $("[name=\"files\"]", $dialog).val(
                                           JSON.stringify(gate.files, null, 4));
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
           "origin": $("[name=\"origin\"]", $dialog).val(),
           "key":    $("[name=\"key\"]", $dialog).val(),
           "gate":   {
               "widget":   $("[name=\"widget\"]", $dialog).val(),
               "files":    JSON.parse($("[name=\"files\"]", $dialog).val()),
               "scrapers": JSON.parse($("[name=\"scrapers\"]", $dialog).val())
           }
       };
    }; // get()

    const dblclick = function (event) {
        set($(".key", event.target).text(), $(event.target).data("gate"));
        const dialog = document.getElementById("edit-dialog");
        dialogPolyfill.registerDialog(dialog);
        dialog.showModal();
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
                "files":    gate.files,
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

    document.getElementById("edit-dialog").addEventListener("close",
                                                            function () {
        if ("Ajouter" === this.returnValue) {
            const { key, gate } = get();
            insert(key, Object.assign(
                {}, gate, { "coord": { "x": 1, "y": 1, "w": 5, "h": 5 } }));
        } else if ("Supprimer" === this.returnValue) {
            const { origin } = get();
            $(".key:contains(\"" + origin + "\")").parent().remove();
        } else if ("Enregistrer" === this.returnValue) {
            const { origin, key, gate } = get();
            $(".key:contains(\"" + origin + "\")").text(key)
                                                  .parent()
                                                  .data("gate", gate);
        }
    });

    const load = function (key, gate) {
        // Définir des valeurs par défaut.
        gate.files    = gate.files    || {};
        gate.scrapers = gate.scrapers || [];

        const $article =
            $("<article>").attr("draggable", true)
                          .data("gate", gate)
                          .css({ "left": gate.coord.x * 14 + "px",
                                 "top":  gate.coord.y * 14 + "px" })
                          .width(gate.coord.w * 14 + "px")
                          .height(gate.coord.h * 14 + "px")
                          .html($("template").html())
                          .on("mousedown", mousedown)
                          .on("dblclick", dblclick);
        $(".key", $article).text(key);

        $("body").append($article);
    }; // load()

    // Récupérer les paramètres transmits dans l'URL.
    const params = new URLSearchParams(window.location.search.slice(1));
    const dashboard = params.get("dashboard");
    const config    = params.has("config") ? params.get("config")
                                           : "config";

    $("a").attr("href", $("a").attr("href") + "?dashboard=" + dashboard);
    if ("config" !== config) {
        $("a").attr("href", $("a").attr("href") + "&config=" + config);
    }
    // Charger les passerelles contenues dans la configuration du tableau de
    // bord.
    const url = "../gate/" + dashboard + "/" + config + ".json";
    fetch(url).then(function (response) {
        return response.json();
    }).then(function (gates) {
        for (const key in gates) {
            load(key, gates[key]);
        }
    });
});
