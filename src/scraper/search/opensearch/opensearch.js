/**
 * @module
 * @license MIT
 * @author Sébastien Règne
 */

export default class OpenSearch {
    #url;

    #suggestions;

    #complements;

    constructor({ url, suggestions, complements }) {
        this.#url = url;
        this.#suggestions = suggestions;
        this.#complements = complements;
    }

    info() {
        return Promise.resolve(this.#complements);
    }

    async suggest(searchTerms) {
        if (0 === searchTerms.length || undefined === this.#suggestions) {
            return [];
        }

        const response = await fetch(
            this.#suggestions.replace("{searchTerms}", searchTerms),
        );
        const results = await response.json();
        return results[1];
    }

    result(searchTerms) {
        return Promise.resolve(this.#url.replace("{searchTerms}", searchTerms));
    }
}
