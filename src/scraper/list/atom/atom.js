/**
 * @module
 */

export default class {

    constructor({ url, complements }) {
        this._url = url;
        this._complements = complements;
    }

    async extract(max) {
        const response = await fetch(this._url);
        const text = await response.text();
        const xml = new DOMParser().parseFromString(text, "application/xml");

        return Array.from(xml.querySelectorAll(`entry:nth-of-type(-n+${max})`))
                    .map((entry) => ({
            content: entry.querySelector("content")?.textContent ?? "",
            date:    entry.querySelector("updated").textContent,
            guid:    entry.querySelector("id").textContent,
            link:    entry.querySelector("link").getAttribute("href"),
            summary: entry.querySelector("summary")?.textContent ?? "",
            title:   entry.querySelector("title").textContent,
        })).map((item) => ({
            date:  new Date(item.date).getTime(),
            desc:  new DOMParser().parseFromString(
                         0 === item.summary.trim().length ? item.content.trim()
                                                          : item.summary.trim(),
                         "text/html",
                   ).body.textContent.trim(),
            guid:  this._url + item.guid,
            link:  item.link,
            title: item.title,
        })).map((i) => ({ ...this._complements, ...i }));
    }
}
