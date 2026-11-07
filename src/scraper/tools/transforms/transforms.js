/**
 * @module
 * @license MIT
 * @author Sébastien Règne
 */

import SandboxWorker from "./sandboxworker.js";

/**
 * Type du sous-scraper.
 *
 * @typedef {Object} Scraper
 * @prop {(max: number) => Promise<Record<string, any>[]>} extract Méthode pour
 *                                                                 extrait des
 *                                                                 éléments.
 */

/**
 * Function de transformation qui sera exécutée dans le bac à sable.
 *
 * @param {Record<string, any>[]} items Élements à transformer.
 * @returns {Promise<Record<string, any>[]>} Promesse contenant les élements
 *                                           transformés.
 */
const FN = async (items) => {
    for (const item of items) {
        for (const [key, transform] of globalThis.TRANSFORMS) {
            item[key] = await transform(item[key]);
        }
    }
    return items;
};

/**
 * Fonction d'initialisation qui sera exécutée dans le bac à sable.
 *
 * @param {[string, string][]} transforms Transformations d'un élément.
 */
const INIT = (transforms) => {
    // https://developer.mozilla.org/Web/JavaScript/Reference/Global_Objects/AsyncFunction
    // eslint-disable-next-line require-await
    const AsyncFunction = (async () => undefined).constructor;

    globalThis.TRANSFORMS = transforms.map(([key, transform]) => [
        key,
        // La création d'une fonction à partir d'une chaîne de caractères n'est
        // pas problématique, car cette fonction est exécutée dans le Worker
        // bac à sable.
        new AsyncFunction(key, transform),
    ]);
};

/**
 * Scraper de transformations.
 */
export default class TransformsScraper {
    /**
     * Bac à sable où seront exécutées les transformations.
     *
     * @type {SandboxWorker | undefined}
     */
    #sandbox;

    /**
     * Sous-scraper.
     *
     * @type {Scraper}
     */
    #scraper;

    /**
     * Crée le scraper de transformations.
     *
     * @param {Object}                 options            Options du scraper.
     * @param {Record<string, string>} options.transforms Transformations d'un
     *                                                    élément.
     * @param {[Scraper]}              scrapers           Sous-scraper. Il ne
     *                                                    peut en avoir qu'un.
     */
    constructor({ transforms }, scrapers) {
        this.#scraper = scrapers[0];

        // Ne pas créer de bac à sable inutile s'il n'y a pas de
        // transformations.
        if (0 !== Object.keys(transforms ?? {}).length) {
            this.#sandbox = new SandboxWorker(FN, INIT, [
                Object.entries(transforms).map(([key, transform]) => [
                    key,
                    transform.startsWith("{")
                        ? transform
                        : `return ${transform}`,
                ]),
            ]);
        }
    }

    /**
     * Extrait les éléments du sous-scraper, puis exécute les transformations.
     *
     * @param {number} [max] Nombre maximum d'éléments à retourner.
     * @returns {Promise<Record<string, any>[]>} Promesse contenant les éléments
     *                                           transformés.
     */
    async extract(max = Number.MAX_SAFE_INTEGER) {
        const items = await this.#scraper.extract(max);
        return undefined === this.#sandbox
            ? items
            : await this.#sandbox.exec(items);
    }
}
