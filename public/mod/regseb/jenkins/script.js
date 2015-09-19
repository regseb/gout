/* global document, define */

define(["jquery", "scronpt"], function ($, Cron) {
    "use strict";

    var gates = {};

    var create = function (id, url) {
        $.getJSON(url + "/config.json").then(function (args) {
            var $root = $("#" + id);
            $root.css({
                "background-color": args.color || "#9e9e9e",
                "background-image": "url(\"" + url + "/icon.svg\")"
            });

            // Gérer les cas où la propriété "jobs" est un tableau, une chaine
            // de caractères ou n'est pas renseignée.
            var patterns = Array.isArray(args.jobs) ? args.jobs
                                                    : args.jobs ? [args.jobs]
                                                                : [];
            gates[id] = {
                "host": args.url,
                "patterns": patterns.map(compile),
                "size": $root.height() / 14 - 1,
                "cron": new Cron(args.cron || "0 */4 * * *", update, id)
            };

            if (1 === Object.keys(gates).length) {
                document.addEventListener("visibilitychange", function () {
                    for (var id in gates) {
                        if (!gates[id].cron.status()) {
                            update(id);
                        }
                    }
                });
            }

            update(id);
        });
    }; // create()

    var compile = function (pattern) {
        // Protéger tous les caractères spéciaux sauf l'astérisque et le point
        // d'interrogation. Puis remplacer l'astérisque (zéro ou plusieurs
        // caractères) et le point d'interrogation (un seul caractère) par leur
        // équivalent d'expression rationnelle.
        return new RegExp(pattern.replace(/[.+^${}()|[\]\\]/g, "\\$&")
                                 .replace(/\*/g, ".*")
                                 .replace(/\?/g, "."));
    }; // compile()

    var update = function (id) {
        var args = gates[id];

        // Si la page est cachée : ne pas actualiser les données et indiquer
        // qu'il faudra mettre à jour les données quand l'utilisateur reviendra
        // sur la page.
        if (document.hidden) {
            args.cron.stop();
            return;
        }
        args.cron.start();

        var $root = $("#" + id);
        extract(args.host, args.patterns, args.size).then(function (items) {
            if (0 === items.length) {
                var $li = $("<li>").append(
                        $("<a>").attr({ "href":   args.host,
                                        "target": "_blank" })
                                .html("(Aucun <em>job</em> en erreur)"));
                $("ul", $root).html($li);
            } else {
                $("ul", $root).empty();
                for (var item of items) {
                    display($root, item);
                }
            }
        });
    }; // update()

    var extract = function (host, patterns, size) {
        var url = host + "/api/json?tree=jobs[name,url,displayName," +
                                             "lastBuild[number,result]]";
        return $.get(url).then(function (data) {
            var items = [];
            for (var job of data.jobs) {
                if (null === job.lastBuild ||
                        "FAILURE" !== job.lastBuild.result) {
                    continue;
                }

                // S'il n'y a aucun patron ou si le nom du job respecte un
                // patron : ajouter le job à la liste.
                var match = (0 === patterns.length);
                for (var pattern of patterns) {
                    if (pattern.test(job.name)) {
                        match = true;
                        break;
                    }
                }
                if (match) {
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
            }
            return items;
        });
    }; // extract()

    var display = function ($root, data) {
        var url = data.link + "#" + data.guid;
        var $li = $("<li>").append($("<a>").attr({ "href":   url,
                                                   "target": "_blank" })
                                           .text(data.title));
        $("> ul", $root).append($li).fadeIn("slow");
    }; // display()

    return create;

});
