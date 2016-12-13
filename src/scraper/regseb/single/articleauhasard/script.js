define([], function () {
    "use strict";

    return class {
        constructor(lang = "fr") {
            this.lang = lang;
        } // constructor()

        extract() {
            const that = this;
            const url = "https://" + that.lang + ".wikipedia.org/w/api.php" +
                        "?action=query&list=random&rnnamespace=0&format=json";
            return fetch(url).then(function (response) {
                return response.json();
            }).then(function (data) {
                return {
                    "title": data.query.random[0].title,
                    "desc":  "",
                    "link":  "https://" + that.lang + ".wikipedia.org/wiki/" +
                             data.query.random[0].title
                };
            });
        } // extract()
    };
});
