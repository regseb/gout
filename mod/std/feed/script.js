(function() {
    "use strict";

    var gates = { };

    var create = function(id, url) {
        $.getJSON(url + "/config.json", function(args) {
            $("#" + id).css({
                "background-color": args.color,
                "background-image": "url(\"" + url + "/icon.svg\")"
            });

            gates[id] = {
                "urls": (Array.isArray(args.url) ? args.url : [ args.url ]),
                "size": args.size,
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

        // Si la page est cachee : ne pas actualiser les flux et indiquer qu'il
        // faudrait actualiser les flux quand l'utilisateur affichera la page.
        if (document.hidden) {
            args.updated = true;
            return;
        }
        args.updated = false;

        // Recuperer les evenements de chaque flux.
        for (var i in args.urls) {
            var url = args.urls[i];
            extract(url, args.size).then(function(data) {
                for (var i in data)
                    add(id, args, i, data[i]);
            });
        }
    }; // update()

    var add = function(id, args, i, data) {
        var $li = $("#" + id + " li[data-guid=\"" + data.guid + "\"]");

        if (!$li.length) { // Si l'evenement n'est pas affiche.
            // Trouver la future position chronologique de l'evenement.
            var pos = -1;
            $("#" + id + " > ul > li").each(function(i) {
                if (data.date <= $(this).data("date"))
                    pos = i;
            });
            if (pos !== args.size - 1) {
                // Supprimer le plus ancien evenement (si la liste est pleine).
                $("#" + id + " > ul > li:eq(" + (args.size - 1) + ")").remove();

                // Creer la ligne du nouvel evenement.
                $li = $("<li>").attr("data-guid", data.guid)
                               .data("date", data.date)
                               .append($("<a>").attr({ "href":   data.link,
                                                       "target": "_blank" })
                                               .text(data.title));
                if ("" !== data.desc)
                    $li.append($("<span>").html(data.desc));

                if (-1 === pos)
                    $("#" + id + " > ul").prepend($li).fadeIn("slow");
                else
                    $("#" + id + " > ul > li:eq(" + pos + ")").after($li)
                                                                .fadeIn("slow");
            }
        } else { // Si l'evenement est deja affiche.
            // Si des elements de l'evenement ont change, les mettre a jour.
            var $a = $("> a", $li);
            if ($a.attr("href") !== data.link)
                $a.attr("href", data.link);
            if ($a.text() !== data.title)
                $a.text(data.title);
            if ($a.next().html() !== data.desc)
                $a.next().html(data.desc);
        }
    }; // add()

    var extract = function(url, size) {
        return $.get(url).then(function(data) {
            // Si le serveur n'indique pas que les donnees sont au format XML :
            // il faut les convertir.
            if ("string" === typeof data)
                data = $.parseXML(data);

            var events = [];
            if ($("rss", data).length) // RSS 2.0.
                $("item:lt(" + size + ")", data).each(function(i, item) {
                    events.push({
                        "title": $("title", item).text(),
                        "desc":  $("description", item).text(),
                        "link":  $("link", item).text(),
                        "guid":  $("guid", item).text(),
                        "date":  new Date($("pubDate", item).text()).getTime()
                    });
                });
            else if ($("feed", data).length) // Atom 1.0.
                $("entry:lt(" + size + ")", data).each(function(i, entry) {
                    events.push({
                        "title": $("title", entry).text(),
                        "desc":  $("summary", entry).text(),
                        "link":  $("link", entry).attr("href"),
                        "guid":  $("id", entry).text(),
                        "date":  new Date($("updated", entry).text()).getTime()
                    });
                });

            for (var i in events) {
                var event = events[i];
                if ("" === event.guid)
                    event.guid = event.link;
            }

            return events;
        });
    }; // extract()

    app.mod["std/feed"] = create;

})();
