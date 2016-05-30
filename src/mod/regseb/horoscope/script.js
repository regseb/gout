define(["jquery", "scronpt"], function ($, Cron) {
    "use strict";

    const IMG_DIR = "mod/regseb/horoscope/img/";

    const gates = {};

    const extract = function (sign) {
        const url = "http://www.elle.fr/Astro/Horoscope/Quotidien";
        return $.get(url).then(function (data) {
            let text = "(Signe non-trouvé)";
            $(".signes .right", data).each(function () {
                if (-1 !== $("a", this).attr("href").indexOf(sign)) {
                    text = $("p", this).text();
                    return false;
                }
                return true;
            });
            return text;
        });
    }; // extract()

    const display = function ($root, data) {
        $("a", $root).text(data);
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
        extract(args.sign).then(function (data) {
            display($root, data);
        });
    }; // update()

    const create = function (id, url) {
        $.getJSON(url + "/config.json").then(function (args) {
            const $root = $("#" + id);
            const sign = args.sign[0].toUpperCase() +
                       args.sign.substr(1).toLowerCase();
            $root.css({
                "background-color": args.color || "black",
                "background-image": "url(\"" + IMG_DIR + args.sign + ".svg\")"
            });
            $("a", $root).attr("href", "http://www.elle.fr/Astro/Horoscope/" +
                                       "Quotidien/" + sign);

            gates[id] = {
                "sign": sign,
                "cron": new Cron("0 6 * * *", update, id)
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
