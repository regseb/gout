export default {
    patterns: [
        "!/.git/",
        "!/jsdocs/",
        "!/node_modules/",
        "!/src/extension/polyfill/lib/",
        "!/src/extension/inject/lib/",
        "!*.swp",
        "**",
    ],
    checkers: [
        {
            patterns: ["/build/*.zip", "/src/extension/"],
            linters: { "addons-linter": null },
        }, {
            patterns: "/src/extension/**/*.js",
            linters: {
                eslint: [
                    "eslint.config.js",
                    "eslint_browser.config.js",
                    "eslint_webext.config.js",
                ],
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
            patterns: ["!/template/dashboard/", "*.html"],
            linters: "htmlhint",
        }, {
            patterns: "/template/dashboard/**/*.html",
            linters: {
                htmlhint: [
                    "htmlhint.config.js",
                    "htmlhint_dashboard.config.js",
                ],
            },
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
            patterns: "/src/extension/popup/*.css",
            linters: { purgecss: "purgecss_popup.config.js" },
        }, {
            patterns: ["!/CHANGELOG.md", "*.md"],
            linters: "markdownlint",
        }, {
            patterns: "*.json",
            linters: { "jsonlint-mod": null },
        }, {
            patterns: "*.yml",
            linters: { "yaml-lint": null },
        },
    ],
};
