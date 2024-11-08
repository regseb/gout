/**
 * @module
 * @license MIT
 * @author Sébastien Règne
 */

// Créer une prothèse pour la méthode `RegExp.escape`.
// https://github.com/tc39/proposal-regex-escaping
// https://issues.chromium.org/353856236
// https://bugzil.la/1918235
if (undefined === RegExp.escape) {
    /**
     * Protège les caractères spéciaux d'une chaine de caractères pour les
     * expressions rationnelles.
     *
     * @param {string} s La chaine de caractères.
     * @returns {string} La chaine de caractères avec les caractères spéciaux
     *                   protégés.
     */
    RegExp.escape = (s) =>
        s.replaceAll(/[$\(\)*+.?\[\\\]^\{\|\}]/gv, String.raw`\$&`);
}

/**
 * Les opérations de comparaison avec des chaines de caractères.
 *
 * @type {Object<string, Object<string, Function>>}
 */
const STRING_OP = Object.fromEntries(
    Object.entries({
        "==": (a, e) => a === e,
        "!=": (a, e) => a !== e,
        "*=": (a, e) => "string" === typeof a && a.includes(e),
        "^=": (a, e) => "string" === typeof a && a.startsWith(e),
        "$=": (a, e) => "string" === typeof a && a.endsWith(e),
        "~=": {
            prepare: (e) =>
                new RegExp(
                    String.raw`(?:^|\s)${RegExp.escape(e)}(?:$|\s)`,
                    "v",
                ),
            test: (a, e) => "string" === typeof a && e.test(a),
        },
    }).map(([op, value]) => [
        op,
        "function" === typeof value
            ? { prepare: (e) => e, test: value }
            : { prepare: value.prepare, test: value.test },
    ]),
);

/**
 * Les opérations de comparaison avec des expressions rationnelles.
 *
 * @type {Object<string, Object<string, Function>>}
 */
const REGEX_OP = {
    "==": {
        prepare: (e) => new RegExp(e, "v"),
        test: (a, e) => "string" === typeof a && e.test(a),
    },
    "!=": {
        prepare: (e) => new RegExp(e, "v"),
        test: (a, e) => !("string" === typeof a && e.test(a)),
    },
};

/**
 * Les opérations de comparaison avec des nombres.
 *
 * @type {Object<string, Object<string, Function>>}
 */
const NUMBER_OP = Object.fromEntries(
    Object.entries({
        "==": (a, e) => a === e,
        "!=": (a, e) => a !== e,
        "<": (a, e) => a < e,
        "<=": (a, e) => a <= e,
        ">": (a, e) => a > e,
        ">=": (a, e) => a >= e,
    }).map(([op, test]) => [op, { prepare: Number, test }]),
);

/**
 * Le motif pour les filtres avec des chaines de caractères (entre guillemets
 * simples).
 *
 * @type {RegExp}
 */
const STRING_PATTERN = new RegExp(
    String.raw`^\s*(?<prop>[a-zA-Z_][a-zA-Z_0-9]*)\s*` +
        "(?<op>(?:" +
        Object.keys(STRING_OP).map(RegExp.escape).join("|") +
        String.raw`))\s*` +
        String.raw`'(?<val>.*)'\s*$`,
    "v",
);

/**
 * Le motif pour les filtres avec des expressions rationnelles (entre barres
 * obliques, mais sans les marqueurs).
 *
 * @type {RegExp}
 */
const REGEX_PATTERN = new RegExp(
    String.raw`^\s*(?<prop>[a-zA-Z_][a-zA-Z_0-9]*)\s*` +
        "(?<op>(?:" +
        Object.keys(REGEX_OP).map(RegExp.escape).join("|") +
        String.raw`))\s*` +
        String.raw`/(?<val>.*)/\s*$`,
    "v",
);

/**
 * Le motif pour les filtres avec des nombres. Les nombres peuvent être entiers
 * (`123`, `123.`), décimaux (`123.456`, `.456`), positifs (`+123`) ou négatifs
 * (`-123`).
 *
 * @type {RegExp}
 */
const NUMBER_PATTERN = new RegExp(
    String.raw`^\s*(?<prop>[a-zA-Z_][a-zA-Z_0-9]*)\s*` +
        "(?<op>(?:" +
        Object.keys(NUMBER_OP).map(RegExp.escape).join("|") +
        String.raw`))\s*` +
        String.raw`(?<val>[+\-]?(?:\d+(?:\.\d*)?|\.\d+))\s*$`,
    "v",
);

const compile = (filter) => {
    if (undefined === filter) {
        return undefined;
    }
    let result = STRING_PATTERN.exec(filter);
    if (null !== result) {
        const { prop, op, val } = result.groups;
        const prepared = STRING_OP[op].prepare(val);
        const test = STRING_OP[op].test;
        return (item) => test(item[prop], prepared);
    }
    result = REGEX_PATTERN.exec(filter);
    if (null !== result) {
        const { prop, op, val } = result.groups;
        const prepared = REGEX_OP[op].prepare(val);
        const test = REGEX_OP[op].test;
        return (item) => test(item[prop], prepared);
    }
    result = NUMBER_PATTERN.exec(filter);
    if (null !== result) {
        const { prop, op, val } = result.groups;
        const prepared = NUMBER_OP[op].prepare(val);
        const test = NUMBER_OP[op].test;
        return (item) => test(item[prop], prepared);
    }
    throw new Error(`Invalid filter: "${filter}"`);
};

export default class FilterScraper {
    /**
     * La fonction pour filtrer prenant en argument un élément et retournant un
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
        if (undefined === this.#filter) {
            return this.#scraper.extract(max);
        }
        const items = await this.#scraper.extract(Number.MAX_SAFE_INTEGER);
        return items.filter(this.#filter).slice(0, max);
    }
}
