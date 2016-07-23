define(["jquery"], function ($) {
    "use strict";

    return class {
        constructor(city) {
            this.city = city;
        }

        get() {
            const self = this;
            const url = "http://www.meltdown.bar/" + self.city + "/planning";
            return $.get(url).then(function (data) {
                const day = (new Date().getDay() + 6) % 7;
                const $data = $("#event-detail_0" + day, data);
                const titles = [];
                const descs = [];
                $(".event-detail", $data).each(function () {
                    const title = $("h3", this).text();
                    const desc  = $("p", this).text();
                    const hour  = $("span:first", this).text().trim();
                    titles.push(title);
                    descs.push("<strong>" + title + "</strong> (" + hour +
                               ") : " + desc);
                });
                return {
                    "title": titles.join(" / "),
                    "desc": descs.join("<br />"),
                    "link": "http://www.meltdown.bar/" + self.city + "/planning"
                };
            });
        } // get()
    };
});
