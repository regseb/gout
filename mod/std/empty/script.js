(function() {
    "use strict";

    var create = function(id, url) {
        $.getJSON(url + "/config.json", function(args) {
            $("#" + id).css("background-color", args.color);
        });
    }; // create()

    app.mod["std/empty"] = create;

})();