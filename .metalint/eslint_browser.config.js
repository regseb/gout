/**
 * @module
 * @license MIT
 * @author Sébastien Règne
 */

export default {
    env: {
        browser: true,
    },

    rules: {
        // Plugin eslint-plugin-import.
        // Static analysis.
        "import/no-unresolved": [
            "error",
            {
                ignore: ["^https://esm\\.sh/"],
                caseSensitiveStrict: true,
            },
        ],
    },
};
