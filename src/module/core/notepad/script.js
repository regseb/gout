fetch("module/core/notepad/index.html").then(function (response) {
    return response.text();
}).then(function (data) {
    return new DOMParser().parseFromString(data, "text/html")
                          .querySelector("template");
}).then(function (template) {
    const $ = require("jquery");

    const STORAGE_KEY = location.search + "module/code/notepad/";

    customElements.define("core-notepad", class extends HTMLElement {

        set files({ "config.json": config, "icon.svg": icon }) {
            this._config = config;
            this._icon   = icon;
        }

        save(value) {
            localStorage.setItem(STORAGE_KEY + this.id, value);
        }

        load() {
            return localStorage.getItem(STORAGE_KEY + this.id);
        }

        change() {
            this.save($("textarea", this).val());
        }

        connectedCallback() {
            this.appendChild(template.content.cloneNode(true));

            this.style.backgroundColor = this._config.color || "black";
            if (undefined !== this._icon) {
                this.style.backgroundImage = "url(\"data:image/svg+xml;" +
                                             "base64," + btoa(this._icon) +
                                             "\")";
            }

            $("textarea", this)
                    .val(this.load())
                    .attr({ "title":       this._config.desc  || "",
                            "placeholder": this._config.title || "" })
                    .css("border-color", this._config.color || "black")
                    .change(this.change.bind(this));

            // Adapter la hauteur de zone de saisie en fonction du nombre de
            // lignes.
            const textarea = this.querySelector("textarea");
            textarea.addEventListener("input", function () {
                textarea.style.height = "auto";
                textarea.style.height = 7 + textarea.scrollHeight + "px";
            });
        }
    });
});
