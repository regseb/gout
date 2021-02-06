/**
 * @module
 */

export const Scraper = class {

    constructor(config) {
        // eslint-disable-next-line no-constructor-return
        return new Proxy({}, {
            get: (target, prop) => (prop in config ? () => config[prop]
                                                   : target[prop]),
        });
    }
};
