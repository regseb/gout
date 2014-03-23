(function() {
    "use strict";

    var gates = { };

    var create = function(id, url) {
        $.getJSON(url + "/config.json", function(args) {
            $("#" + id + " canvas").attr({
                "width": $("#" + id).width(),
                "height": $("#" + id).height()
            });

            $.get(url + "/extract.js", function(data) {
                gates[id] = {
                    "url":     args.url,
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
            }, "text");
        });
    }; // create()

    var update = function(id) {
        var args = gates[id];

        // Si la page est cachee : ne pas actualiser l'image et se souvenir
        // qu'il faudra actualiser l'image quand l'utilisateur affichera la
        // page.
        if (document.hidden) {
            args.updated = true;
            return;
        }
        args.updated = false;

        $.get("gout.php?url=" + encodeURIComponent(args.url), function(data) {
            data = args.extract(data);

            var img = new Image();
            img.onload = function() {
                var canvas = $("#" + id + " canvas");
                var ctx = canvas[0].getContext("2d");
                var delta = Math.min(canvas.width()  / img.width,
                                     canvas.height() / img.height);
                var width  = img.width  * delta;
                var height = img.height * delta;
                ctx.drawImage(img, (canvas.width()  - width) / 2,
                                   (canvas.height() - height) / 2,
                                   width, height);

                $("#" + id + " a").attr({ "href":  data.link,
                                          "title": data.title });
            };
            img.src = data.img;
        }, "html");
    }; // update()

    app.mod["std/image"] = create;

})();