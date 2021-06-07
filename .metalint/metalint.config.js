export default {
    patterns: [
        "!/.git/",
        "!/build/",
        "!/jsdocs/",
        "!/node_modules/",
        "!/src/extension/polyfill/lib/",
        "**",
    ],
    checkers: [
        {
            patterns: "/src/extension/",
            linters: { "addons-linter": null },
        }, {
            patterns: "/src/extension/**/*.js",
            linters: {
                eslint: ["eslint.config.js", "eslint_webext.config.js"],
            },
        }, {
            patterns: [
                "/src/engine/**/*.js",
                "/src/module/**/*.js",
                "/src/scraper/**/*.js",
            ],
            linters: {
                eslint: ["eslint.config.js", "eslint_browser.config.js"],
            },
        }, {
            patterns: "/.script/**/*.js",
            linters: {
                eslint: ["eslint.config.js", "eslint_node.config.js"],
            },
        }, {
            patterns: "/.metalint/**/*.js",
            linters: {
                eslint: ["eslint.config.js", "eslint_config.config.js"],
            },
        }, {
            patterns: "*.html",
            linters: "htmlhint",
        }, {
            patterns: "*.tpl",
            linters: {
                htmlhint: [
                    "htmlhint.config.js",
                    "htmlhint_tpl.config.js",
                ],
            },
        }, {
            patterns: "*.css",
            linters: "stylelint",
        }, {
            patterns: ["!/CHANGELOG.md", "*.md"],
            linters: "markdownlint",
        }, {
            patterns: "*.json",
            linters: { "jsonlint-mod": null },
        }, {
            patterns: "*.yml",
            linters: { "yaml-lint": null },
        }, {
            patterns: "/package.json",
            linters: "david",
        },
    ],
};
