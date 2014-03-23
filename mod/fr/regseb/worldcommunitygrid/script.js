(function() {
    "use strict";

    // TODO Faire une logo de WCG.

    var gates = { };

    var create = function(id, url) {
        $.getJSON(url + "/config.json", function(args) {
            $("#" + id).css("background-color", args.color);
            $("#" + id + " a").attr("href",
                                    "https://secure.worldcommunitygrid.org/" +
                                    "stat/viewMemberInfo.do?userName=" +
                                    args.user);

            gates[id] = {
                "user": args.user,
                "updated": true
            };

            // Mettre a jour les informations une fois par jour (a 1h du matin).
            setCron(update, "0 1 * * *", id);

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

        // Si la page est cachee : ne pas actualiser les informations et
        // indiquer qu'il faudrait actualiser les informations quand
        // l'utilisateur affichera la page.
        if (document.hidden) {
            args.updated = true;
            return;
        }
        args.updated = false;

        extract(args.user).then(function(data) {
            $("#" + id + " strong").text(data.points);
            $("#" + id + " em").text(data.rank);
        });
    }; // update()

    var extract = function(user) {
        var url = "gout.php?url=" +
                  encodeURIComponent("http://www.worldcommunitygrid.org/" +
                                     "getDynamicImage.do?memberName=" + user +
                                     "&stat=1&rankOn=true&language=fr_FR");
        return $.get(url).then(function(data) {
            return { "points": /\t([^\t&]+)&#160;Points/.exec(data)[1],
                     "rank": /\(Rang :&#160;&#35;([^(]+)\)/.exec(data)[1] };
        });
    }; // extract()

    app.mod["fr/regseb/worldcommunitygrid"] = create;

})();
