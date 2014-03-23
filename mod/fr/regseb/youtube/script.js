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
                "users": (Array.isArray(args.user) ? args.user : [ args.user ]),
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

        // Recuperer les videos de chaque flux.
        for (var i in args.users) {
            var user = args.users[i];
            extract(user, args.size).then(function(data) {
                for (var i in data)
                    add(id, args, i, data[i]);
            });
        }
    }; // update()

    var add = function(id, args, i, data) {
        var a = $("#" + id + " a[href=\"" + data.link + "\"]");

        if (!$(a).length) { // Si la video n'est pas affichee.
            // Trouver la future position chronologique de la video.
            var pos = -1;
            $("#" + id + " > ul > li").each(function(i) {
                if (data.date < $(this).data("date"))
                    pos = i;
                else
                    return false;
            });
            if (pos !== args.size) {
                // Supprimer la plus ancienne video.
                $("#" + id + " > ul > li:gt(" + (args.size - 2) + ")").remove();

                // Creer la ligne de la nouvelle video.
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
        } else { // Si la video est deja affichee.
            // Si des elements de la video ont change, les mettre a jour.
            if ($(a).text() !== data.title)
                $(a).text(data.title);
            if ($(a).next().html() !== data.desc)
                $(a).next().html(data.desc);
        }
    }; // add()

    var extract = function(user, size) {
        var url = "http://gdata.youtube.com/feeds/api/users/" + user +
                  "/uploads?alt=json&max-results=" + size;
        return $.getJSON(url).then(function(data) {
            var items = [];
            for (var i in data.feed.entry) {
                var entry = data.feed.entry[i];
                items.push({
                    "title": entry.title.$t,
                    "desc":  entry.content.$t,
                    "link":  entry.link[0].href,
                    "date":  new Date(entry.updated.$t).getTime()
                });
            }
            return items;
        });
    }; // extract()

    app.mod["fr/regseb/youtube"] = create;

})();