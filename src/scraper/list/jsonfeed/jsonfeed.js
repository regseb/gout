/**
 * @module
 */

export default class JSONFeed {

    #url;

    #complements;

    constructor({ url, complements }) {
        this.#url = url;
        this.#complements = complements;
    }

    async extract(max = Number.MAX_SAFE_INTEGER) {
        const response = await fetch(this.#url);
        const json = await response.json();

        return json.items.map((item) => ({
            date:  new Date(item.date_published).getTime(),
            desc:  item.summary,
            guid:  this.#url + item.id,
            img:   item.image,
            link:  item.url,
            title: item.title,
        })).sort((i1, i2) => i2.date - i1.date)
           .slice(0, max)
           .map((i) => ({ ...this.#complements, ...i }));
    }
}
