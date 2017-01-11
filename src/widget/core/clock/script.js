define(["jquery", "scronpt"], function ($, Cron) {
    "use strict";

    const gates = {};

    const transform = function (time, center) {
        const element = document.createElementNS("http://www.w3.org/2000/svg",
                                                 "animateTransform");
        element.setAttribute("attributeName", "transform");
        element.setAttribute("type",          "rotate");
        element.setAttribute("dur",           time + "s");
        element.setAttribute("values",        center);
        element.setAttribute("repeatCount",   "indefinite");
        return element;
    }; // transform()

    const display = function ($root, time) {
        const date = new Date(time);
        const svg = $("object", $root).is("[data]")
                             ? $("object", $root)[0].contentDocument.rootElement
                             : $("svg", $root)[0];

        const view = svg.getAttribute("viewBox").split(" ");
        const cx = parseInt(view[2], 10) / 2;
        const cy = parseInt(view[3], 10) / 2;

        const seconds = date.getUTCSeconds();
        for (let child of svg.getElementById("second").children) {
            child.setAttribute("transform",
                               "rotate(" + seconds * 6 + ", " + cx + ", " + cy +
                               ")");
        }

        const minutes = date.getUTCMinutes() + seconds / 60;
        for (let child of svg.getElementById("minute").children) {
            child.setAttribute("transform",
                               "rotate(" + minutes * 6 + ", " + cx + ", " + cy +
                               ")");
        }

        const hours = date.getUTCHours() + minutes / 60;
        for (let child of svg.getElementById("hour").children) {
            child.setAttribute("transform",
                               "rotate(" + hours * 30 + ", " + cx + ", " + cy +
                               ")");
        }
    }; // update()

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
        args.scraper.extract().then(function (time) {
            display($root, time);
        });
    }; // update()

    const wake = function () {
        for (let id in gates) {
            if (!gates[id].cron.status()) {
                update(id);
            }
        }
    }; // wake()

    const create = function (id, { "config.json": config, "icon.svg": icon },
                             scrapers) {
        const $root = $("#" + id);
        $root.css("background-color", config.color || "black");
        if (undefined !== icon) {
            $("object", $root).removeAttr("data").html(icon);
        }

        gates[id] = {
            "scraper": scrapers[0],
            "cron":    new Cron(config.cron || "0 0 * * *", update, id)
        };

        const svg = $("object", $root).is("[data]")
                             ? $("object", $root)[0].contentDocument.rootElement
                             : $("svg", $root)[0];

        const view = svg.getAttribute("viewBox").split(" ");
        const cx = parseInt(view[2], 10) / 2;
        const cy = parseInt(view[3], 10) / 2;
        const center = "0, " + cx + ", " + cy + "; 360, " + cx + ", " + cy;

        svg.getElementById("second").appendChild(transform(60, center));
        svg.getElementById("minute").appendChild(transform(3600, center));
        svg.getElementById("hour").appendChild(transform(43200, center));

        if (1 === Object.keys(gates).length) {
            document.addEventListener("visibilitychange", wake);
        }

        update(id);
    }; // create()

    return create;
});
