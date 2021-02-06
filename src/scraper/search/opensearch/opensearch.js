/**
 * @module
 */

export const Scraper = class {

    constructor({ url, suggestions, complements }) {
        this._url = url;
        this._suggestions = suggestions;
        this._complements = complements;
    }

    info() {
        return Promise.resolve(this._complements);
    }

    async suggest(searchTerms) {
        if (0 === searchTerms.length || undefined === this._suggestions) {
            return [];
        }

        const response = await fetch(this._suggestions.replace("{searchTerms}",
                                                               searchTerms));
        const results = await response.json();
        return results[1];
    }

    result(searchTerms) {
        return Promise.resolve(this._url.replace("{searchTerms}", searchTerms));
    }
};
