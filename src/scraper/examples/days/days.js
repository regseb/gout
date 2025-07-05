/**
 * @module
 * @license MIT
 * @author Sébastien Règne
 */

// Importer l'utilitaire pour chaîner les scrapers.
import chain from "../../../utils/scraper/chain.js";
// Importer le scraper pour compléter les informations.
import ComplementsScraper from "../../tools/complements/complements.js";
// Importer le scraper pour filtrer les éléments.
import FilterScraper from "../../tools/filter/filter.js";
// Importer le scraper pour transformer les valeurs des éléments.
import TransformsScraper from "../../tools/transforms/transforms.js";

/**
 * Mettre la première lettre d'une chaîne de caractères en majuscule.
 *
 * @param {string} input La chaîne de caractères à modifier.
 * @returns {string} La chaîne de caractères avec la première lettre en
 *                   majuscule.
 */
const capitalize = function (input) {
    return input.charAt(0).toUpperCase() + input.slice(1);
};

/**
 * Scraper d'exemple qui retourne les noms des prochains jours de la semaine.
 * Cette classe n'est pas exportée directement, car elle est chaînée avec
 * d'autres scrapers puis exporter (voir à la fin du fichier).
 */
const DaysScraper = class {
    /**
     * Le code ISO 639-1 de la langue.
     *
     * @type {string}
     */
    #lang;

    /**
     * Crée une instance du scraper.
     *
     * @param {Object} options        Les options du scraper (qui ont été
     *                                définies dans la configuration du widget).
     * @param {string} [options.lang] Le code ISO 639-1 de la langue (qui a été
     *                                renseigné dans la propriété "lang" dans la
     *                                configuration du widget).
     */
    constructor({ lang }) {
        // Récupérer le code ISO 639-1 de la langue dans les options du scraper.
        // Si la langue n'est pas définie, utiliser le français par défaut.
        this.#lang = lang ?? "fr";
    }

    /**
     * Extraire les éléments pour les fournir au module (qui a été défini dans
     * la configuration du widget).
     *
     * @param {number} max Le nombre maximum d'éléments à retourner.
     * @returns {Promise<Object[]>} Une promesse contenant un tableau avec les
     *                              prochains jours de la semaine.
     */
    extract(max = Number.MAX_SAFE_INTEGER) {
        // Retourner une promesse pour être compatible avec les autres scrapers.
        return Promise.resolve(
            // Pour les sept prochains jours, déterminer le nom du jour de la
            // semaine ("Lundi", "Mardi"...).
            [1, 2, 3, 4, 5, 6, 7]
                .map((i) => {
                    const day = new Date();
                    day.setDate(day.getDate() + i);
                    const title = capitalize(
                        day.toLocaleDateString(this.#lang, { weekday: "long" }),
                    );

                    // Regrouper les informations dans un objet.
                    return {
                        // Définir le nom du jour dans la propriété "title".
                        title,
                        // Ajouter un lien vers l'article Wikipédia du jour.
                        link: `https://${this.#lang}.wikipedia.org/wiki/${title}`,
                        // Renseigner la date en utilisant son timestamp (ce
                        // format est plus facile à manipuler). Cette propriété
                        // est utilisée pour trier les éléments du plus récent
                        // au plus ancien.
                        date: day.getTime(),
                    };
                })
                // Limiter le nombre d'éléments à retourner (dans le cas où le
                // maximum est inférieure à sept).
                .slice(0, max),
        );
    }
};

// Chainer les scrapers pour ajouter les fonctionnalités de filtrage, de
// complétion et de transformation dans DaysScraper.
// eslint-disable-next-line import/no-anonymous-default-export
export default chain(
    TransformsScraper,
    FilterScraper,
    ComplementsScraper,
    DaysScraper,
    {
        // Définir comment répartir les options entre les scrapers.
        dispatch: ({ transforms, filter, complements, ...others }) => [
            // Envoyer la propriété "transforms" des options à TransformsScraper.
            { transforms },
            // Envoyer la propriété "filter" des options à FilterScraper.
            { filter },
            // Envoyer la propriété "complements" des options à ComplementsScraper.
            { complements },
            // Envoyer les autres propriétés des options à DaysScraper.
            others,
        ],
    },
);

// Grâce à la chaine de scrapers, la configuration du widget est simplifiée. Par
// exemple, la configuration suivante :
//
// ```yaml
// module:
//   url: # ...
//   options: # ...
//   scrapers:
//     - url: "https://cdn.jsdelivr.net/gh/regseb/gout@0/src/scraper/tools/transforms/transforms.js"
//       options:
//         transforms: # ...
//       scrapers:
//       - url: "https://cdn.jsdelivr.net/gh/regseb/gout@0/src/scraper/tools/filter/filter.js"
//         options:
//           filter: # ...
//         scrapers:
//           - url: "https://cdn.jsdelivr.net/gh/regseb/gout@0/src/scraper/tools/complements/complements.js"
//             options:
//               complements: # ...
//             scrapers:
//               - url: "https://cdn.jsdelivr.net/gh/regseb/gout@0/src/scraper/examples/days/days.js"
//                 options:
//                   lang: # ...
// ```
//
// peut être simplifiée en :
//
// ```yaml
// module:
//   url: # ...
//   options: # ...
//   scrapers:
//     - url: "https://cdn.jsdelivr.net/gh/regseb/gout@0/src/scraper/examples/days/days.js"
//       options:
//         transforms: # ...
//         filter: # ...
//         complements: # ...
//         lang: # ...
// ```
