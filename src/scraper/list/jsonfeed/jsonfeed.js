/**
 * @module
 */

export const Scraper = class {

    constructor({ url, complements }) {
        this._url = url;
        this._complements = complements;
    }

    async extract(max) {
        const response = await fetch(this._url);
        const json = await response.json();

        return json.items.map((item) => ({
            date:  new Date(item.date_published).getTime(),
            desc:  item.summary,
            guid:  this._url + item.id,
            img:   item.image,
            link:  item.url,
            title: item.title,
        })).sort((i1, i2) => i2.date - i1.date)
           .slice(0, max)
           .map((i) => ({ ...this._complements, ...i }));
    }
};
