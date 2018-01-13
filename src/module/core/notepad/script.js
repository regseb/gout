fetch("module/core/notepad/index.html").then(function (response) {
    return response.text();
}).then(function (data) {
    return new DOMParser().parseFromString(data, "text/html")
                          .querySelector("template");
}).then(function (template) {
    const $ = require("jquery");

    customElements.define("core-notepad", class extends HTMLElement {

        set files({ "config.json": config, "icon.svg": icon }) {
            this._config = config;
            this._icon   = icon;
        }

        save(value) {
            localStorage.setItem("module/core/notepad/" + this.id, value);
        }

        load() {
            return localStorage.getItem("module/core/notepad/" + this.id);
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
        }
    });
});
