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

        // Recuperer les actualites de chaque flux.
        for (var i in args.urls) {
            var url = args.urls[i];
            extract(url, args.size).then(function(data) {
                for (var i in data)
                    add(id, args, i, data[i]);
            });
        }
    }; // update()

    var add = function(id, args, i, data) {
        var a = $("#" + id + " a[href=\"" + data.link + "\"]");

        if (!$(a).length) { // Si l'actualite n'est pas affichee.
            // Trouver la future position chronologique de l'actualite.
            var pos = -1;
            $("#" + id + " > ul > li").each(function(i) {
                if (data.date < $(this).data("date"))
                    pos = i;
                else
                    return false;
            });
            if (pos !== args.size) {
                // Supprimer la plus ancienne actualite.
                $("#" + id + " > ul > li:gt(" + (args.size - 2) + ")").remove();

                // Creer la ligne de la nouvelle actualite.
                var li = $("<li>");
                $(li).data("date", data.date);
                $(li).append($("<a>").attr({ "href":   data.link,
                                             "target": "_blank" })
                                     .text(data.title));
                if ("" !== data.desc)
                    $(li).append($("<span>").html(data.desc));

                if (-1 === pos)
                    $("#" + id + " > ul").prepend(li).fadeIn("slow");
                else
                    $("#" + id + " > ul > li:eq(" + pos + ")").after(li)
                                                                .fadeIn("slow");
            }
        } else { // Si l'actualite est deja affichee.
            // Si des elements de l'actualite ont change, les mettre a jour.
            if ($(a).text() !== data.title)
                $(a).text(data.title);
            if ($(a).next().html() !== data.desc)
                $(a).next().html(data.desc);
        }
    }; // add()

    var extract = function(url, size) {
        url = "https://ajax.googleapis.com/ajax/services/feed/load?v=1.0" +
              "&num=" + size + "&q=" + encodeURIComponent(url) + "&callback=?";
        return $.getJSON(url).then(function(data) {
            var items = [];
            for (var i in data.responseData.feed.entries) {
                var entry = data.responseData.feed.entries[i];
                items.push({
                    "title": entry.title,
                    "desc":  entry.content,
                    "link":  entry.link,
                    "date":  new Date(entry.publishedDate).getTime()
                });
            }
            return items;
        });
    }; // extract()

    app.mod["std/feed"] = create;

})();