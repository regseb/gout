function(size) {
    "use strict";
    var url = "http://xkcd.com/rss.xml";
    return $.get(url).then(function(data) {
        var events = [];
        $("item:lt(" + size + ")", data).each(function() {
            events.push({
                "img":   $($("description", this).text()).attr("src"),
                "title": $("title", this).text(),
                "link":  $("link", this).text(),
                "guid":  $("guid", this).text(),
                "date":  new Date($("pubDate", this).text()).getTime()
            });
        });
        return events;
    });
}
