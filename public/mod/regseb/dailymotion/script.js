/* global document, Promise, define */

define(["jquery", "scronpt"], function ($, Cron) {
    "use strict";

    var gates = {};

    var create = function (id, url) {
        $.getJSON(url + "/config.json").then(function (args) {
            var $root = $("#" + id);
            $root.css({
                "background-color": args.color,
                "background-image": "url(\"" + url + "/icon.svg\")"
            });

            gates[id] = {
                "users": Array.isArray(args.user) ? args.user : [args.user],
                "size":  $root.height() / 14 - 1,
                "cron":  new Cron(args.cron, update, id)
            };

            if (1 === Object.keys(gates).length) {
                document.addEventListener("visibilitychange", function () {
                    for (var id in gates) {
                        if (!gates[id].cron.status()) {
                            update(id);
                        }
                    }
                });
            }

            update(id);
        });
    }; // create()

    var update = function (id) {
        var args = gates[id];

        // Si la page est cachée : ne pas actualiser les données et indiquer
        // qu'il faudra mettre à jour les données quand l'utilisateur reviendra
        // sur la page.
        if (document.hidden) {
            args.cron.stop();
            return;
        }
        args.cron.start();

        var $root = $("#" + id);
        args.users.forEach(function (user) {
            extract(user, args.size).then(function (items) {
                for (var item of items) {
                    display($root, item, args.size);
                }
            });
        });
    }; // update()

    var extract = function (user, size, key) {
        var url = "https://api.dailymotion.com/user/" + user + "/videos"
                + "?fields=title,description,url,id,created_time"
                  "&limit=" + size;
        return $.getJSON(url).then(function (data) {
            console.log(data);
            var items = [];
            for (var item of data.list) {
                items.push({
                    "title": item.title,
                    "desc":  item.description,
                    "link":  item.url,
                    "guid":  item.id,
                    "date":  item.created_time
                });
            }
            return items;
        });
    }; // extract()

    var display = function ($root, data, size) {
        var $li = $("li[data-guid=\"" + data.guid + "\"]", $root);

        if (!$li.length) { // Si l'évènement n'est pas affiché.
            // Trouver la future position chronologique de l'évènement.
            var pos = -1;
            $("> ul > li", $root).each(function (i) {
                if (data.date <= $(this).data("date")) {
                    pos = i;
                }
            });
            console.log(pos);
            if (pos !== size - 1) {
                // Supprimer le plus ancien évènement (si la liste est pleine).
                $("> ul > li:eq(" + (size - 1) + ")", $root).remove();

                // Créer la ligne du nouvel évènement.
                $li = $("<li>").attr("data-guid", data.guid)
                               .data("date", data.date)
                               .append($("<a>").attr({ "href":   data.link,
                                                       "target": "_blank" })
                                               .text(data.title));
                if ("" !== data.desc) {
                    $li.append($("<span>").html(data.desc));
                }

                if (-1 === pos) {
                    $("> ul", $root).prepend($li).fadeIn("slow");
                } else {
                    $("> ul > li:eq(" + pos + ")", $root).after($li)
                                                         .fadeIn("slow");
                }
            }
        } else { // Si l'évènement est déjà affiché.
            // Si des éléments de l'évènement ont changé, les mettre à jour.
            var $a = $("> a", $li);
            if ($a.attr("href") !== data.link) {
                $a.attr("href", data.link);
            }
            if ($a.text() !== data.title) {
                $a.text(data.title);
            }
            if ($a.next().html() !== data.desc) {
                $a.next().html(data.desc);
            }
        }
    }; // display()

    return create;

});
