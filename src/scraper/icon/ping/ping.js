const DEFAULT_COLORS = {
    // Bleu.
    1: "#2196f3",
    // Vert.
    2: "#4caf50",
    // Orange.
    3: "#ff9800",
    // Rouge.
    4: "#f44336",
    // Violet.
    5: "#9c27b0",
    // Gris.
    0: "#9e9e9e",
};

export const Scraper = class {
    constructor({ url, colors = DEFAULT_COLORS, complements }) {
        this._url = url;
        this._colors = colors;
        this._complements = { desc: url, link: url, ...complements };
    }

    async extract() {
        try {
            const response = await fetch(this._url);
            // Choisir la couleur en fonction du code HTTP.
            let color = this._colors["0"];
            for (const prefix of Object.keys(this._colors)) {
                if (response.status.toString().startsWith(prefix)) {
                    color = this._colors[prefix];
                    break;
                }
            }
            return [{
                ...this._complements,
                color,
                date: Date.now(),
            }];
        } catch {
            return [{
                ...this._complements,
                color: this._colors["0"],
                date:  Date.now(),
            }];
        }
    }
};
