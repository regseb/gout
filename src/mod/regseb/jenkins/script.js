/* global document, define */

define(["jquery", "scronpt"], function ($, Cron) {
    "use strict";

    const gates = {};

    const extract = function (host, filters, size) {
        const url = host + "/api/json?tree=jobs[name,url,displayName," +
                                               "lastBuild[number,result]," +
                                               "modules[name,url,displayName," +
                                                       "lastBuild[number," +
                                                                 "result]]]";
        return $.get(url).then(function (data) {
            const items = [];
            for (let job of data.jobs) {
                // S'il y a des filtres et que le nom du job ne correspond à
                // aucune filtre : ignorer ce job.
                if (0 !== Object.keys(filters).length &&
                        !(job.name in filters)) {
                    continue;
                }

                if (null === filters[job.name]) {
                    if (null === job.lastBuild ||
                            "FAILURE" !== job.lastBuild.result &&
                            "ABORTED" !== job.lastBuild.result) {
                        continue;
                    }
                    items.push({
                        "title": job.displayName,
                        "desc":  job.lastBuild.result,
                        "link":  job.url,
                        "guid":  job.lastBuild.number
                    });
                    if (size === items.length) {
                        break;
                    }
                } else {
                    for (let module of job.modules) {
                        if (0 !== filters[job.name].length &&
                                -1 === filters[job.name].indexOf(module.name)) {
                            continue;
                        }
                        if (null === module.lastBuild ||
                                "FAILURE" !== module.lastBuild.result &&
                                "ABORTED" !== module.lastBuild.result) {
                            continue;
                        }
                        items.push({
                            "title": module.displayName + " (" +
                                     job.displayName + ")",
                            "desc":  module.lastBuild.result,
                            "link":  module.url,
                            "guid":  module.lastBuild.number
                        });
                        if (size === items.length) {
                            break;
                        }
                    }
                }
            }
            return items;
        });
    }; // extract()

    const display = function ($root, data) {
        const url = data.link + "#" + data.guid;
        const $li = $("<li>").append($("<a>").attr({ "href":   url,
                                                     "target": "_blank",
                                                     "title":  data.desc })
                                             .text(data.title));
        $("> ul", $root).append($li);
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
        extract(args.host, args.filters, args.size).then(function (items) {
            if (0 === items.length) {
                $("ul", $root).hide();
                $("p", $root).show();
            } else {
                $("p", $root).hide();
                $("ul", $root).show()
                              .empty();
                for (let item of items) {
                    display($root, item);
                }
            }
        });
    }; // update()

    const create = function (id, url) {
        $.getJSON(url + "/config.json").then(function (args) {
            const $root = $("#" + id);
            $root.css({
                "background-color": args.color || "#9e9e9e",
                "background-image": "url(\"" + url + "/icon.svg\")"
            });
            $("p a", $root).attr("href", args.url);

            gates[id] = {
                "host":    args.url,
                "filters": args.jobs,
                "size":    $root.height() / 14 - 1,
                "cron":    new Cron(args.cron || "0 */4 * * *", update, id)
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
