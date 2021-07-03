/**
 * @module
 */

export default class {

    constructor({ url, complements }) {
        this._url = url;
        this._complements = complements;
    }

    _extractRSS(xml, max) {
        return Array.from(xml.querySelectorAll("item"))
                    .map((item) => ({
            audio: item.querySelector(`enclosure[type^="audio/"]`)
                       ?.getAttribute("url"),
            date:  item.querySelector("pubDate")?.textContent ??
                   // S'il n'y a pas de date de publication, utiliser la
                   // "dc:date".
                   item.querySelector("date").textContent,
            desc:  item.querySelector("description")?.textContent ?? "",
            guid:  item.querySelector("guid")?.textContent ?? "",
            img:   item.querySelector(`enclosure[type^="image/"]`)
                       ?.getAttribute("url"),
            link:  item.querySelector("link")?.textContent,
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

    _extractAtom(xml, max) {
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

    async extract(max) {
        const response = await fetch(this._url);
        const text = await response.text();
        const xml = new DOMParser().parseFromString(text, "application/xml");

        switch (xml.documentElement.nodeName) {
            case "rss":  return this._extractRSS(xml, max);
            case "feed": return this._extractAtom(xml, max);
            default: throw new Error("Unknown format");
        }
    }
}
