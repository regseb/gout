/**
 * @module
 * @license MIT
 * @author Sébastien Règne
 */

import chain from "../../../utils/scraper/chain.js";
import ComplementsScraper from "../../tools/complements/complements.js";
import FilterScraper from "../../tools/filter/filter.js";
import TransformsScraper from "../../tools/transforms/transforms.js";

const JSONFeedScraper = class {
    #url;

    constructor({ url }) {
        this.#url = url;
    }

    async extract(max = Number.MAX_SAFE_INTEGER) {
        const response = await fetch(this.#url);
        const json = await response.json();

        return json.items
            .map((item) => ({
                date: new Date(item.date_published).getTime(),
                desc: item.summary,
                guid: this.#url + item.id,
                img: item.image,
                link: item.url,
                title: item.title,
            }))
            .sort((i1, i2) => i2.date - i1.date)
            .slice(0, max);
    }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default chain(
    TransformsScraper,
    FilterScraper,
    ComplementsScraper,
    JSONFeedScraper,
    {
        dispatch: ({ transforms, filter, complements, ...others }) => [
            { transforms },
            { filter },
            { complements },
            others,
        ],
    },
);
