/**
 * @module
 */

/**
 * Résous un chemin relatif à partir du module.
 *
 * @param {string} specifier Le chemin relatif vers un fichier.
 * @returns {string} L'URL absolue vers le fichier.
 * @see https://github.com/whatwg/html/issues/3871
 */
const resolve = function (specifier) {
    return new URL(specifier, import.meta.url).href;
};

const hashCode = function (text) {
    return Math.abs(Array.from(text).reduce((code, character) => {
        return (code << 5) - code + character.codePointAt();
    }, 0)).toString(36);
};

/**
 * Fusionne deux objets.
 *
 * @param {*} first  Le premier objet.
 * @param {*} second Le second objet.
 * @returns {*} La fusion des deux objets.
 */
const merge = function (first, second) {
    let third;

    if ("object" === typeof first && !Array.isArray(first) &&
            "object" === typeof second && !Array.isArray(second)) {
        third = {};
        for (const key of new Set([...Object.keys(first),
                                   ...Object.keys(second)])) {
            // Si la propriété est dans les deux objets.
            if (key in first && key in second) {
                third[key] = merge(first[key], second[key]);
            // Si la propriété est seulement dans le premier objet.
            } else if (key in first) {
                third[key] = first[key];
            // Si la propriété est seulement dans le second objet.
            } else {
                third[key] = second[key];
            }
        }
    } else {
        third = second;
    }

    return third;
};

const normalize = async function (parameters) {
    const parents = await Promise.all([parameters.extends ?? []]
                                                 .flat().map(async (extend) => {
        const response = await fetch(extend);
        const json = await response.json();

        const RE = /^#(?:(?<module>module)|scrapers\[(?<scraper>\d+)\])$/u;
        const result = RE.exec(new URL(extend).hash);
        if (undefined !== result?.groups?.module) {
            return normalize(json.module);
        }
        if (undefined !== result?.groups?.scraper) {
            const index = Number.parseInt(result.groups.scraper, 10);
            return normalize(json.scrapers[index]);
        }
        throw new Error("No hash specified");
    }));

    parents.push({
        ...undefined === parameters.url ? {}
                                        : { url: parameters.url },
        config: parameters.config ?? {},
    });
    return parents.reduce(merge);
};

const liven = async function (script) {
    try {
        // Récupérer le widget.
        let widget = {};
        if ("" !== script.src) {
            const response = await fetch(script.src);
            widget = merge(widget, await response.json());
        }
        if ("" !== script.text) {
            widget = merge(widget, JSON.parse(script.text));
        }
        widget.module = await normalize(widget.module);
        widget.scrapers = await Promise.all((widget.scrapers ?? [])
                                                               .map(normalize));

        // Récupérer les éventuels scrapers.
        const scrapers = await Promise.all(widget.scrapers
                                                       .map(async (scraper) => {
            try {
                // eslint-disable-next-line no-unsanitized/method
                const { default: Scraper } = await import(scraper.url);
                return new Scraper(scraper.config);
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
        const module = new Module(widget.module.config, scrapers);
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
link.href = resolve("./style.css");
document.head.append(link);

// Attendre que le script d'enrichissement soit chargé avant d'activer les
// widgets.
document.head.addEventListener("load", (event) => {
    if ("SCRIPT" === event.target.nodeName &&
            event.target.src.endsWith("/inject/enrich.js")) {
        // Activer les widgets.
        Array.from(document.querySelectorAll("body script" +
                                                   `[type="application/json"]`))
             .forEach(liven);
    }
}, true);
