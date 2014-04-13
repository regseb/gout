var app = {
    "mod": { },

    "init": function() {
        "use strict";
        var query = window.location.query;
        if (!("user" in query)) {
            $("body").html("Parametre user manquant !");
            return;
        }
        if (!("config" in query))
            query.config = "config";

        $.ajaxSetup({
            "beforeSend": function(jqXHR, settings) {
                if (!settings.crossDomain || "json" === settings.dataType)
                    return true;
                settings.url = settings.url
                                        .replace(/^https:\/\//, "proxy/https/")
                                        .replace(/^http:\/\//,  "proxy/http/")
            }
        });

        // Ouvrir les portes vers l'exterieur.
        $.getJSON("gate/" + query.user + "/" + query.config + ".json",
                  function(gates) {
            $.each(gates, function(url, args) {
                if (false === args.active) return true;

                var id = "gate" + $("article").length;
                var clazz = args.module.replace(/\//g, "-");

                // Si le module est utilise pour la premiere fois.
                if (!(args.module in app.mod)) {
                    // Charger la feuille de style.
                    $.get("mod/" + args.module + "/style.css", function(data) {
                        $("style").append(data);
                    });
                    // Charger le JavaScript et le HTML.
                    $.ajaxSetup({ "async": false });
                    $.getScript("mod/" + args.module + "/script.js");
                    $("body").append(
                        $("<div>").load("mod/" + args.module + "/index.html")
                                  .addClass(clazz));
                    $.ajaxSetup({ "async": true });
                }

                $("body").append(
                    $("<article>").attr("id", id)
                                  .addClass(clazz)
                                  .css({ "left": args.coord.x * 10,
                                         "top":  args.coord.y * 10 })
                                  .width(args.coord.w * 10)
                                  .height(args.coord.h * 10)
                                  .html($("body > div." + clazz).html()));
                app.mod[args.module](id, "gate/" + query.user + "/" + url);
            });
        });
    } // init()
}; // app
