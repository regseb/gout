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
        "import/no-unresolved": [
            "error",
            {
                ignore: ["^https:\\/\\/esm\\.sh\\/"],
            },
        ],
    },
};
