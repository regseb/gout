/* global app, document, $, setCron */

(function() {
    "use strict";

    var gates = {};

    var prev = function() {
        var $root = $(this).closest("article");

        if ("0px" !== $("ul", $root).css("left")) {
            $("ul", $root).css("left",
                               parseInt($("ul", $root).css("left"), 10) +
                               parseInt($root.css("width"), 10));
            refresh($root);
        }
    }; // prev()

    var next = function() {
        var $root = $(this).closest("article");

        if (-1 * $root.width() * ($("li", $root).length - 1) + "px" !==
                $("ul", $root).css("left")) {
            $("ul", $root).css("left",
                               parseInt($("ul", $root).css("left"), 10) -
                               parseInt($root.css("width"), 10));
            refresh($root);
        }
    }; // next()

    var create = function(id, url) {
        $.getJSON(url + "/config.json").then(function(args) {
            var $root = $("#" + id);
            $("ul", $root).width($root.width() * args.size);
            $("span:first", $root).click(prev);
            $("span:last",  $root).click(next);

            // FIXME Trouver une solution propre pour charger du JavaScript.
            $.get(url + "/extract.js",
                  function() {}, "text").then(function(data) {
                gates[id] = {
                    "size":    args.size,
                    "updated": true
                };
                eval("gates[id].extract = " + data + ";");

                setCron(update, args.cron, id);

                if (1 === Object.keys(gates).length)
                    document.addEventListener("visibilitychange", function() {
                        for (var id in gates)
                            if (gates[id].updated)
                                update(id);
                    });

                update(id);
            });
        });
    }; // create()

    var update = function(id) {
        var args = gates[id];

        // Si la page est cachée : ne pas actualiser les données et indiquer
        // qu'il faudra mettre à jour les données quand l'utilisateur reviendra
        // sur la page.
        if (document.hidden) {
            args.updated = true;
            return;
        }
        args.updated = false;

        var $root = $("#" + id);
        args.extract(args.size).then(function(data) {
            for (var i in data)
                display($root, data[i], args.size);
            refresh($root);
        });
    }; // update()

    var display = function($root, data, size) {
        var $li = $("li[data-guid=\"" + data.guid + "\"]", $root);

        if (!$li.length) { // Si l'évènement n'est pas affiché.
            // Trouver la future position chronologique de l'évènement.
            var pos = -1;
            $("> ul > li", $root).each(function(i) {
                if (data.date <= $(this).data("date"))
                    pos = i;
            });
            if (pos !== size - 1) {
                // Supprimer le plus ancien évènement (si la liste est pleine).
                $("> ul > li:eq(" + (size - 1) + ")", $root).remove();

                // Créer la ligne du nouvel évènement.
                var $img = $("<img>").attr("src", data.img);
                $li = $("<li>").attr("data-guid", data.guid)
                               .data("date", data.date)
                               .height($root.height())
                               .width($root.width())
                               .append($("<a>").attr({ "href":   data.link,
                                                       "target": "_blank",
                                                       "title":  data.title })
                                               .append($img));

                if (-1 === pos)
                    $("> ul", $root).prepend($li);
                else
                    $("> ul > li:eq(" + pos + ")", $root).after($li);
            }
        } else { // Si l'évènement est déjà affiché.
            // Si des éléments de l'évènement ont changé, les mettre à jour.
            var $a = $("> a", $li);
            if ($a.attr("href") !== data.link)
                $a.attr("href", data.link);
            if ($a.attr("title") !== data.title)
                $a.attr("title", data.title);
            if ($("img", $a).attr("src") !== data.img)
                $("img", $a).attr("src", data.img);
        }
    }; // display()

    var refresh = function($root) {
        if ("0px" === $("ul", $root).css("left"))
            $("span:first", $root).css("cursor", "not-allowed");
        else
            $("span:first", $root).css("cursor", "pointer");

        if (-1 * $root.width() * ($("li", $root).length - 1) + "px" ===
                $("ul", $root).css("left"))
            $("span:last", $root).css("cursor", "not-allowed");
        else
            $("span:last", $root).css("cursor", "pointer");
    }; // refresh()

    app.mod["std/image"] = create;

})();
