(function() {
    "use strict";

    var create = function(id, url) {
        $.getJSON(url + "/config.json", function(args) {
            $("#" + id).css("background-color", args.color);
            $("#" + id + " span").text(args.who);
        });
    }; // create()

    app.mod["example/hello"] = create;

})();