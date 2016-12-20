define([], function () {
    "use strict";

    const DEFAULT_COLORS = {
        "1": "#2196f3", // Bleu.
        "2": "#4caf50", // Vert.
        "3": "#ff9800", // Orange.
        "4": "#f44336", // Rouge.
        "5": "#9c27b0", // Violet.
        "0": "#9e9e9e"  // Gris.
    };

    return class {
        constructor({ url, icon, desc = url, link = url,
                      colors = DEFAULT_COLORS }) {
            this.url    = url;
            this.icon   = icon;
            this.desc   = desc;
            this.link   = link;
            this.colors = colors;
        } // constructor()

        extract() {
            const that = this;
            return fetch(this.url).then(function (response) {
                // Choisir la couleur en fonction du code HTTP.
                let color = that.colors["0"];
                for (let prefix in that.colors) {
                    if (response.status.toString().startsWith(prefix)) {
                        color = that.colors[prefix];
                        break;
                    }
                }
                return {
                    "icon":  that.icon,
                    "desc":  that.desc,
                    "link":  that.link,
                    "color": color
                };
            }).catch(function () {
                return {
                    "icon":  that.icon,
                    "desc":  that.desc,
                    "link":  that.link,
                    "color": that.colors["0"]
                };
            });
        } // extract()
    };
});
