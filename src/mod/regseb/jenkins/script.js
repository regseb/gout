/* global document, define */

define(["jquery", "scronpt"], function ($, Cron) {
    "use strict";

    const gates = {};

    const extract = function (host, patterns, size) {
        const url = host + "/api/json?tree=jobs[name,url,displayName," +
                                               "lastBuild[number,result]]";
        return $.get(url).then(function (data) {
            const items = [];
            for (let job of data.jobs) {
                if (null === job.lastBuild ||
                        ("FAILURE" !== job.lastBuild.result
                         && "ABORTED" !== job.lastBuild.result)) {
                    continue;
                }

                // S'il n'y a aucun patron ou si le nom du job respecte un
                // patron : ajouter le job à la liste.
                let match = (0 === patterns.length);
                for (let pattern of patterns) {
                    if (pattern.test(job.name)) {
                        match = true;
                        break;
                    }
                }
                if (!match) {
                    continue;
                }
                items.push({
                    "title": job.displayName,
                    "desc":  job.description,
                    "link":  job.url,
                    "guid":  job.lastBuild.number
                });
                if (size === items.length) {
                    break;
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
        extract(args.host, args.patterns, args.size).then(function (items) {
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

    const compile = function (pattern) {
        // Protéger tous les caractères spéciaux sauf l'astérisque et le point
        // d'interrogation. Puis remplacer l'astérisque (zéro ou plusieurs
        // caractères) et le point d'interrogation (un seul caractère) par leur
        // équivalent d'expression rationnelle.
        return new RegExp("^" + pattern.replace(/[.+^${}()|[\]\\]/g, "\\$&")
                                       .replace(/\*/g, ".*")
                                       .replace(/\?/g, ".") + "$");
    }; // compile()

    const create = function (id, url) {
        $.getJSON(url + "/config.json").then(function (args) {
            const $root = $("#" + id);
            $root.css({
                "background-color": args.color || "#9e9e9e",
                "background-image": "url(\"" + url + "/icon.svg\")"
            });
            $("p a", $root).attr("href", args.url);

            gates[id] = {
                "host":     args.url,
                "patterns": (args.jobs || []).map(compile),
                "size":     $root.height() / 14 - 1,
                "cron":     new Cron(args.cron || "0 */4 * * *", update, id)
            };

            if (1 === Object.keys(gates).length) {
                document.addEventListener("visibilitychange", function () {
                    for (const id in gates) {
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
