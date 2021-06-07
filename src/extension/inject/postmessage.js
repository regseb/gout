/**
 * Le client pour se connecter à un serveur JSON-RPC.
 */
export const PostMessage = class {

    /**
     * Crée un client JSON-RPC.
     */
    constructor() {

        /**
         * L'identifiant de la précédente requête.
         *
         * @private
         * @type {number}
         */
        this.id = 0;

        /**
         * La liste des promesses en attente d'être réalisées.
         *
         * @private
         * @type {Map<number, Object>}
         */
        this.promises = new Map();

        window.addEventListener("message", this._handleMessage.bind(this));
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
            this.promises.set(++this.id, { resolve, reject });
            window.postMessage({
                id:     this.id,
                method,
                params,
            }, window);
        });
    }

    /**
     * Répartit un message à une promesse ou une notification.
     *
     * @private
     * @param {MessageEvent} message Le message reçu du serveur.
     */
    _handleMessage({ source, data }) {
        // Ignorer les messages venant d'une autre source.
        if (window !== source || "method" in data) {
            return;
        }

        if ("error" in data) {
            const err = new Error(data.error.message);
            err.name = data.error.name;
            this.promises.get(data.id).reject(err);
        } else {
            this.promises.get(data.id).resolve(data.result);
        }
        this.promises.delete(data.id);
    }
};
