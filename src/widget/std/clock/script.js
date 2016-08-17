define(["jquery"], function ($) {
    "use strict";

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

    const animate = function () {
        const svg = $(this)[0].contentDocument;
        const now = new Date();

        const view = svg.rootElement.getAttribute("viewBox").split(" ");
        const cx = parseInt(view[2], 10) / 2;
        const cy = parseInt(view[3], 10) / 2;
        const center = "0, " + cx + ", " + cy + "; 360, " + cx + ", " + cy;

        const seconds = now.getSeconds();
        for (let child of svg.getElementById("second").children) {
            child.setAttribute("transform",
                               "rotate(" + seconds * 6 + ", " + cx + ", " + cy +
                               ")");
        }
        svg.getElementById("second").appendChild(transform(svg, 60, center));


        const minutes = now.getMinutes() + seconds / 60;
        for (let child of svg.getElementById("minute").children) {
            child.setAttribute("transform",
                               "rotate(" + minutes * 6 + ", " + cx + ", " + cy +
                               ")");
        }
        svg.getElementById("minute").appendChild(transform(svg, 3600, center));

        const hours = now.getHours() + minutes / 60;
        for (let child of svg.getElementById("hour").children) {
            child.setAttribute("transform",
                               "rotate(" + hours * 30 + ", " + cx + ", " + cy +
                               ")");
        }
        svg.getElementById("hour").appendChild(transform(svg, 43200, center));
    }; // animate()

    const create = function (id, url, config) {
        // FIXME Rendre paramétrable le fuseau horaire.
        const $root = $("#" + id);
        $root.css("background-color", config.color);

        $("object", $root).on("load", animate)
                          .attr("data", url + "/clock.svg");
    }; // create()

    return create;
});
