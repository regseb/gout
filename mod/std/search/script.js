(function() {
    "use strict";

    var gates = { };

    var create = function(id, url) {
        $.getJSON(url + "/config.json", function(args) {
            var height = $("#" + id).height();
            var width = $("#" + id).width();
            $("#" + id + " img").width(height - 4)
                                .height(height - 4)
                                .click(propose);
            $("#" + id + " input").width(width - height - 8)
                                  .height(height - 4);
            gates[id] = args.engines;

            for (var i in gates[id]) {
                var engine = gates[id][i];
                engine.icon = url + "/" + engine.icon;
                $("#" + id + " ul").append(
                    $("<li>").data("index", i)
                             .append($("<img>").attr({ "src": engine.icon,
                                                       "alt": "" }))
                             .append(engine.title)
                             .click(change));
            }
            $("#" + id + " li:first").click();
        });
    }; // create()

    var propose = function() {
        var id = $(this).closest("article").attr("id");
        $("#" + id + " ul").show();
    }; // propose()

    var change = function() {
        var id = $(this).closest("article").attr("id");
        $("#" + id + " ul").hide();

        var i = $(this).data("index");
        var engine = gates[id][i];
        $("#" + id + " form").attr("action", engine.url);
        $("#" + id + " p").css("border-color", engine.color);
        $("#" + id + " p img").attr("src", engine.icon);
        $("#" + id + " input").attr("name", engine.terms)
                              .attr("placeholder", engine.title)
                              .css("color", engine.color);
    }; // change()

    app.mod["std/search"] = create;

})();