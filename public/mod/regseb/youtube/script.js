/* @flow */
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

            var users = Array.isArray(args.user) ? args.user : [args.user];
            var promises = [];
            users.forEach(function (user) {
                promises.push(
                    $.getJSON("https://www.googleapis.com/youtube/v3/channels" +
                              "?part=id&key=" + args.key + "&forUsername=" +
                              user).then(function (data) {
                        return data.items[0].id;
                    })
                );
            });

            Promise.all(promises).then(function (users) {
                gates[id] = {
                    "users": users,
                    "size":  $root.height() / 14 - 1,
                    "key":   args.key,
                    "cron":  new Cron(args.cron, update, id)
                };

                if (1 === Object.keys(gates).length)
                    document.addEventListener("visibilitychange", function () {
                        for (var id in gates)
                            if (!gates[id].cron.status())
                                update(id);
                    });

                update(id);
            });
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
            extract(user, args.size, args.key).then(function (items) {
                items.forEach(function (item) {
                    display($root, item, args.size);
                });
            });
        });
    }; // update()

    var extract = function (user, size, key) {
        var url = "https://www.googleapis.com/youtube/v3/activities?key=" +
                  key + "&part=snippet,contentDetails&channelId=" + user +
                  // FIXME Trouver une solution pour récupérer seulement les
                  //       vidéos postées.
                  "&maxResults=" + (5 * size);
        return $.getJSON(url).then(function (data) {
            var items = [];
            data.items.forEach(function (item) {
                if (!item.contentDetails || !item.contentDetails.upload)
                    return;
                items.push({
                    "title": item.snippet.title,
                    "desc":  item.snippet.description,
                    "link":  "https://www.youtube.com/watch?v=" +
                             item.contentDetails.upload.videoId,
                    "guid":  item.contentDetails.upload.videoId,
                    "date":  new Date(item.snippet.publishedAt).getTime()
                });
            });
            return items.splice(0, size);
        });
    }; // extract()

    var display = function ($root, data, size) {
        var $li = $("li[data-guid=\"" + data.guid + "\"]", $root);

        if (!$li.length) { // Si l'évènement n'est pas affiché.
            // Trouver la future position chronologique de l'évènement.
            var pos = -1;
            $("> ul > li", $root).each(function (i) {
                if (data.date <= $(this).data("date"))
                    pos = i;
            });
            if (pos !== size - 1) {
                // Supprimer le plus ancien évènement (si la liste est pleine).
                $("> ul > li:eq(" + (size - 1) + ")", $root).remove();

                // Créer la ligne du nouvel évènement.
                $li = $("<li>").attr("data-guid", data.guid)
                               .data("date", data.date)
                               .append($("<a>").attr({ "href":   data.link,
                                                       "target": "_blank" })
                                               .text(data.title));
                if ("" !== data.desc)
                    $li.append($("<span>").html(data.desc));

                if (-1 === pos)
                    $("> ul", $root).prepend($li).fadeIn("slow");
                else
                    $("> ul > li:eq(" + pos + ")", $root).after($li)
                                                         .fadeIn("slow");
            }
        } else { // Si l'évènement est déjà affiché.
            // Si des éléments de l'évènement ont changé, les mettre à jour.
            var $a = $("> a", $li);
            if ($a.attr("href") !== data.link)
                $a.attr("href", data.link);
            if ($a.text() !== data.title)
                $a.text(data.title);
            if ($a.next().html() !== data.desc)
                $a.next().html(data.desc);
        }
    }; // display()

    return create;

});
