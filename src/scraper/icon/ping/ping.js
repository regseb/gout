const DEFAULT_COLORS = {
    // Bleu.
    1: "#4975b6",
    // Vert.
    2: "#148a00",
    // Orange.
    3: "#c75300",
    // Rouge.
    4: "#e12712",
    // Violet.
    5: "#8d6794",
    // Gris.
    0: "#757575",
};

export default class {

    #url;

    #colors;

    #complements;

    constructor({ url, colors, complements }) {
        this.#url = url;
        this.#colors = Object.entries(colors ?? DEFAULT_COLORS);
        this.#complements = { desc: url, link: url, ...complements };
    }

    async extract(max = Number.MAX_SAFE_INTEGER) {
        if (0 === max) {
            return [];
        }

        try {
            const response = await fetch(this.#url);
            // Choisir la couleur en fonction du code HTTP.
            for (const [prefix, color] of this.#colors) {
                if (response.status.toString().startsWith(prefix)) {
                    return [{
                        ...this.#complements,
                        color,
                        date: Date.now(),
                    }];
                }
            }
        } catch {
            // Ne rien faire (pour retourner la couleur d'un code HTTP inconnu).
        }

        return [{
            ...this.#complements,
            color: this.#colors["0"],
            date:  Date.now(),
        }];
    }
}
