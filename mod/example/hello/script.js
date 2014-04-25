(function() {
    "use strict";

    var create = function(id, url) {
        // Recuperer le fichie de configuration de la passerelle.
        $.getJSON(url + "/config.json", function(args) {
            $("#" + id).css("background-color", args.color);
            $("#" + id + " span").text(args.who);
        });
    }; // create()

    app.mod["example/hello"] = create;

})();