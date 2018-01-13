fetch("module/core/audio/index.html").then(function (response) {
    return response.text();
}).then(function (data) {
    return new DOMParser().parseFromString(data, "text/html")
                          .querySelector("template");
}).then(function (template) {
    const $ = require("jquery");

    customElements.define("core-audio", class extends HTMLElement {

        set files({ "config.json": config, "icon.svg": icon }) {
            this._config = config;
            this._icon = icon;
        }

        turn() {
            const audio = $("audio", this)[0];

            const volume = $("input", this).val();
            audio.volume = volume / 100.0;
            if (0 === volume) {
                audio.pause();
            } else {
                audio.play();
            }
        }

        connectedCallback() {
            this.appendChild(template.content.cloneNode(true));

            this.style.backgroundColor = this._config.color;
            if ("link" in this._config) {
                $("a", this).attr("href", this._config.link);
            }
            if (undefined !== this._icon) {
                $("img", this).attr("src", "data:image/svg+xml;base64," +
                                            btoa(this._icon));
            }
            if ("" === this._config.desc) {
                $("span", this).remove();
            } else {
                $("span", this).html(this._config.desc);
            }

            $("audio", this).attr("src", this._config.url);

            $("input", this).change(this.turn.bind(this));
        }
    });
});
