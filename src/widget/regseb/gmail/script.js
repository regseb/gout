define(["jquery", "scronpt"], function ($, Cron) {
    "use strict";

    const OAUTH2_API_URL = "https://accounts.google.com/o/oauth2/";
    const GMAIL_API_URL = "https://www.googleapis.com/gmail/v1/";
    const REDIRECT_URI = window.location.origin +
                         "/widget/regseb/gmail/oauth2.html";

    const gates = {};

    const extract = function (size, token, query, index) {
        const url = GMAIL_API_URL + "users/me/messages?access_token=" + token +
                    "&q=" + query + "&maxResults=" + size;
        return $.get(url).then(function (data) {
            if (0 === data.resultSizeEstimate) {
                return [];
            }

            const promises = data.messages.map(function (item) {
                const url = GMAIL_API_URL + "users/me/messages/" + item.id +
                            "?access_token=" + token + "&format=metadata";
                return $.getJSON(url).then(function (item) {
                    const headers = {};
                    for (let header of item.payload.headers) {
                        headers[header.name] = header.value;
                    }
                    return {
                        "title": headers.Subject,
                        "desc":  item.snippet,
                        "link":  "https://mail.google.com/mail/u/" + index +
                                 "/#inbox/" + item.id
                    };
                });
            });
            return Promise.all(promises);
        });
    }; // extract()

    const display = function ($root, data) {
        $("ul", $root).append(
            $("<li>").html($("<a>").attr({ "href":   data.link,
                                           "target": "_blank",
                                           "title":  data.desc })
                                   .text(data.title)));
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
        extract(args.size, args.token, args.query, args.index).then(
                                                              function (items) {
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

    const open = function () {
        const $root = $(this).closest("article");
        const id = $root.attr("id");
        const args = gates[id];

        const url = OAUTH2_API_URL + "auth?response_type=code&client_id=" +
                    args.key + "&redirect_uri=" +
                  encodeURIComponent(REDIRECT_URI) + "&scope=" +
                  "https://mail.google.com/,gmail.modify,gmail.readonly" +
                  "&state=" + id + "&access_type=offline&approval_prompt=force";
        window.open(url, id, "width=800, height=600");
    }; // open()

    const refresh = function (id) {
        const args = gates[id];

        const url = OAUTH2_API_URL + "token";
        const params = {
            "refresh_token": args.refresh,
            "client_id":     args.key,
            "client_secret": args.secret,
            "grant_type":    "refresh_token"
        };
        $.post(url, params).then(function (data) {
            args.token = data["access_token"];
            setTimeout(refresh, (data["expires_in"] - 60) * 1000, id);
        });
    }; // refresh()

    const access = function (event) {
        const $root = $(this);
        const id = $root.attr("id");
        const args = gates[id];

        const url = OAUTH2_API_URL + "token";
        const params = {
            "code":          event.detail.code,
            "client_id":     args.key,
            "client_secret": args.secret,
            "redirect_uri":  REDIRECT_URI,
            "grant_type":    "authorization_code"
        };
        // Récupérer le jeton grâce au code.
        $.post(url, params).then(function (data) {
            args.refresh = data["refresh_token"];
            args.token = data["access_token"];
            // Préparer la prochaine requête (une minute avant l'expiration)
            // pour récupérer un nouveau jeton.
            setTimeout(refresh, (data["expires_in"] - 60) * 1000, id);

            $("button", $root).hide();
            $("p a", $root).show();

            update(id);
        });
    }; // access()

    const create = function (id, url) {
        $.getJSON(url + "/config.json").then(function (args) {
            const $root = $("#" + id);
            $root.css("background-color", args.color || "#f44336");
            $("p a", $root).attr("href", "https://mail.google.com/mail/u/" +
                                         (args.index || 0));

            // Ajouter des écouteurs.
            $root[0].addEventListener("access", access);
            $("button", $root).click(open);

            gates[id] = {
                "index":  args.index || 0,
                "query":  encodeURIComponent(args.query || "is:unread"),
                "key":    args.key,
                "secret": args.secret,
                "size":   $root.height() / 14 - 1,
                "cron":   new Cron(args.cron, update, id)
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
        });
    }; // create()

    return create;
});
