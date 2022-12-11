/**
 * @module
 */

import * as json from "./json.js";

const hashCode = function (text) {
    return Math.abs(Array.from(text).reduce((code, character) => {
        return (code << 5) - code + character.codePointAt();
    }, 0)).toString(36);
};

const liven = async function (script) {
    try {
        // Récupérer le widget.
        const widgets = [{ module: {}, scrapers: [] }];
        if ("" !== script.src) {
            widgets.push(await json.load(script.src));
        }
        if ("" !== script.text) {
            widgets.push(await json.parse(script.text));
        }
        const widget = widgets.reduce(json.merge);

        // Récupérer les éventuels scrapers.
        const scrapers = await Promise.all(widget.scrapers
                                                       .map(async (scraper) => {
            try {
                // eslint-disable-next-line no-unsanitized/method
                const { default: Scraper } = await import(scraper.url);
                return new Scraper(scraper.config ?? {});
            } catch (err) {
                // eslint-disable-next-line no-console
                console.log(scraper.url, err);
                throw err;
            }
        }));

        // Récupérer le module.
        // eslint-disable-next-line no-unsanitized/method
        const { default: Module } = await import(widget.module.url);
        const name = "gout-" + hashCode(widget.module.url);
        if (undefined === customElements.get(name)) {
            customElements.define(name, Module);
        }
        const module = new Module(widget.module.config ?? {}, scrapers);
        module.classList.add("widget");
        script.after(module);
    } catch (err) {
        // eslint-disable-next-line no-console
        console.log(script.src, script.text, err);
    }
};

// Ajouter la feuille de style.
const link = document.createElement("link");
link.rel = "stylesheet";
link.href = import.meta.resolve("./style.css");
document.head.append(link);

// Activer les widgets.
Array.from(document.querySelectorAll(`body script[type="application/json"]`))
     .forEach(liven);
