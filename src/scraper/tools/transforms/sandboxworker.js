/**
 * @module
 * @license MIT
 * @author Sébastien Règne
 */

/**
 * Worker pour exécuter du code dans un bac à sable.
 */
export default class SandboxWorker {
    /**
     * Worker où sera exécuté le code.
     *
     * @type {Worker}
     */
    #worker;

    /**
     * L'identifiant de la précédente exécution.
     *
     * @type {number}
     */
    #id = 0;

    /**
     * La liste des promesses en attente d'être réalisées.
     *
     * @type {Map<number, Object<string, Function>>}
     */
    #promises = new Map();

    constructor(fn, init = () => {}, data = []) {
        const code = `
            (${init.toString()})(...${JSON.stringify(data)});
            const fn = ${fn.toString()};
            globalThis.addEventListener("message", async (event) => {
                const { id, args } = event.data;
                try {
                    const result = await fn(...args);
                    globalThis.postMessage({ id, result });
                } catch (err) {
                    globalThis.postMessage({ id, error: err });
                }
            });
        `;
        const blob = new Blob([code], { type: "application/javascript" });
        const blobURL = URL.createObjectURL(blob);
        this.#worker = new Worker(blobURL);
        URL.revokeObjectURL(blobURL);

        this.#worker.addEventListener(
            "message",
            this.#handleMessage.bind(this),
        );
    }

    exec(...args) {
        return new Promise((resolve, reject) => {
            this.#promises.set(++this.#id, { resolve, reject });
            this.#worker.postMessage({
                args,
                id: this.#id,
            });
        });
    }

    /**
     * Répartit un message à une promesse ou une notification.
     *
     * @param {MessageEvent} message Le message reçu du serveur.
     */
    #handleMessage({ data }) {
        if ("error" in data) {
            this.#promises.get(data.id).reject(new Error(data.error.message));
        } else {
            this.#promises.get(data.id).resolve(data.result);
        }
        this.#promises.delete(data.id);
    }
}
