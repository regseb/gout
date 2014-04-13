function() {
    "use strict";
    return $.get("http://www.urtikan.net/dessin-du-jour/").then(function(data) {
        var img = $("#posts-dessin img:first", data);
        return {
            "img":   $(img).attr("src"),
            "link":  $(img).parent().attr("href"),
            "title": $(img).attr("title")
        };
    });
}
