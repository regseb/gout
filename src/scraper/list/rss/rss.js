/**
 * @module
 * @license MIT
 * @author Sébastien Règne
 */

import chain from "../../../utils/scraper/chain.js";
import ComplementsScraper from "../../tools/complements/complements.js";
import FilterScraper from "../../tools/filter/filter.js";
import TransformsScraper from "../../tools/transforms/transforms.js";

const RSSScraper = class {
    #url;

    constructor({ url }) {
        this.#url = url;
    }

    #extractRSS(xml, max) {
        // eslint-disable-next-line array-func/from-map
        return Array.from(xml.querySelectorAll("item"), (item) => ({
            audio: item
                .querySelector('enclosure[type^="audio/"]')
                ?.getAttribute("url"),
            date:
                item.querySelector("pubDate")?.textContent ??
                // S'il n'y a pas de date de publication, utiliser la "dc:date".
                item.querySelector("date")?.textContent ??
                0,
            desc: item.querySelector("description")?.textContent ?? "",
            guid: item.querySelector("guid")?.textContent,
            img: item
                .querySelector('enclosure[type^="image/"]')
                ?.getAttribute("url"),
            link: item.querySelector("link")?.textContent,
            title: item.querySelector("title").textContent,
        }))
            .map((item) => ({
                audio: item.audio,
                date: new Date(item.date).getTime(),
                desc: new DOMParser()
                    .parseFromString(item.desc, "text/html")
                    .body.textContent.trim(),
                guid:
                    undefined === item.guid
                        ? this.#url + item.title + item.desc
                        : this.#url + item.guid,
                img: item.img,
                link: item.link,
                title: item.title,
            }))
            .sort((i1, i2) => i2.date - i1.date)
            .slice(0, max);
    }

    #extractAtom(xml, max) {
        return Array.from(xml.querySelectorAll("entry"))
            .slice(0, max)
            .map((entry) => ({
                content: entry.querySelector("content")?.textContent ?? "",
                date:
                    entry.querySelector("published")?.textContent ??
                    entry.querySelector("updated").textContent,
                guid: entry.querySelector("id").textContent,
                link: entry.querySelector("link").getAttribute("href"),
                summary:
                    entry.querySelector("summary")?.textContent ??
                    // Essayer la description dans "media:group
                    // media:description".
                    entry.querySelector("group description")?.textContent ??
                    "",
                title:
                    // Essayer le titre dans "title" ou "media:group
                    // media:title".
                    entry.querySelector("title").textContent,
                thumbnail:
                    // Essayer la miniature dans "media:thumbnail" ou
                    // "media:group media:thumbnail".
                    entry.querySelector("thumbnail")?.getAttribute("url"),
            }))
            .map((item) => ({
                date: new Date(item.date).getTime(),
                desc: new DOMParser()
                    .parseFromString(
                        /^\s*$/v.test(item.summary)
                            ? item.content
                            : item.summary,
                        "text/html",
                    )
                    .body.textContent.trim(),
                guid: this.#url + item.guid,
                img: item.thumbnail,
                link: item.link,
                title: item.title,
            }));
    }

    async extract(max = Number.MAX_SAFE_INTEGER) {
        const response = await fetch(this.#url);
        const text = await response.text();
        const xml = new DOMParser().parseFromString(text, "application/xml");

        switch (xml.documentElement.nodeName) {
            case "rss":
                return this.#extractRSS(xml, max);
            case "feed":
                return this.#extractAtom(xml, max);
            case "parsererror":
                throw new Error(`XML invalid in ${this.#url}`);
            default:
                throw new Error(
                    `Unknown format '${xml.documentElement.nodeName}' of ` +
                        this.#url,
                );
        }
    }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default chain(
    TransformsScraper,
    FilterScraper,
    ComplementsScraper,
    RSSScraper,
    {
        dispatch: ({ transforms, filter, complements, ...others }) => [
            { transforms },
            { filter },
            { complements },
            others,
        ],
    },
);
