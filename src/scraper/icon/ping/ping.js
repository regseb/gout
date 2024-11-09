/**
 * @module
 * @license MIT
 * @author Sébastien Règne
 */

import chain from "../../../utils/scraper/chain.js";
import ComplementsScraper from "../../tools/complements/complements.js";
import FilterScraper from "../../tools/filter/filter.js";

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

const PingScraper = class {
    #url;

    #colors;

    #defaultColor;

    constructor({ url, colors }) {
        this.#url = url;
        this.#colors = new Map(
            Object.entries({ ...colors, ...DEFAULT_COLORS })
                .filter(([p]) => "xxx" !== p)
                .map(([p, c]) => [new RegExp(p, "v"), c]),
        );
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
                color: this.#defaultColor,
                date: Date.now(),
            },
        ];
    }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default chain(FilterScraper, ComplementsScraper, PingScraper, {
    dispatch: ({ filter, complements, url, ...others }) => [
        { filter },
        { complements: { desc: url, link: url, ...complements } },
        { url, ...others },
    ],
});
