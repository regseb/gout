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
        const text = await response.text();
        const xml = new DOMParser().parseFromString(text, "application/xml");

        return Array.from(xml.querySelectorAll("item"))
                    .map((item) => ({
            audio: item.querySelector(`enclosure[type^="audio/"]`)
                       ?.getAttribute("url"),
            date:  item.querySelector("pubDate")?.textContent ??
                   // S'il n'y a pas de date de publication, utiliser la
                   // "dc:date".
                   item.querySelector("date").textContent,
            desc:  item.querySelector("description").textContent,
            guid:  item.querySelector("guid")?.textContent ?? "",
            img:   item.querySelector(`enclosure[type^="image/"]`)
                       ?.getAttribute("url"),
            link:  item.querySelector("link").textContent,
            title: item.querySelector("title").textContent,
        })).map((item) => ({
            audio: item.audio,
            date:  new Date(item.date).getTime(),
            desc:  new DOMParser().parseFromString(item.desc, "text/html")
                                  .body.textContent.trim(),
            guid:  0 === item.guid.length ? this._url + item.title + item.desc
                                          : this._url + item.guid,
            img:   item.img,
            link:  item.link,
            title: item.title,
        })).sort((i1, i2) => i2.date - i1.date)
           .slice(0, max)
           .map((i) => ({ ...this._complements, ...i }));
    }
};
