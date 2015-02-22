/* @flow */
/* global document, define */

define(["jquery", "scronpt"], function ($, Cron) {
    "use strict";

    // TODO Afficher le météo du jour sur la même ligne que le nom de la ville.

    var IMG_DIR = "mod/std/weather/img/";

    var gates = {};

    var create = function (id, url) {
        $.getJSON(url + "/config.json").then(function (args) {
            var $root = $("#" + id);
            $root.css("background-color", args.color || "#03a9f4");
            $("h1", $root).text(args.city.split(",")[0]);

            gates[id] = {
                "city":  args.city,
                "appid": args.appid,
                "cron":  new Cron(args.cron || "0 * * * *", update, id)
            };

            if (1 === Object.keys(gates).length)
                document.addEventListener("visibilitychange", function () {
                    for (var id in gates)
                        if (!gates[id].cron.status())
                            update(id);
                });

            update(id);
        });
    }; // create()

    var update = function (id) {
        var args = gates[id];

        // Si la page est cachée : ne pas actualiser la météo et indiquer qu'il
        // faudrait actualiser la météo quand l'utilisateur affichera la page.
        if (document.hidden) {
            args.cron.stop();
            return;
        }
        args.cron.start();

        var $root = $("#" + id);
        $("ul", $root).empty();

        // Récupérer la météo du jour.
        extract(args.city, args.appid, "weather").then(function (item) {
            display($root, item);
        });

        // Récupérer les prévisions.
        extract(args.city, args.appid, "forecast").then(function (items) {
            items.forEach(function (item) {
                display($root, item);
            });
        });
    }; // update()

    var extract = function (city, appid, kind) {
        var url = "http://api.openweathermap.org/data/2.5/";
        // Si c'est la météo du jour qui est demandée.
        if ("weather" === kind) {
            url += "weather?q=" + city + "&units=metrics&lang=fr&APPID=" +
                   appid + "&callback=?";
            return $.getJSON(url).then(function (data) {
                return {
                    "icon": data.weather[0].icon,
                    "desc": data.weather[0].description,
                    "help": data.weather[0].main,
                    "temp": { "min": Math.round(data.main.temp_min - 273.15),
                              "max": Math.round(data.main.temp_max - 273.15) },
                    "wind": { "speed": Math.round(data.wind.speed * 3.6),
                              "deg":   data.wind.deg + 360 % 360 }
                };
            });
        }
        // Sinon : c'est les prévisions.
        url += "forecast/daily?q=" + city + "&units=metrics&lang=fr&cnt=2" +
               "&APPID=" + appid + "&callback=?";
        return $.getJSON(url).then(function (data) {
            var items = [];
            data.list.forEach(function (item) {
                items.push({
                    "icon": item.weather[0].icon,
                    "desc": item.weather[0].description,
                    "help": item.weather[0].main,
                    "temp": { "min": Math.round(item.temp.min - 273.15),
                              "max": Math.round(item.temp.max - 273.15) },
                    "wind": { "speed": Math.round(item.speed * 3.6),
                              "deg":   item.deg + 360 % 360 }
                });
            });
            return items;
        });
    }; // extract()

    var display = function ($root, data) {
        var $li = $("<li>");
        var $p = $("<p>");

        var date = new Date();
        date.setDate(date.getDate() +  $("li", $root).length);
        $p.append($("<strong>").text(date.format("EEEEE")));

        $p.append($("<img>", { "src": IMG_DIR + data.icon + ".svg",
                               "alt": data.desc,
                               "title": data.help,
                               "width": 32,
                               "height": 32 }));

        $li.append($p);

        $p = $("<p>");

        $p.append($("<span>").addClass("temp")
                             .text(data.temp.min + " / " +
                                   data.temp.max + " °C"));

        var dir = "";
        if      (data.wind.deg <  22.5) dir = "nord";
        else if (data.wind.deg <  67.5) dir = "nord-est";
        else if (data.wind.deg < 112.5) dir = "est";
        else if (data.wind.deg < 157.5) dir = "sud-est";
        else if (data.wind.deg < 202.5) dir = "sud";
        else if (data.wind.deg < 247.5) dir = "sud-ouest";
        else if (data.wind.deg < 292.5) dir = "ouest";
        else if (data.wind.deg < 337.5) dir = "nord-ouest";
        else                            dir = "nord";
        var $dir = $("<img>").attr({ "src": IMG_DIR + "wind.svg",
                                     "alt": "^",
                                     "title": dir })
                             .css("transform",
                                  "rotate(" + data.wind.deg + "deg)");

        $p.append($("<span>").addClass("wind")
                             .append($dir)
                             .append(data.wind.speed + " km/h"));

        $li.append($p);

        $("ul", $root).append($li);
    }; // display()

    return create;

});
