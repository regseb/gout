function(data) {
    "use strict";
    return $.get("http://www.ufunk.net/").then(function(data) {
        var article = $("#header3 a:first", data);
        var src = $("img", article).attr("src");
        src = src.substr(src.indexOf("src=") + 4);
        src = src.substr(0, src.indexOf("&"));
        return {
            "img":   src,
            "link":  $(article).attr("href"),
            "title": $("h2", article).text()
        };
    });
}
