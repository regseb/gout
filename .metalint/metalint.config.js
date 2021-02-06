export default {
    patterns: [
        "!/.git/",
        "!/coverage/",
        "!/jsdocs/",
        "!/node_modules/",
        "!/src/**/lib/",
        "**",
    ],
    checkers: [
        {
            patterns: "/src/extension/",
            linters: { "addons-linter": null },
            level: "warn",
        }, {
            patterns: "/src/extension/**/*.js",
            linters: {
                eslint: ["eslint.config.js", "eslint_webext.config.js"],
            },
        }, {
            patterns: ["!/src/extension/", "/src/**/*.js"],
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
            patterns: "/src/extension/**/*.html",
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
