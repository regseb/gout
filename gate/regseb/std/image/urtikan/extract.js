function(size) {
    "use strict";
    var url = "http://www.urtikan.net/dessin-du-jour/";
    return $.get(url).then(function(data) {
        var events = [];
        $("#posts-dessin li:lt(" + size + ")", data).each(function(i, item) {
            var $img = $("img", item);
            events.push({
                "img":   $img.attr("src"),
                "title": $img.attr("title"),
                "link":  $img.parent().attr("href"),
                "guid":  $img.attr("src"),
                "date":  0
            });
        });
        return events;
    });
}
