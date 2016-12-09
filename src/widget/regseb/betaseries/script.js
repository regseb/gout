define(["jquery", "scronpt"], function ($, Cron) {
    "use strict";

    const API_URL = "https://api.betaseries.com/";

    const gates = {};

    const resources = {};

    const extract = function (size, key, token, shows) {
        const url = API_URL + "episodes/list?key=" + key + "&token=" + token +
                    "&limit=" + size;
        return $.getJSON(url).then(function (data) {
            const items = [];
            for (let show of data.shows) {
                if (null !== shows && !shows.includes(show.title)) {
                    continue;
                }
                for (let item of show.unseen) {
                    items.push({
                        "title":   item.title,
                        "desc":    item.description,
                        "season":  item.season,
                        "episode": item.episode,
                        "show":    show.title,
                        "link":    resources[show.id] + item.code.toLowerCase(),
                        "guid":    item.id,
                        "status":  item.user.downloaded ? "watch"
                                                        : "download",
                        "date":    new Date(item.date).getTime()
                    });
                }
            }
            return items.sort((a, b) => a.date - b.date).slice(0, size);
        });
    }; // extract()

    const display = function ($root, data, format) {
        const $img = $("<button>").click(post);
        if ("download" === data.status) {
            $img.attr("title", "Marquer comme récupéré")
                .text("●");
        } else {
            $img.attr("title", "Marquer comme vu")
                .text("▶");
        }

        const text = format.replace("{show}",    data.show)
                           .replace("{season}",  ("00" + data.season).slice(-2))
                           .replace("{episode}",
                                    ("00" + data.episode).slice(-2))
                           .replace("{title}",   data.title);

        $("ul", $root).append(
            $("<li>").data({ "guid":   data.guid,
                             "status": data.status })
                     .append($img)
                     .append($("<a>").attr({ "href":   data.link,
                                             "target": "_blank",
                                             "title":  data.desc })
                                     .text(text)));
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
        extract(args.size, args.key, args.token, args.shows)
                                                        .then(function (items) {
            if (0 === items.length) {
                $("ul", $root).hide();
                $("p", $root).show();
            } else {
                $("p", $root).hide();
                $("ul", $root).show()
                              .empty();
                for (let item of items) {
                    display($root, item, args.format);
                }
            }
        });
    }; // update()

    const post = function () {
        const id = $(this).closest("article").attr("id");
        const args = gates[id];
        const $li = $(this).closest("li");
        const guid = $li.data("guid");
        const status = $li.data("status");

        const url = API_URL + "episodes/" + status + "ed?key=" + args.key +
                    "&token=" + args.token + "&id=" + guid;
        $.post(url).then(function () {
            update(id);
        });
    }; // post()

    const init = function (id, key, token, shows) {
        // Récupérer les identifiants des séries regardées par l'utilisateur.
        let url = API_URL + "episodes/list?key=" + key + "&token=" + token +
                  "&limit=1";
        $.getJSON(url).then(function (data) {
            // Filtrer les séries non-affichées dans cette passerelle.
            const promises = data.shows.filter(function (show) {
                return !(show.id in resources) &&
                       (null === shows || shows.includes(show.title));
            }).map(function (show) {
                // Récupérer l'URL vers les pages Internet des épisodes.
                url = API_URL + "shows/display?key=" + key + "&id=" + show.id;
                return $.getJSON(url).then(function (infos) {
                    resources[show.id] =
                            infos.show["resource_url"]
                                         .replace("/serie/", "/episode/") + "/";
                });
            });
            return Promise.all(promises);
        }).then(function () {
            update(id);
        });
    }; // init()

    const access = function (responseUrl) {
        const response = new URL(responseUrl);
        const id = response.pathname.slice(1);
        const $root = $("#" + id);
        const args = gates[id];

        const url = API_URL + "members/access_token?key=" + args.key;
        const params = {
            "client_id":     args.key,
            "client_secret": args.secret,
            "redirect_uri":  browser.identity.getRedirectURL(id),
            "code":          response.searchParams.get("code")
        };
        // Récupérer le jeton grâce au code.
        $.post(url, params).then(function (data) {
            args.token = data.token;

            $("button", $root).hide();
            $("p a", $root).show();

            init(id, args.key, args.token, args.shows);
        });
    }; // access()

    const open = function () {
        const $root = $(this).closest("article");
        const id = $root.attr("id");
        const args = gates[id];

        const details = {
            "url": "https://www.betaseries.com/authorize?client_id=" +
                   args.key + "&redirect_uri=" +
                   encodeURIComponent(browser.identity.getRedirectURL(id)),
            "interactive": true
        };
        browser.identity.launchWebAuthFlow(details).then(access);
    }; // open()

    const wake = function () {
        for (let id in gates) {
            if (!gates[id].cron.status()) {
                update(id);
            }
        }
    }; // wake()

    const create = function (id, { "config.json": config, "icon.svg": icon }) {
        const $root = $("#" + id);
        $root.css({
            "background-color": config.color || "#2196f3",
            "background-image": "url(\"data:image/svg+xml;base64," +
                                btoa(icon) + "\")"
        });

        // Ajouter un écouteur sur le bouton de connexion.
        $("button", $root).click(open);

        gates[id] = {
            "shows":  config.shows || null,
            "format": config.format || "s{season}e{episode} : {title} ({show})",
            "key":    config.key,
            "secret": config.secret,
            "size":   $root.height() / 14 - 1,
            "cron":   new Cron(config.cron || "0 0 * * *", update, id)
        };

        if (1 === Object.keys(gates).length) {
            document.addEventListener("visibilitychange", wake);
        }
    }; // create()

    return create;
});
