(function() {
    "use strict";

    var gates = { };

    var create = function(id, url) {
        $.getJSON(url + "/config.json", function(args) {
            $("#" + id).css({
                "background-color": args.color,
                "background-image": "url(\"" + url + "/icon.svg\")"
            });

            var users = Array.isArray(args.user) ? args.user : [ args.user ];
            var promises = [];
            for (var i in users) {
                var user = users[i];
                promises.push(
                    $.getJSON("https://www.googleapis.com/youtube/v3/channels" +
                              "?part=id&key=" + args.key + "&forUsername=" +
                              user).then(function(data) {
                        return data.items[0].id;
                    })
                );
            }

            Promise.all(promises).then(function(users) {
                gates[id] = {
                    "key": args.key,
                    "users": users,
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
        for (var i in args.users) {
            var user = args.users[i];
            extract(args.key, user, args.size).then(function(data) {
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

    var extract = function(key, user, size) {
        var url = "https://www.googleapis.com/youtube/v3/activities?key=" +
                  key + "&part=snippet,contentDetails&channelId=" + user +
                  "&maxResults=" + (5 * size);
        return $.getJSON(url).then(function(data) {
            var events = [];
            for (var i in data.items) {
                var item = data.items[i];
                if (!item.contentDetails || !item.contentDetails.upload)
                    continue;
                events.push({
                    "title": item.snippet.title,
                    "desc":  item.snippet.description,
                    "link":  "https://www.youtube.com/watch?v=" +
                             item.contentDetails.upload.videoId,
                    "guid":  item.contentDetails.upload.videoId,
                    "date":  new Date(item.snippet.publishedAt).getTime()
                });
            }
            return events.splice(0, size);
        });
    }; // extract()

    app.mod["fr/regseb/youtube"] = create;

})();
