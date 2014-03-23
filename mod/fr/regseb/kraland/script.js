(function() {
    "use strict";

    var gates =  { };
    var last = null;

    var create = function(id, url) {
        $.getJSON(url + "/config.json", function(args) {
            $("#" + id).css("background-color", args.color);
            gates[id] = {
                "selection": args.selection,
                "size": args.size
            };

            $.ajax({
                "url": "gout.php?url=" +
                       encodeURIComponent("http://www.kraland.org/main.php" +
                                          "?p=4_4") + "&id=" + id,
                "beforeSend": function(xhr) {
                    xhr.overrideMimeType("text/html; charset=ISO-8859-1");
                },
                "success": function(data) {
                    gates[id].t = $("#report-col3 input[name=\"t\"]",
                                    data).val();

                    if (null === last) {
                        // Mettre a jour toutes les cinq minutes.
                        last = Date.now();
                        setInterval(update, 300000);
                        document.addEventListener("visibilitychange", update);
                    }
                    load(id, gates[id]);
                }
            });
        });
    }; // create()

    var update = function() {
        // Si la page est cachee ou si l'actualisation est recente, alors les
        // evenements ne sont pas mis a jour.
        var now = Date.now();
        if (document.hidden || now - last < 300000 - 1000)
            return;

        // Enregistrer l'heure de la derniere mise a jour.
        last = now;

        $.each(gates, function(id, args) {
            load(id, args);
        });
    }; // update()

    var load = function(id, args) {
        $.ajax({
            "url": "gout.php?url=" +
                   encodeURIComponent("http://www.kraland.org/main.php?p=4_4") +
                   "&id=" + id,
            "type": "POST",
            "data": { "p": "4_4",
                      "a": "1",
                      "Submit": "Actualiser",
                      "t": gates[id].t,
                      "p3": "1",
                      "p2": "on",
                      "p1": "25",
                      "p7": gates[id].selection },
            "beforeSend": function(xhr) {
                xhr.overrideMimeType("text/html; charset=ISO-8859-1");
            },
            "success": function(data) {
                gates[id].t = $("#report-col3 input[name=\"t\"]", data).val();
                convert(data, args.size).forEach(function(event) {
                    if (!$("#" + id + " a[data-checksum=\"" + event.checksum +
                                                                "\"]").length) {
                        $("#" + id + " > ul > li:gt(3)").remove();
                        add(id, event);
                    }
                });
            }
        });
    }; // load()

    var convert = function(data, size) {
        var json = [];
        $(".ev_loc:lt(" + size + ")", data).each(function (i, event) {
            var text = $(event).next().next().text();
            var checksum = 0;
            for (var j = text.length; --j >= 0; ) {
                checksum  = ((checksum << 5) - checksum) + text.charCodeAt(j);
                checksum |= 0; // Convertir en integer 32 bit.
            }
            json.push({ "flag":     $("img", event),
                        "place":    $(event),
                        "time":     $(event).next(),
                        "title":    text,
                        "text":     text,
                        "checksum": $(event).next().text() + checksum });
        });
        return json.reverse();
    }; // convert()

    var add = function(id, event) {
        $("#" + id + " > ul").prepend(
                $("<li>").append($("<a>").attr({
            "href": "http://www.kraland.org/main.php?p=4_4#" + event.checksum,
            "target": "_blank",
            "data-checksum": event.checksum
        })
                                         .html(event.title))
                         .append($("<span>").html(event.text))).fadeIn("slow");
    }; // add()

    app.mod["fr/regseb/kraland"] = create;

})();