function(data) {
    "use strict";
    return $.get("http://www.ufunk.net/").then(function(data) {
        var a = $("#tiles a:first", data);
        var src = $("img", a).attr("src");
        src = src.substr(src.indexOf("src=") + 4);
        src = src.substr(0, src.indexOf("&"));
        return {
            "img":   src,
            "link":  $(a).attr("href"),
            "title": $(a).attr("title")
        };
    });
}
