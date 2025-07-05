/**
 * @license MIT
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
        // Plugin eslint-plugin-import.
        // Static analysis.
        "import/no-unresolved": [
            "error",
            {
                // Utiliser des chaines de caractères, car les expressions
                // rationnelles ne sont pas supportées.
                // https://github.com/import-js/eslint-plugin-import/issues/3087
                // Ne pas utiliser le drapeau "v", car la RegExp est créée sans
                // drapeau (dans eslint-plugin-import).
                // eslint-disable-next-line require-unicode-regexp
                ignore: [/^https:\/\/esm\.sh\//.source],
                caseSensitiveStrict: true,
            },
        ],
    },
};
