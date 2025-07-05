/**
 * @license MIT
 * @author Sébastien Règne
 */

/**
 * @import { Config } from "stylelint"
 */

/**
 * @type {Config}
 */
export default {
    rules: {
        // AVOID ERRORS.
        // Unknown.
        // Désactiver cette règle, car le JavaScript des modules crée des
        // variables CSS (à partir des valeurs dans les options).
        "no-unknown-custom-properties": false,
    },
};
