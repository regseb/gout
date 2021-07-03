export default {
    env: {
        browser: true,
    },

    rules: {
        "import/no-unresolved": [2, {
            ignore: ["^https:\\/\\/cdn\\.jsdelivr\\.net\\/"],
        }],
    },
};
