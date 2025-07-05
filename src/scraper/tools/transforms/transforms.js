/**
 * @module
 * @license MIT
 * @author Sébastien Règne
 */

import SandboxWorker from "./sandboxworker.js";

const FN = async (items) => {
    for (const item of items) {
        for (const [key, transform] of globalThis.TRANSFORMS) {
            item[key] = await transform(item[key]);
        }
    }
    return items;
};

const INIT = (transforms) => {
    // https://developer.mozilla.org/Web/JavaScript/Reference/Global_Objects/AsyncFunction
    // eslint-disable-next-line func-names, no-empty-function
    const AsyncFunction = async function () {}.constructor;

    globalThis.TRANSFORMS = transforms.map(([key, transform]) => [
        key,
        // La création d'une fonction à partir d'une chaîne de caractères n'est
        // pas problématique, car cette fonction est exécutée dans le Worker
        // bac à sable.
        new AsyncFunction(key, transform),
    ]);
};

export default class TransformsScraper {
    #sandbox;

    /**
     * Le sous-scraper.
     *
     * @type {Object}
     */
    #scraper;

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

    async extract(max = Number.MAX_SAFE_INTEGER) {
        const items = await this.#scraper.extract(max);
        return undefined === this.#sandbox
            ? items
            : await this.#sandbox.exec(items);
    }
}
