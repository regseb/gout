/**
 * @module
 * @license MIT
 * @author Sébastien Règne
 */

import JFather from "https://esm.sh/jfather@0.4.0";
import YAML from "https://esm.sh/yaml@2.8.0";

const hashCode = function (text) {
    return Math.abs(
        Array.from(text).reduce((code, character) => {
            return (code << 5) - code + character.codePointAt(0);
        }, 0),
    ).toString(36);
};

/**
 * Requête la configuration d'un widget, en gérant les formats JSON et YAML.
 *
 * @param {string} url L'URL de la configuration.
 * @returns {Promise<Record<string, Object>>} Une promesse contenant la
 *                                            configuration du widget.
 */
const request = async function (url) {
    const response = await fetch(url);
    try {
        return await response.json();
    } catch {
        // Si la configuration n'est pas du JSON, essayer avec du YAML et
        // retourner son équivalent en JSON.
        const yaml = await response.text();
        return YAML.parse(yaml);
    }
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
 * @returns {Promise<HTMLElement>} L'élément HTML du widget.
 */
const loadWidget = async function (widget) {
    const scrapers = await loadScrapers(widget.module.scrapers ?? []);

    // eslint-disable-next-line no-unsanitized/method
    const { default: Module } = await import(widget.module.url);
    if (null === customElements.getName(Module)) {
        customElements.define(
            `gout-${Module.name.toLowerCase()}` +
                `-${hashCode(widget.module.url)}`,
            Module,
        );
    }
    return new Module(widget.module.options ?? {}, scrapers);
};

const liven = async function (script) {
    try {
        let config;
        if ("application/yaml" === script.type) {
            config =
                "" === script.src
                    ? await JFather.extend(YAML.parse(script.text), { request })
                    : await JFather.load(script.src, { request });
        } else {
            config =
                "" === script.src
                    ? await JFather.parse(script.text, { request })
                    : await JFather.load(script.src, { request });
        }
        const widget = await loadWidget(config);
        widget.classList.add("widget");
        script.after(widget);
    } catch (err) {
        // eslint-disable-next-line no-console
        console.error(script.src, script.text, err);
    }
};

// Ajouter la feuille de style.
const link = document.createElement("link");
link.rel = "stylesheet";
link.href = import.meta.resolve("./style.css");
document.head.append(link);

// Activer les widgets.
Array.from(
    document.querySelectorAll(
        'body script[type="application/yaml"],' +
            ' body script[type="application/json"]',
    ),
    liven,
);
