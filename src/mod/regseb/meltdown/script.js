define(["jquery", "scronpt"], function ($, Cron) {
    "use strict";

    const gates = {};

    const extract = function (city) {
        const url = "http://www.meltdown.bar/" + city + "/planning";
        return $.get(url).then(function (data) {
            const day = (new Date().getDay() + 6) % 7;
            const $data = $("#event-detail_0" + day, data);
            return $(".event-detail", $data).map(function () {
                return {
                    "title": $("h3", this).text(),
                    "desc":  $("p", this).text(),
                    "hour":  $("span:first", this).text().trim()
                };
            }).get();
        });
    }; // extract()

    const display = function ($root, data) {
        $("a", $root).text(data.map((event) => event.title).join(" / "));
        $("span", $root).html(data.map(function (event) {
            return "<strong>" + event.title + "</strong> (" + event.hour +
                   ") : " + event.desc;
        }).join("<br />"));
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
        extract(args.city).then(function (data) {
            display($root, data);
        });
    }; // update()

    const create = function (id, url) {
        $.getJSON(url + "/config.json").then(function (args) {
            const $root = $("#" + id);
            $root.css("background-color", args.color || "#4caf50");
            $("a", $root).attr("href", "http://www.meltdown.bar/" + args.city +
                                       "/planning");

            gates[id] = {
                "city": args.city,
                // Par défaut, mettre à jour chaque matin à 6h.
                "cron": new Cron(args.cron || "0 6 * * *", update, id)
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
