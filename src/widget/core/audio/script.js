(function () {
    "use strict";

    const owner = (document["_currentScript"] || document.currentScript)
                                                                 .ownerDocument;

    const $ = require("jquery");

    document.registerElement("core-audio", class extends HTMLElement {

        setFiles({ "config.json": config, "icon.svg": icon }) {
            this.style.backgroundColor = config.color;
            $("a", this).attr("href", config.link);
            if (undefined !== icon) {
                $("img", this).attr("src", "data:image/svg+xml;base64," +
                                            btoa(icon));
            }
            if ("" === config.desc) {
                $("span", this).remove();
            } else {
                $("span", this).html(config.desc);
            }

            $("audio", this).attr("src", config.url);

            $("input", this).change(this.change.bind(this));
        } // setFiles()

        setScrapers() {
            // Ne rien faire.
        } // setScrapers()

        change() {
            const audio = $("audio", this)[0];

            const volume = $("input", this).val();
            audio.volume = volume / 100.0;
            if (0 === volume) {
                audio.pause();
            } else {
                audio.play();
            }
        } // change()

        createdCallback() {
            const template = owner.querySelector("template").content;
            const clone = owner.importNode(template, true);
            this.appendChild(clone);
        } // createdCallback()
    });
})();
