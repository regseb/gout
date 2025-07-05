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
 * Scraper d'exemple qui retourne les photos d'un album de l'API
 * JSONPlaceholder. Cette classe n'est pas exportée directement, car elle est
 * chaînée avec d'autres scrapers puis exporter (voir à la fin du fichier).
 */
const JSONPlaceholderScraper = class {
    /**
     * L'identifiant de l'album.
     *
     * @type {number}
     */
    #album;

    /**
     * Crée une instance du scraper.
     *
     * @param {Object} options       Les options du scraper (qui ont été
     *                               définies dans la configuration du widget).
     * @param {number} options.album L'identifiant de l'album (qui a été
     *                               renseigné dans la propriété "albumId" dans
     *                               la configuration du widget).
     */
    constructor({ album }) {
        // Récupérer l'identifiant de l'album dans les options du scraper. Il
        // n'y a pas de valeur par défaut, car la propriété est obligatoire.
        this.#album = album;
    }

    /**
     * Extraire les éléments pour les fournir au module (qui a été défini dans
     * la configuration du widget).
     *
     * @param {number} max Le nombre maximum d'éléments à retourner.
     * @returns {Promise<Object[]>} Une promesse contenant un tableau avec les
     *                              photos d'un album.
     */
    async extract(max = Number.MAX_SAFE_INTEGER) {
        // Appeler l'API JSONPlaceholder pour récupérer les photos d'un album.
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/photos?albumId=" +
                this.#album,
        );
        // Récupérer la liste des photos.
        const photos = await response.json();

        // Convertir les données des photos dans le format attendu par les
        // modules.
        return (
            photos
                .map((photo) => ({
                    // Stocker l'identifiant de la photo dans la propriété "guid".
                    guid: photo.id,
                    // Transférer le titre dans la propriété "title".
                    title: photo.title,
                    // Utiliser l'URL de la photo dans la propriété "link".
                    link: photo.url,
                    // Utiliser l'URL de la miniature pour l'URL de l'image affichée
                    // dans le module.
                    image: photo.thumbnailUrl,
                }))
                // Limiter éventuellement le nombre de photos retournées.
                .slice(0, max)
        );
    }
};

// Chainer les scrapers pour ajouter les fonctionnalités de filtrage, de
// complétion et de transformation dans JSONPlaceholderScraper.
// eslint-disable-next-line import/no-anonymous-default-export
export default chain(
    TransformsScraper,
    FilterScraper,
    ComplementsScraper,
    JSONPlaceholderScraper,
    {
        // Définir comment répartir les options entre les scrapers.
        dispatch: ({ transforms, filter, complements, ...others }) => [
            // Envoyer la propriété "transforms" des options à TransformsScraper.
            { transforms },
            // Envoyer la propriété "filter" des options à FilterScraper.
            { filter },
            // Envoyer la propriété "complements" des options à
            // ComplementsScraper.
            { complements },
            // Envoyer les autres propriétés des options à
            // JSONPlaceholderScraper.
            others,
        ],
    },
);
