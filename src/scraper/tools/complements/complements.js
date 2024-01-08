/**
 * @module
 * @license MIT
 * @author Sébastien Règne
 */

export default class ComplementsScraper {
    #complements;

    /**
     * Le sous-scraper.
     *
     * @type {Object}
     */
    #scraper;

    constructor({ complements }, scrapers) {
        this.#complements = complements;
        this.#scraper = scrapers[0];
    }

    async extract(max = Number.MAX_SAFE_INTEGER) {
        const items = await this.#scraper.extract(max);
        return items.map((i) => ({ ...this.#complements, ...i }));
    }
}
