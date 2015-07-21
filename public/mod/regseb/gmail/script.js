/* global window, document, Promise, sessionStorage, define */

define(["jquery", "scronpt"], function ($, Cron) {
    "use strict";

    var gates = {};

    var create = function (id, url) {
        $.getJSON(url + "/config.json").then(function (args) {
            var $root = $("#" + id);
            $root.css("background-color", args.color || "#f44336");

            $root[0].addEventListener("access", access);

            $("a", $root).click(function () {
                window.open(
                    "https://accounts.google.com/o/oauth2/auth" +
                    "?response_type=token" +
                    "&client_id=" + args.id +
                    "&redirect_uri=" + encodeURIComponent(
                            window.location.origin +
                            "/mod/regseb/gmail/oauth2.html") +
                    "&scope=https://mail.google.com/,gmail.modify," +
                            "gmail.readonly" +
                    "&state=" + id, id, "width=800, height=600");
                return false;
            });

            gates[id] = {
                "size": $root.height() / 14 - 1,
                "token":  sessionStorage.getItem("regseb/gmail/" + id),
                "cron": new Cron(args.cron, update, id)
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

    var access = function (event) {
        var id = $(this).attr("id");
        sessionStorage.setItem("regseb/gmail/" + id, event.detail);
        gates[id].token = event.detail;
        update(id);
    }; // access()

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
        extract(args.size, args.token).then(function (promise) {
            promise.then(function (items) {
                $("> p", $root).hide();
                $("> ul", $root).show()
                                .empty();
                if (0 === items.length) {
                    $("> ul", $root).append(
                        "<li><a href=\"https://mail.google.com/\">" +
                        "(Aucun nouveau message)</a></li>");
                } else {
                    for (var item of items) {
                        display($root, item);
                    }
                }
            });
        }, function () {
            $("> ul", $root).hide();
            $("> p", $root).show();
        });
    }; // update()

    var extract = function (size, token) {
        var url = "https://www.googleapis.com/gmail/v1/users/me/messages" +
                  "?maxResults=" + size + "&q=is:unread&access_token=" + token;
        return $.getJSON(url).then(function (data) {
            if (0 === data.resultSizeEstimate) {
                return Promise.resolve([]);
            }

            var promises = data.messages.map(function (item) {
                var url = "https://www.googleapis.com/gmail/v1/users/me/" +
                          "messages/" + item.id + "?access_token=" + token;
                return $.getJSON(url).then(function (item) {
                    var headers = {};
                    for (var header of item.payload.headers) {
                        headers[header.name] = header.value;
                    }
                    return {
                        "title": headers.Subject,
                        "desc":  item.snippet,
                        "link":  "https://mail.google.com/",
                        "guid":  item.id,
                        "date":  new Date(headers.Date).getTime()
                    };
                });
            });

            return Promise.all(promises);
        });
    }; // extract()

    var display = function ($root, data) {
        var $li = $("<li>").attr("data-guid", data.guid)
                           .data("date", data.date)
                           .append($("<a>").attr({ "href":   data.link,
                                                   "target": "_blank" })
                                           .text(data.title));
        if ("" !== data.desc) {
            $li.append($("<span>").html(data.desc));
        }

        $("> ul", $root).append($li).fadeIn("slow");
    }; // display()

    return create;

});
