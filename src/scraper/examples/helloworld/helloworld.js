/**
 * @module
 * @license MIT
 * @author Sébastien Règne
 */

/**
 * Scraper d'exemple qui retourne un "Hello world!". Cette classe doit être
 * exportée par défaut pour être utilisée par le moteur de Gout.
 */
export default class HelloWorldScraper {
    /**
     * Le nom de la personne à saluer.
     */
    #who;

    /**
     * Crée une instance du scraper.
     *
     * @param {Object} options       Les options du scraper (qui ont été
     *                               définies dans la configuration du widget).
     * @param {string} [options.who] Le nom de la personne à saluer (qui a été
     *                               renseigné dans la propriété "who" dans la
     *                               configuration du widget).
     */
    constructor({ who }) {
        // Le premier paramètre du constructeur contient les options du scraper.
        // Si aucune option n'est spécifiée dans la configuration du widget, le
        // constructeur recevra un objet vide.

        // Récupérer le nom de la personne à saluer dans les options du scraper.
        // Si le nom n'est pas défini, utiliser le mot "world" par défaut.
        this.#who = who ?? "world";
    }

    /**
     * Extraire les éléments pour les fournir au module (qui a été défini dans
     * la configuration du widget).
     *
     * @param {number} max Le nombre maximum d'éléments à retourner.
     * @returns {Promise<Object[]>} Une promesse contenant un tableau avec un
     *                              seul élément ayant la salutation.
     */
    extract(max = Number.MAX_SAFE_INTEGER) {
        // Si aucun élément n'est demandé, retourner une promesse contenant un
        // tableau vide. La méthode extract() doit retourner une promesse
        // contenant un tableau d'objets pour être compatible avec les autres
        // scrapers.
        if (0 === max) {
            return Promise.resolve([]);
        }

        // Retourner une promesse contenant un tableau avec un seul élément. Ce
        // scraper retourne un seul élément, mais d'autres scrapers peuvent
        // retourner une liste d'éléments.
        return Promise.resolve([
            // Utiliser un Object pour représenter l'élément. Ce scraper
            // renseigne seulement la propriété "title" de l'élément, mais
            // d'autres scrapers renseignent d'autres propriétés (comme "link",
            // "desc", "guid"...).
            {
                // Définir la salutation dans la propriété "title" de l'élément
                // pour que le module puisse l'afficher. Le mot "Hello" est
                // concaténé avec la variable privée "#who" (qui contient la
                // valeur récupérée dans la configuration du widget).
                title: `Hello ${this.#who}!`,
            },
        ]);
    }
}
