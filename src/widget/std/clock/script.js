define(["jquery", "scronpt"], function ($, Cron) {
    "use strict";

    const gates = {};

    const transform = function (svg, time, center) {
        const element = svg.createElementNS("http://www.w3.org/2000/svg",
                                            "animateTransform");
        element.setAttribute("attributeName", "transform");
        element.setAttribute("type",          "rotate");
        element.setAttribute("dur",           time + "s");
        element.setAttribute("values",        center);
        element.setAttribute("repeatCount",   "indefinite");
        return element;
    }; // transform()

    const update = function (id) {
        const $root = $("#" + id);
        const svg = $("object", $root)[0].contentDocument;
        const now = new Date();

        const view = svg.rootElement.getAttribute("viewBox").split(" ");
        const cx = parseInt(view[2], 10) / 2;
        const cy = parseInt(view[3], 10) / 2;

        const seconds = now.getSeconds();
        for (let child of svg.getElementById("second").children) {
            child.setAttribute("transform",
                               "rotate(" + seconds * 6 + ", " + cx + ", " + cy +
                               ")");
        }

        const minutes = now.getMinutes() + seconds / 60;
        for (let child of svg.getElementById("minute").children) {
            child.setAttribute("transform",
                               "rotate(" + minutes * 6 + ", " + cx + ", " + cy +
                               ")");
        }

        const hours = now.getHours() + minutes / 60;
        for (let child of svg.getElementById("hour").children) {
            child.setAttribute("transform",
                               "rotate(" + hours * 30 + ", " + cx + ", " + cy +
                               ")");
        }
    }; // update()

    const wake = function () {
        for (let id in gates) {
            if (!gates[id].cron.status()) {
                update(id);
            }
        }
    }; // wake()

    const create = function (id, { "config.json": config }) {
        const $root = $("#" + id);
        $root.css("background-color", config.color || "black");

        gates[id] = {
            "cron": new Cron(config.cron || "0 0 * * *", update, id)
        };

        const svg = $("object", $root)[0].contentDocument;

        const view = svg.rootElement.getAttribute("viewBox").split(" ");
        const cx = parseInt(view[2], 10) / 2;
        const cy = parseInt(view[3], 10) / 2;
        const center = "0, " + cx + ", " + cy + "; 360, " + cx + ", " + cy;

        svg.getElementById("second").appendChild(transform(svg, 60, center));
        svg.getElementById("minute").appendChild(transform(svg, 3600, center));
        svg.getElementById("hour").appendChild(transform(svg, 43200, center));

        if (1 === Object.keys(gates).length) {
            document.addEventListener("visibilitychange", wake);
        }

        update(id);
    }; // create()

    return create;
});
