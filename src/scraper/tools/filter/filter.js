/**
 * @module
 * @license MIT
 * @author Sébastien Règne
 */

/**
 * Type du sous-scraper.
 *
 * @typedef {Object} Scraper
 * @prop {(max: number) => Promise<Record<string, any>[]>} extract Méthode pour
 *                                                                 extrait des
 *                                                                 éléments.
 */

/**
 * Opérations de comparaison avec des chaines de caractères.
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
            prepare: (e, f) =>
                new RegExp(
                    String.raw`(?:^|\s)${RegExp.escape(e)}(?:$|\s)`,
                    `${f.includes("i") ? "i" : ""}v`,
                ),
            test: (a, e) => "string" === typeof a && e.test(a),
        },
    }).map(([op, value]) => [
        op,
        "function" === typeof value
            ? {
                  prepare: (e, f) => (f.includes("i") ? e.toLowerCase() : e),
                  test: value,
              }
            : { prepare: value.prepare, test: value.test },
    ]),
);

/**
 * Opérations de comparaison avec des expressions rationnelles.
 *
 * @type {Object<string, Object<string, Function>>}
 */
const REGEX_OP = {
    "==": {
        prepare: (e, f) => new RegExp(e, `${f}v`),
        test: (a, e) => "string" === typeof a && e.test(a),
    },
    "!=": {
        prepare: (e, f) => new RegExp(e, `${f}v`),
        test: (a, e) => !("string" === typeof a && e.test(a)),
    },
};

/**
 * Opérations de comparaison avec des nombres.
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
 * Motif pour les filtres avec des chaines de caractères (entre guillemets
 * simples). Le format est inspiré des
 * [sélecteurs d'attributs](https://developer.mozilla.org/Web/CSS/Reference/Selectors/Attribute_selectors)
 * en CSS.
 *
 * @type {RegExp}
 */
const STRING_PATTERN = new RegExp(
    String.raw`^\s*(?<prop>[A-Z_a-z]\w*)\s*` +
        "(?<op>(?:" +
        Object.keys(STRING_OP).map(RegExp.escape).join("|") +
        String.raw`))\s*` +
        String.raw`'(?<val>.*)'\s*` +
        String.raw`(?<flag>[ISis]?)\s*$`,
    "v",
);

/**
 * Motif pour les filtres avec des expressions rationnelles (entre barres
 * obliques et avec une sélection de marqueurs).
 *
 * @type {RegExp}
 */
const REGEX_PATTERN = new RegExp(
    String.raw`^\s*(?<prop>[A-Z_a-z]\w*)\s*` +
        "(?<op>(?:" +
        Object.keys(REGEX_OP).map(RegExp.escape).join("|") +
        String.raw`))\s*` +
        "/(?<val>.*)/" +
        String.raw`(?<flag>[ims]*)\s*$`,
    "v",
);

/**
 * Motif pour les filtres avec des nombres. Les nombres peuvent être entiers
 * (`123`, `123.`), décimaux (`123.456`, `.456`), positifs (`+123`) ou négatifs
 * (`-123`).
 *
 * @type {RegExp}
 */
const NUMBER_PATTERN = new RegExp(
    String.raw`^\s*(?<prop>[A-Z_a-z]\w*)\s*` +
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
        const { prop, op, val, flag } = result.groups;
        const prepared = STRING_OP[op].prepare(val, flag);
        const test = STRING_OP[op].test;
        return (item) =>
            test(
                flag.includes("i") && "string" === typeof item[prop]
                    ? item[prop].toLowerCase()
                    : item[prop],
                prepared,
            );
    }
    result = REGEX_PATTERN.exec(filter);
    if (null !== result) {
        const { prop, op, val, flag } = result.groups;
        const prepared = REGEX_OP[op].prepare(val, flag);
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
     * Fonction pour filtrer prenant en argument un élément et retournant un
     * booléen.
     *
     * @type {Function}
     */
    #filter;

    /**
     * Sous-scraper.
     *
     * @type {Scraper}
     */
    #scraper;

    /**
     * Crée le scraper de filtrage.
     *
     * @param {Object}    options        Options du scraper.
     * @param {string}    options.filter Filtre des éléments.
     * @param {[Scraper]} scrapers       Sous-scraper. Il ne peut en avoir
     *                                   qu'un.
     */
    constructor({ filter }, scrapers) {
        this.#filter = compile(filter);
        this.#scraper = scrapers[0];
    }

    /**
     * Extrait et filtre les éléments du sous-scraper.
     *
     * @param {number} [max] Nombre maximum d'éléments à retourner.
     * @returns {Promise<Record<string, any>[]>} Promesse contenant les éléments
     *                                           filtrés.
     */
    async extract(max = Number.MAX_SAFE_INTEGER) {
        if (undefined === this.#filter) {
            return this.#scraper.extract(max);
        }
        const items = await this.#scraper.extract(Number.MAX_SAFE_INTEGER);
        return items.filter(this.#filter).slice(0, max);
    }
}
