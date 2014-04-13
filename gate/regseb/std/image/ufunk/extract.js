function(data) {
    "use strict";
    return $.get("http://www.ufunk.net/").then(function(data) {
        var article = $("#header3 a:first", data);
        return {
            "img":   $("img", article).attr("src"),
            "link":  $(article).attr("href"),
            "title": $("h2", article).text()
        };
    });
}
