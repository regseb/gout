/**
 * @license MIT
 * @see https://github.com/un-ts/eslint-plugin-import-x#rules
 * @author Sébastien Règne
 */

import globals from "globals";

/**
 * @import { Linter } from "eslint"
 */

/**
 * @type {Linter.Config}
 */
export default {
    languageOptions: {
        globals: globals.browser,
    },

    rules: {
        // Plugin eslint-plugin-import-x.
        // Static analysis.
        "importX/no-unresolved": [
            "error",
            {
                // Utiliser des chaines de caractères, car les expressions
                // rationnelles ne sont pas supportées.
                // Ne pas utiliser le drapeau "v", car la RegExp est créée sans
                // drapeau (dans eslint-plugin-import-x).
                // eslint-disable-next-line require-unicode-regexp
                ignore: [/^https:\/\/esm\.sh\//.source],
                caseSensitiveStrict: true,
            },
        ],
    },
};
