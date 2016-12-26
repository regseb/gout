define(["jquery", "scronpt"], function ($, Cron) {
    "use strict";

    const gates = {};

    const clean = function ($root) {
        $("> ul > li > a", $root).each(function () {
            const that = this;
            const query = {
                "text":       $(this).attr("href"),
                "startTime":  0,
                "maxResults": 1
            };
            browser.history.search(query).then(function (histories) {
                if (0 !== histories.length) {
                    $(that).parent().remove();
                }
            });
        });
    }; // clean()

    const mouseup = function (event) {
        switch (event.which) {
            case 1:
            case 2:
                setTimeout(function () {
                    $(event.target).parent().remove();
                }, 0);
        }
    }; // mousedown()

    const display = function ($root, data) {
        let $li = $("> ul > li[data-guid=\"" + data.guid + "\"]", $root);

        if (0 === $li.length) { // Si l'évènement n'est pas affiché.
            // Trouver la future position chronologique de l'évènement.
            let pos = -1;
            $("> ul > li", $root).each(function (i) {
                if (data.date <= $(this).data("date")) {
                    pos = i;
                }
            });
            // Créer la ligne du nouvel évènement.
            $li = $("<li>").attr("data-guid", data.guid)
                           .data("date", data.date)
                           .append($("<a>").attr({ "href":   data.link,
                                                   "target": "_blank" })
                                           .text(data.title)
                                           .mouseup(mouseup));
            if ("" !== data.desc) {
                $li.append($("<span>").html(data.desc));
            }

            if (-1 === pos) {
                $("> ul", $root).prepend($li);
            } else {
                $("> ul > li:eq(" + pos + ")", $root).after($li);
            }
        } else { // Si l'évènement est déjà affiché.
            // Si des éléments de l'évènement ont changé, les mettre à jour.
            const $a = $("> a", $li);
            if ($a.attr("href") !== data.link) {
                $a.attr("href", data.link);
            }
            if ($a.text() !== data.title) {
                $a.text(data.title);
            }
            if ($a.next().html() !== data.desc) {
                $a.next().html(data.desc);
            }
        }
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
        clean($root);
        args.scrapers.forEach(function (scraper) {
            scraper.extract(args.size).then(function (items) {
                for (let item of items) {
                    const query = {
                        "text":       item.link,
                        "startTime":  0,
                        "maxResults": 1
                    };
                    browser.history.search(query).then(function (histories) {
                        if (0 === histories.length) {
                            display($root, item);
                        }
                    });
                }
            });
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
        $root.css("background-color", config.color);
        if (undefined !== icon) {
            $root.css("background-image", "url(\"data:image/svg+xml;base64," +
                                          btoa(icon) + "\")");
        }
        // Cacher les éléments qui sortent du cadre.
        $root.append(
            "<style>" +
            "    .core-stack > ul > li:nth-child(n+" +
                                                   $root.height() / 14 + ") {" +
            "        display: none;" +
            "    }" +
            "</style>");

        gates[id] = {
            "scrapers": scrapers,
            "size":     config.size || 10,
            "cron":     new Cron(config.cron, update, id)
        };

        if (1 === Object.keys(gates).length) {
            document.addEventListener("visibilitychange", wake);
        }

        update(id);
    }; // create()

    return create;
});
