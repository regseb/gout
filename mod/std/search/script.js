(function() {
    "use strict";

    var gates = { };

    var create = function(id, url) {
        $.getJSON(url + "/config.json", function(args) {
            var height = $("#" + id).height();
            var width = $("#" + id).width();
            $("#" + id + " form").submit(search);
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
                             .append($("<img>").attr("src", engine.icon))
                             .append(engine.title)
                             .click(change));
            }
            $("#" + id + " li:first").click();
        });
    }; // create()

    var search = function() {
        var id = $(this).closest("article").attr("id");
        // Ouvrir le résultat de la recherche dans un nouvel onglet.
        window.open(
                $("#" + id + " form").attr("action")
                                     .replace("{searchTerms}",
                                              $("#" + id + " input").val()));
        return false;
    }; // search()

    var propose = function() {
        var id = $(this).closest("article").attr("id");
        // Afficher la liste des moteurs de recherche.
        $("#" + id + " ul").show();
    }; // propose()

    var change = function() {
        var id = $(this).closest("article").attr("id");
        // Cacher la liste des moteurs de recherche.
        $("#" + id + " ul").hide();

        // Mettre a jour le formulaire.
        var engine = gates[id][$(this).data("index")];
        $("#" + id + " form").attr("action", engine.url);
        $("#" + id + " p").css("border-color", engine.color);
        $("#" + id + " p img").attr("src", engine.icon);
        $("#" + id + " input").attr("name", engine.terms)
                              .attr("placeholder", engine.title)
                              .css("color", engine.color);
    }; // change()

    app.mod["std/search"] = create;

})();
