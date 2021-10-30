/**
 * @module
 */

import { Typeson } from "./ponyfill.js";

const typeson = new Typeson();

/**
 * Le client pour se connecter à un serveur JSON-RPC.
 */
export const PostMessage = class {

    /**
     * L'identifiant de la précédente requête.
     *
     * @type {number}
     */
    #id = 0;

    /**
     * La liste des promesses en attente d'être réalisées.
     *
     * @type {Map<number, Object>}
     */
    #promises = new Map();

    /**
     * Crée un client JSON-RPC.
     */
    constructor() {
        window.addEventListener("message", this.#handleMessage.bind(this));
    }

    /**
     * Envoie une requête au serveur.
     *
     * @param {string} method La méthode appelée.
     * @param {...any} params Les éventuels paramètres de la méthode.
     * @returns {Promise<*>} Une promesse contenant le résultat du serveur.
     */
    send(method, ...params) {
        return new Promise((resolve, reject) => {
            this.#promises.set(++this.#id, { resolve, reject });
            window.postMessage({
                id:     this.#id,
                method,
                // Faire un clonage structuré car Chromium ne le fait pas
                // nativement et l'envoi du message peut échouer si les
                // paramètres contiennent un URLSearchParams.
                // https://crbug.com/1233571
                params: typeson.encapsulate(params),
            }, window);
        });
    }

    /**
     * Associe un message à une promesse.
     *
     * @param {MessageEvent} message Le message reçu du serveur.
     */
    #handleMessage({ source, data }) {
        // Ignorer les messages venant d'une autre source.
        if (window !== source || "method" in data) {
            return;
        }

        if ("error" in data) {
            const err = new Error(data.error.message);
            err.name = data.error.name;
            this.#promises.get(data.id).reject(err);
        } else {
            this.#promises.get(data.id).resolve(data.result);
        }
        this.#promises.delete(data.id);
    }
};
