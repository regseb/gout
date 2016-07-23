define(["jquery"], function ($) {
    "use strict";

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
        const aniSeconds = svg.createElementNS("http://www.w3.org/2000/svg",
                                               "animateTransform");
        aniSeconds.setAttribute("attributeName", "transform");
        aniSeconds.setAttribute("type",          "rotate");
        aniSeconds.setAttribute("dur",           "60s");
        aniSeconds.setAttribute("values",        center);
        aniSeconds.setAttribute("repeatCount",   "indefinite");
        svg.getElementById("second").appendChild(aniSeconds);


        const minutes = now.getMinutes() + seconds / 60;
        for (let child of svg.getElementById("minute").children) {
            child.setAttribute("transform",
                               "rotate(" + minutes * 6 + ", " + cx + ", " + cy +
                               ")");
        }
        const aniMinutes = svg.createElementNS("http://www.w3.org/2000/svg",
                                               "animateTransform");
        aniMinutes.setAttribute("attributeName", "transform");
        aniMinutes.setAttribute("type",          "rotate");
        aniMinutes.setAttribute("dur",           "3600s");
        aniMinutes.setAttribute("values",        center);
        aniMinutes.setAttribute("repeatCount",   "indefinite");
        svg.getElementById("minute").appendChild(aniMinutes);

        const hours = now.getHours() + minutes / 60;
        for (let child of svg.getElementById("hour").children) {
            child.setAttribute("transform",
                               "rotate(" + hours * 30 + ", " + cx + ", " + cy +
                               ")");
        }
        const aniHours = svg.createElementNS("http://www.w3.org/2000/svg",
                                             "animateTransform");
        aniHours.setAttribute("attributeName", "transform");
        aniHours.setAttribute("type",          "rotate");
        aniHours.setAttribute("dur",           "43200s");
        aniHours.setAttribute("values",        center);
        aniHours.setAttribute("repeatCount",   "indefinite");
        svg.getElementById("hour").appendChild(aniHours);
    }; // animate()

    const create = function (id, url) {
        // FIXME Rendre paramétrable le fuseau horaire.
        const $root = $("#" + id);

        $("object", $root).load(animate)
                          .attr("data", url + "/clock.svg");
    }; // create()

    return create;
});
