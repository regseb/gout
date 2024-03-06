/**
 * @module
 * @license MIT
 * @author Sébastien Règne
 */

/**
 * Protège les caractères spéciaux d'une chaine de caractères pour les
 * expressions rationnelles.
 *
 * @param {string} pattern La chaine de caractères.
 * @returns {string} La chaine de caractères avec les caractères spéciaux
 *                   protégés.
 * @see https://developer.mozilla.org/Web/JavaScript/Guide/Regular_expressions
 */
const quote = function (pattern) {
    return pattern.replaceAll(/[$()*+.?[\\\]^{|}]/gu, "\\$&");
};

const GENERIC_OP = {
    "==": (a, b) => a === b,
    "!=": (a, b) => a !== b,
    "<": (a, b) => a < b,
    "<=": (a, b) => a <= b,
    ">": (a, b) => a > b,
    ">=": (a, b) => a >= b,
};

const STRING_OP = {
    ...GENERIC_OP,
    "*=": (a, b) => "string" === typeof a && a.includes(b),
    "^=": (a, b) => "string" === typeof a && a.startsWith(b),
    "$=": (a, b) => "string" === typeof a && a.endsWith(b),
};

const NUMBER_OP = {
    ...GENERIC_OP,
};

const STRING_PATTERN = new RegExp(
    "^\\s*(?<prop>[a-zA-Z_][a-zA-Z_0-9]*)\\s*" +
        "(?<op>(?:" +
        Object.keys(STRING_OP).map(quote).join("|") +
        "))\\s*" +
        "'(?<val>.*)'\\s*$",
    "u",
);

const NUMBER_PATTERN = new RegExp(
    "^\\s*(?<prop>[a-zA-Z_][a-zA-Z_0-9]*)\\s*" +
        "(?<op>(?:" +
        Object.keys(NUMBER_OP).map(quote).join("|") +
        "))\\s*" +
        "(?<val>[0-9]+)\\s*$",
    "u",
);

const compile = (filter) => {
    if (undefined === filter) {
        return (_item) => true;
    }
    let result = STRING_PATTERN.exec(filter);
    if (null !== result) {
        const { prop, op, val } = result.groups;
        return (item) => STRING_OP[op](item[prop], val);
    }
    result = NUMBER_PATTERN.exec(filter);
    if (null !== result) {
        const { prop, op, val } = result.groups;
        return (item) => NUMBER_OP[op](item[prop], Number(val));
    }
    throw new Error(`Invalid filter: "${filter}"`);
};

export default class FilterScraper {
    /**
     * La fonction pour filtrer prennant en argument un élément et retournant un
     * booléen.
     *
     * @type {Function}
     */
    #filter;

    /**
     * Le sous-scraper.
     *
     * @type {Object}
     */
    #scraper;

    constructor({ filter }, scrapers) {
        this.#filter = compile(filter);
        this.#scraper = scrapers[0];
    }

    async extract(max = Number.MAX_SAFE_INTEGER) {
        const items = await this.#scraper.extract(Number.MAX_SAFE_INTEGER);
        return items.filter(this.#filter).slice(0, max);
    }
}
