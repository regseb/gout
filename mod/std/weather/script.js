(function() {
    "use strict";

    // TODO Afficher une fleche pour indiquer l'orientation du vent.
    // TODO Dessiner un symbol pour les alertes : vent, froid, orages, canicule,
    //      pluie, avalanche, inondation, neige-verglas, vagues-submersion.
    // TODO Afficher le meteo du jour sur la meme ligne que le nom de la ville.

    var gates = { };

    var create = function(id, url) {
        $.getJSON(url + "/config.json", function(args) {
            $("#" + id).css("background-color", args.color);

            gates[id] = {
                "appid": args.appid,
                "city": args.city,
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

        // Si la page est cachee : ne pas actualiser la meteo et indiquer qu'il
        // faudrait actualiser la meteo quand l'utilisateur affichera la page.
        if (document.hidden) {
            args.updated = true;
            return;
        }
        args.updated = false;

        $("#" + id + " ul").empty();
        // Recuperer la meteo du jour.
        $.getJSON("http://api.openweathermap.org/data/2.5/weather?q=" +
                  args.city + "&units=metrics&lang=fr&APPID=" +
                  args.appid + "&callback=?",
                  function(data) {
            $("#" + id + " h1").text(data.name);
            add(id, extract(data));
        });

        // Recuperer les previsions.
        $.getJSON("http://api.openweathermap.org/data/2.5/forecast/daily?q=" +
                  args.city + "&units=metrics&lang=fr&cnt=2&APPID=" +
                  args.appid + "&callback=?",
                  function(data) {
            $.each(data.list, function(i, day) {
                add(id, extract(day));
            });
        });
    }; // load()

    var extract = function(data) {
        if ("name" in data) // Meteo du jour.
            return { "icon": data.weather[0].icon,
                     "desc": data.weather[0].description,
                     "help": data.weather[0].main,
                     "temp": { "min": data.main.temp_min,
                               "max": data.main.temp_max },
                     "wind": { "speed": data.wind.speed,
                               "deg":   data.wind.deg } };
        else // Previsions.
            return { "icon": data.weather[0].icon,
                     "desc": data.weather[0].description,
                     "help": data.weather[0].main,
                     "temp": { "min": data.temp.min,
                               "max": data.temp.max },
                     "wind": { "speed": data.speed,
                               "deg":   data.deg } };
    }; // extract()

    var add = function(id, data) {
        var li = $("<li>");
        var p = $("<p>");

        var date = new Date();
        date.setDate(date.getDate() +  $("#" + id + " li").length);
        $(p).append($("<strong>").text(date.format("EEEEE")));

        $(p).append($("<img>").attr({ "src": "mod/std/weather/img/" +
                                             data.icon + ".svg",
                                      "alt": data.desc,
                                      "title": data.help,
                                      "width": 32,
                                      "height": 32 }));

        $(li).append(p);

        p = $("<p>");

        $(p).append($("<span>").addClass("temp")
                               .text(
                Math.round(data.temp.min - 273.15) + " / " +
                Math.round(data.temp.max - 273.15) + " \u00b0C"));

        var deg = data.wind.deg + 360 % 360;
        var dir = "";
        if      (deg <  22.5) dir = "nord";
        else if (deg <  67.5) dir = "nord-est";
        else if (deg < 112.5) dir = "est";
        else if (deg < 157.5) dir = "sud-est";
        else if (deg < 202.5) dir = "sud";
        else if (deg < 247.5) dir = "sud-ouest";
        else if (deg < 292.5) dir = "ouest";
        else if (deg < 337.5) dir = "nord-est";
        else                  dir = "nord";
        $(p).append($("<span>").addClass("wind")
                               .text(Math.round(data.wind.speed * 3.6) +
                                     " km/h " + dir));

        $(li).append(p);

        $("#" + id + " ul").append(li);
    }; // add()

    app.mod["std/weather"] = create;

})();
