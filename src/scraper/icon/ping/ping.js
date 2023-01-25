/**
 * @module
 */

const DEFAULT_COLORS = {
    // Bleu.
    "1..": "#4975b6",
    // Vert.
    "2..": "#148a00",
    // Orange.
    "3..": "#c75300",
    // Rouge.
    "4..": "#e12712",
    // Violet.
    "5..": "#8d6794",
    // Gris.
    "...": "#757575",
};

export default class Ping {

    #url;

    #colors;

    #defaultColor;

    #complements;

    constructor({ url, colors, complements }) {
        this.#url = url;
        this.#colors = new Map(Object.entries({ ...colors, ...DEFAULT_COLORS })
                                     .filter(([p]) => "..." !== p)
                                     .map(([p, c]) => [new RegExp(p, "u"), c]));
        this.#defaultColor = colors?.["..."] ?? DEFAULT_COLORS["..."];
        this.#complements = { desc: url, link: url, ...complements };
    }

    async extract(max = Number.MAX_SAFE_INTEGER) {
        if (0 === max) {
            return [];
        }

        try {
            const response = await fetch(this.#url);
            // Choisir la couleur en fonction du code HTTP.
            for (const prefix of this.#colors.keys()) {
                if (prefix.test(response.status.toString())) {
                    return [{
                        ...this.#complements,
                        color: this.#colors.get(prefix),
                        date:  Date.now(),
                    }];
                }
            }
        } catch {
            // Ne rien faire (pour retourner la couleur d'un code HTTP inconnu).
        }

        return [{
            ...this.#complements,
            color: this.#defaultColor,
            date:  Date.now(),
        }];
    }
}
