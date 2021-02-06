const BASE_URL = import.meta.url.slice(0, import.meta.url.lastIndexOf("/") + 1);

const hash = function (text) {
    return Math.abs(Array.from(text).reduce((code, character) => {
        return (code << 5) - code + character.charCodeAt();
    }, 0)).toString(36);
};

const liven = async function (script) {
    try {
        // Récupérer le widget.
        let widget = {};
        if ("" !== script.src) {
            const response = await fetch(script.src);
            widget = { ...widget, ...await response.json() };
        }
        if ("" !== script.text) {
            widget = { ...widget, ...JSON.parse(script.text) };
        }

        // Récupérer les éventuels scrapers.
        const scrapers = await Promise.all(widget.scrapers
                                                      ?.map(async (scraper) => {
            try {
                const { Scraper } = await import(scraper.url);
                return new Scraper(scraper.config ?? {});
            } catch (err) {
                console.log(scraper.url, err);
                throw err;
            }
        }) ?? []);

        // Récupérer le module.
        const { Module } = await import(widget.module.url);
        const name = "gout-" + hash(widget.module.url);
        if (undefined === customElements.get(name)) {
            customElements.define(name, Module);
        }
        const module = new Module(widget.module.config ?? {}, scrapers);
        module.classList.add("widget");
        script.after(module);
    } catch (err) {
        console.log(script.src, script.text, err);
    }
};

// Ajouter le feuille de style.
const link = document.createElement("link");
link.rel = "stylesheet";
link.href = BASE_URL + "style.css";
document.head.append(link);

// Activer les widgets.
Array.from(document.querySelectorAll(`body script[type="application/json"]`))
     .forEach(liven);
