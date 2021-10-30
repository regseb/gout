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

export default class {

    #url;

    #colors;

    #complements;

    constructor({ url, colors = DEFAULT_COLORS, complements }) {
        this.#url = url;
        this.#colors = colors;
        this.#complements = { desc: url, link: url, ...complements };
    }

    async extract(max = Number.MAX_SAFE_INTEGER) {
        if (0 === max) {
            return [];
        }

        try {
            const response = await fetch(this.#url);
            // Choisir la couleur en fonction du code HTTP.
            for (const [prefix, color] of Object.entries(this.#colors)) {
                if (response.status.toString().startsWith(prefix)) {
                    return [{
                        ...this.#complements,
                        color,
                        date:  Date.now(),
                    }];
                }
            }
            return [{
                ...this.#complements,
                color: this.#colors["0"],
                date:  Date.now(),
            }];
        } catch {
            return [{
                ...this.#complements,
                color: this.#colors["0"],
                date:  Date.now(),
            }];
        }
    }
}
