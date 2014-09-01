function(size) {
    "use strict";
    var url = "http://www.ufunk.net/";
    return $.get(url).then(function(data) {
        var events = [];
        $("#loopgrid article", data).not("[class*=\"advice\"]:lt(" + size + ")")
                                    .each(function(i, item) {
            var $a = $("a:first", item);

            var src = $("img", $a).attr("src");
            src = src.substr(src.indexOf("src=") + 4);
            src = src.substr(0, src.indexOf("&"));
            events.push({
                "img":   src,
                "title": $a.attr("title"),
                "link":  $a.attr("href"),
                "guid":  src,
                "date":  0
            });
        });
        return events;
    });
}
