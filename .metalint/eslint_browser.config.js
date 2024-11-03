/**
 * @license MIT
 * @author Sébastien Règne
 */

/**
 * @type {import("eslint").Linter.Config}
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
                ignore: [String.raw`^https://esm\.sh/`],
                caseSensitiveStrict: true,
            },
        ],
    },
};
