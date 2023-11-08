/**
 * @module
 * @license MIT
 * @author Sébastien Règne
 */

const DEFAULT_COLORS = {
    // Bleu.
    "1xx": "#4975b6",
    // Vert.
    "2xx": "#148a00",
    // Orange.
    "3xx": "#c75300",
    // Rouge.
    "4xx": "#e12712",
    // Violet.
    "5xx": "#8d6794",
    // Gris.
    xxx: "#757575",
};

export default class PingScraper {
    #url;

    #colors;

    #defaultColor;

    #complements;

    constructor({ url, colors, complements }) {
        this.#url = url;
        this.#colors = new Map(
            Object.entries({ ...colors, ...DEFAULT_COLORS })
                .filter(([p]) => "xxx" !== p)
                .map(([p, c]) => [new RegExp(p, "u"), c]),
        );
        this.#complements = { desc: url, link: url, ...complements };
        this.#defaultColor = colors?.xxx ?? DEFAULT_COLORS.xxx;
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
                    return [
                        {
                            ...this.#complements,
                            color: this.#colors.get(prefix),
                            date: Date.now(),
                        },
                    ];
                }
            }
        } catch {
            // Ne rien faire (pour retourner la couleur d'un code HTTP inconnu).
        }

        return [
            {
                ...this.#complements,
                color: this.#defaultColor,
                date: Date.now(),
            },
        ];
    }
}
