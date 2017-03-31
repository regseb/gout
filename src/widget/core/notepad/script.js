(function () {
    "use strict";

    const owner = (document["_currentScript"] || document.currentScript)
                                                                 .ownerDocument;

    const $ = require("jquery");

    document.registerElement("core-notepad", class extends HTMLElement {

        setFiles({ "config.json": config, "icon.svg": icon }) {
            this.style.backgroundColor = config.color || "black";
            if (undefined !== icon) {
                this.style.backgroundImage = "url(\"data:image/svg+xml;" +
                                             "base64," + btoa(icon) + "\")";
            }

            $("textarea", this).val(this.load())
                               .attr({ "title":       config.desc  || "",
                                       "placeholder": config.title || "" })
                               .css("border-color", config.color || "black")
                               .change(this.change.bind(this));
        } // setFiles()

        save(value) {
            localStorage.setItem("widget/core/notepad/" + this.id, value);
        } // save()

        load() {
            return localStorage.getItem("widget/core/notepad/" + this.id);
        } // load()

        change() {
            this.save($("textarea", this).val());
        } // change()

        createdCallback() {
            const template = owner.querySelector("template").content;
            const clone = owner.importNode(template, true);
            this.appendChild(clone);
        } // createdCallback()
    });
})();
