/**
 * @module
 * @license MIT
 * @author Sébastien Règne
 */

import * as jfather from "./jfather.js";

const hashCode = function (text) {
    return Math.abs(
        Array.from(text).reduce((code, character) => {
            return (code << 5) - code + character.codePointAt();
        }, 0),
    ).toString(36);
};

/**
 * Charge récursivement des scrapers.
 *
 * @param {Object[]} scrapers La liste des configurations des scrapers.
 * @returns {Promise<Object[]>} Les scrapers.
 */
const loadScrapers = function (scrapers) {
    return Promise.all(
        scrapers.map(async (scraper) => {
            const subScrapers = await loadScrapers(scraper.scrapers ?? []);

            // eslint-disable-next-line no-unsanitized/method
            const { default: Scraper } = await import(scraper.url);
            return new Scraper(scraper.options ?? {}, subScrapers);
        }),
    );
};

/**
 * Charge un widget.
 *
 * @param {Object} widget La configuration du widget (un module et des éventuels
 *                        scrapers).
 * @returns {Promise<Object>} Le module avec ses éventuels scrapers.
 */
const loadWidget = async function (widget) {
    const scrapers = await loadScrapers(widget.scrapers ?? []);

    // eslint-disable-next-line no-unsanitized/method
    const { default: Module } = await import(widget.module.url);
    const name = "gout-" + hashCode(widget.module.url);
    if (undefined === customElements.get(name)) {
        customElements.define(name, Module);
    }
    return new Module(widget.module.options ?? {}, scrapers);
};

const liven = async function (script) {
    try {
        const config =
            "" === script.src
                ? await jfather.parse(script.text)
                : await jfather.load(script.src);
        const widget = await loadWidget(config);
        widget.classList.add("widget");
        script.after(widget);
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
Array.from(
    document.querySelectorAll(`body script[type="application/json"]`),
    liven,
);
