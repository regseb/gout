/**
 * @module
 */

export const PostMessageServer = class {
    #getters = {};

    constructor() {
        browser.runtime.onConnect.addListener(this.#handleConnect.bind(this));
    }

    get(method, func) {
        this.#getters[method] = func;
    }

    #handleConnect(port) {
        port.onMessage.addListener(async (data) => {
            try {
                port.postMessage({
                    id:     data.id,
                    result: await this.#getters[data.method](...data.params),
                });
            } catch (err) {
                port.postMessage({
                    id:    data.id,
                    error: {
                        message: err.message,
                        name:    err.name,
                    },
                });
            }
        });
    }
};
