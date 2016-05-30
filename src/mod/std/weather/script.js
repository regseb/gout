define(["jquery", "scronpt"], function ($, Cron) {
    "use strict";

    const IMG_DIR = "mod/std/weather/img/";

    const gates = {};

    const extract = function (city, appid, kind) {
        let url = "http://api.openweathermap.org/data/2.5/";
        // Si c'est la météo du jour qui est demandée.
        if ("weather" === kind) {
            url += "weather?q=" + city + "&units=metrics&lang=fr&APPID=" +
                   appid + "&callback=?";
            return $.getJSON(url).then(function (data) {
                return {
                    "icon": data.weather[0].icon,
                    "desc": data.weather[0].description,
                    "help": data.weather[0].main,
                    "temp": {
                        "min": Math.round(data.main["temp_min"] - 273.15),
                        "max": Math.round(data.main["temp_max"] - 273.15)
                    },
                    "wind": {
                        "speed": Math.round(data.wind.speed * 3.6),
                        "deg":   data.wind.deg + 360 % 360
                    }
                };
            });
        }
        // Sinon : c'est les prévisions.
        url += "forecast/daily?q=" + city + "&units=metrics&lang=fr&cnt=2" +
               "&APPID=" + appid + "&callback=?";
        return $.getJSON(url).then(function (data) {
            const items = [];
            for (let item of data.list) {
                items.push({
                    "icon": item.weather[0].icon,
                    "desc": item.weather[0].description,
                    "help": item.weather[0].main,
                    "temp": { "min": Math.round(item.temp.min - 273.15),
                              "max": Math.round(item.temp.max - 273.15) },
                    "wind": { "speed": Math.round(item.speed * 3.6),
                              "deg":   item.deg + 360 % 360 }
                });
            }
            return items;
        });
    }; // extract()

    const display = function ($root, data) {
        const $li = $("<li>");
        let $p = $("<p>");

        const date = new Date();
        date.setDate(date.getDate() +  $("li", $root).length);
        $p.append($("<strong>").text(
            date.toLocaleString("fr-FR", { "weekday": "long" })));

        $p.append($("<img>", { "src":    IMG_DIR + data.icon + ".svg",
                               "alt":    data.desc,
                               "title":  data.help,
                               "width":  32,
                               "height": 32 }));

        $li.append($p);

        $p = $("<p>");

        $p.append($("<span>").addClass("temp")
                             .text(data.temp.min + " / " +
                                   data.temp.max + " °C"));

        let dir = "";
        if (22.5 > data.wind.deg) {
            dir = "nord";
        } else if (67.5  > data.wind.deg) {
            dir = "nord-est";
        } else if (112.5 > data.wind.deg) {
            dir = "est";
        } else if (157.5 > data.wind.deg) {
            dir = "sud-est";
        } else if (202.5 > data.wind.deg) {
            dir = "sud";
        } else if (247.5 > data.wind.deg) {
            dir = "sud-ouest";
        } else if (292.5 > data.wind.deg) {
            dir = "ouest";
        } else if (337.5 > data.wind.deg) {
            dir = "nord-ouest";
        } else {
            dir = "nord";
        }
        const $dir = $("<img>").attr({ "src":   IMG_DIR + "wind.svg",
                                       "alt":   "^",
                                       "title": dir })
                               .css("transform",
                                    "rotate(" + data.wind.deg + "deg)");

        $p.append($("<span>").addClass("wind")
                             .append($dir)
                             .append(data.wind.speed + " km/h"));

        $li.append($p);

        $("ul", $root).append($li);
    }; // display()

    const update = function (id) {
        const args = gates[id];

        // Si la page est cachée : ne pas actualiser les données et indiquer
        // qu'il faudra mettre à jour les données quand l'utilisateur reviendra
        // sur la page.
        if (document.hidden) {
            args.cron.stop();
            return;
        }
        args.cron.start();

        const $root = $("#" + id);
        $("ul", $root).empty();

        // Récupérer la météo du jour.
        extract(args.city, args.appid, "weather").then(function (item) {
            display($root, item);
        });

        // Récupérer les prévisions.
        extract(args.city, args.appid, "forecast").then(function (items) {
            for (let item of items) {
                display($root, item);
            }
        });
    }; // update()

    const create = function (id, url) {
        $.getJSON(url + "/config.json").then(function (args) {
            const $root = $("#" + id);
            $root.css("background-color", args.color || "#03a9f4");
            $("h1", $root).text(args.city.split(",")[0]);

            gates[id] = {
                "city":  args.city,
                "appid": args.appid,
                "cron":  new Cron(args.cron || "0 * * * *", update, id)
            };

            if (1 === Object.keys(gates).length) {
                document.addEventListener("visibilitychange", function () {
                    for (let id in gates) {
                        if (!gates[id].cron.status()) {
                            update(id);
                        }
                    }
                });
            }

            update(id);
        });
    }; // create()

    return create;
});
