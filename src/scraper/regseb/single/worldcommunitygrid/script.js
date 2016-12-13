define(["jquery"], function ($) {
    "use strict";

    return class {
        constructor(user) {
            this.user = user;
        } // constructor()

        extract() {
            const that = this;
            const url = "https://www.worldcommunitygrid.org/" +
                        "getDynamicImage.do?memberName=" + that.user +
                                          "&stat=1&rankOn=true&language=fr_FR";
            return $.get(url).then(function (data) {
                return {
                    "title": "<strong>" +
                             (/\t([^\t&]+)&#160;Points/).exec(data)[1] +
                             "</strong> points (#<em>" +
                             (/\(Rang :&#160;&#35;([^(]+)\)/).exec(data)[1] +
                             "</em>)",
                    "desc": "",
                    "link": "https://secure.worldcommunitygrid.org/stat/" +
                            "viewMemberInfo.do?userName=" + that.user
                };
            });
        } // extract()
    };
});
