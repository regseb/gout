define([], function () {
    "use strict";

    return class {
        constructor({ title, urls, color, icon, desc = null }) {
            this.title = title;
            if ("string" === typeof urls) {
                this.urls = { "results": urls };
            } else {
                this.urls = urls;
            }
            this.color = color;
            this.icon  = icon;
            this.desc  = desc;
        } // constructor()

        info() {
            const data = {
                "title": this.title,
                "color": this.color,
                "icon":  this.icon,
                "desc":  this.desc
            };
            if (null === data.desc) {
                delete data.desc;
            }
            return Promise.resolve(data);
        } // info()

        suggest(searchTerms) {
            if (0 !== searchTerms.length && "suggestions" in this.urls) {
                const url = this.urls.suggestions.replace("{searchTerms}",
                                                          searchTerms);
                return fetch(url).then(function (response) {
                    return response.json();
                }).then(function (data) {
                    return data[1];
                });
            }
            return Promise.resolve([]);
        } // suggest()

        result(searchTerms) {
            return Promise.resolve(this.urls.results.replace("{searchTerms}",
                                                             searchTerms));
        } // result()
    };
});
