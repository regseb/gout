function(data) {
    "use strict";
    var img = $("#posts-dessin img:first", data);
    return {
        "img":   $(img).attr("src"),
        "link":  $(img).parent().attr("href"),
        "title": $(img).attr("title")
    };
}
