/* global app, document, $, setCron */

(function() {
    "use strict";

    var gates = { };

    var create = function(id, url) {
        $.getJSON(url + "/config.json").then(function(args) {
            var $root = $("#" + id);
            $root.css({
                "background-color": args.color,
                "background-image": "url(\"" + url + "/icon.svg\")"
            });

            gates[id] = {
                "users":   Array.isArray(args.user) ? args.user : [ args.user ],
                "size":    $root.height() / 14 - 1,
                "key":     args.key,
                "updated": true
            };

            setCron(update, args.cron, id);

            if (1 === Object.keys(gates).length)
                document.addEventListener("visibilitychange", function() {
                    for (var id in gates)
                        if (gates[id].updated)
                            update(id);
                });

            update(id);
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
        for (var i in args.users)
            extract(args.users[i], args.size, args.key).then(function(data) {
                for (var i in data)
                    display($root, data[i], args.size);
            });
    }; // update()

    var extract = function(user, size, key) {
        var url = "https://www.googleapis.com/plus/v1/people/" + user +
                  "/activities/public?key=" + key + "&maxResults=" + size;
        return $.getJSON(url).then(function(data) {
            var items = [];
            for (var i in data.items) {
                var item = data.items[i];
                items.push({
                    "title": item.title,
                    "desc":  "",
                    "link":  item.url,
                    "guid":  item.id,
                    "date":  new Date(item.updated).getTime()
                });
            }
            return items;
        });
    }; // extract()

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

    app.mod["regseb/googleplus"] = create;

})();