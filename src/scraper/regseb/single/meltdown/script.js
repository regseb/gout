define(["jquery"], function ($) {
    "use strict";

    return class {
        constructor(city) {
            this.city = city;
        } // constructor()

        extract() {
            const that = this;
            const url = "https://www.meltdown.bar/" + that.city + "/planning";
            return $.get(url).then(function (data) {
                return $.parseHTML(data);
            }).then(function (data) {
                const day = (new Date().getDay() + 6) % 7;
                const $data = $("#event-detail_0" + day, data);
                const titles = [];
                const descs  = [];
                $(".event-detail", $data).each(function () {
                    const title = $("h3", this).text();
                    const desc  = $(".event-detail-text", this).text();
                    const hour  = $(".event-detail--hour", this).text();
                    titles.push(title);
                    descs.push("<strong>" + title + "</strong> (" + hour +
                               ") : " + desc);
                });
                return {
                    "title": titles.join(" / "),
                    "desc":  descs.join("<br />"),
                    "link":  "https://www.meltdown.bar/" + that.city +
                             "/planning"
                };
            });
        } // extract()
    };
});
