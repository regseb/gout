/**
 * @module
 * @license MIT
 * @author Sébastien Règne
 */

/**
 * Scraper de répétitions.
 */
export default class RepeaterScraper {
    /**
     * Crée un scraper répétant des valeurs fixes.
     *
     * @param {Record<string, any>} options Valeurs dont la clé simulera une
     *                                      méthode du scraper.
     */
    constructor(options) {
        // eslint-disable-next-line no-constructor-return
        return new Proxy(
            {},
            {
                get(target, prop) {
                    return Object.hasOwn(options, prop)
                        ? () => options[prop]
                        : target[prop];
                },
            },
        );
    }
}
