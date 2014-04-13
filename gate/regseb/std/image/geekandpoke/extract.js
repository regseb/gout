function() {
    "use strict";
    return $.get("http://geek-and-poke.com").then(function(data) {
        var article = $("article:first", data);
        return {
            "img":   $("img", article).attr("data-src") + "?format=300w",
            "link":  "http://geek-and-poke.com/" +
                     $("h1 a", article).attr("href"),
            "title": $("h1 a", article).text()
        };
    });
}
