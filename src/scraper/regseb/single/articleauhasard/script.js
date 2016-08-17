define(["jquery"], function ($) {
    "use strict";

    return class {
        constructor(lang = "fr") {
            this.lang = lang;
        } // constructor()

        get() {
            const that = this;
            const url = "http://" + that.lang + ".wikipedia.org/w/api.php" +
                        "?action=query&list=random&rnnamespace=0&format=json" +
                        "&callback=?";
            return $.getJSON(url).then(function (data) {
                return {
                    "title": data.query.random[0].title,
                    "desc":  null,
                    "link":  "http://" + that.lang + ".wikipedia.org/wiki/" +
                             data.query.random[0].title
                };
            });
        } // get()
    };
});
