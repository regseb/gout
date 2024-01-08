/**
 * @module
 * @license MIT
 * @author Sébastien Règne
 */

export default class RepeaterScraper {
    constructor(options) {
        // eslint-disable-next-line no-constructor-return
        return new Proxy(
            {},
            {
                get: (target, prop) =>
                    prop in options ? () => options[prop] : target[prop],
            },
        );
    }
}
