(function() {
    "use strict";

    var create = function(id, url) {
        $.getJSON(url + "/config.json", function(args) {
            $("#" + id).css("background-color", args.color);
        });

        $(document).ajaxStart(function() {
            $(".std-ajaxloader").css(
                "background-image",
                "url(\"mod/std/ajaxloader/img/loader.svg\")");
        });
        $(document).ajaxStop(function() {
            $(".std-ajaxloader").css("background-image", "none");
        });
    }; // create()

    app.mod["std/ajaxloader"] = create;

})();