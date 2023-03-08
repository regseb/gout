/**
 * @module
 * @license MIT
 * @author Sébastien Règne
 */

export default {
    patterns: [
        "!/CHANGELOG.md",
        "!/.git/",
        "!/jsdocs/",
        "!/node_modules/",
        "!/src/extension/polyfill/lib/",
        "!/.stryker/",
        "!*.swp",
        "**",
    ],
    checkers: [
        {
            patterns: ["*.json", "*.md", "*.svg", "*.yml"],
            linters: "prettier",
        },
        {
            patterns: ["*.js", "*.ts"],
            linters: {
                prettier: ["prettier.config.js", { tabWidth: 4 }],
            },
        },
        {
            patterns: ["/build/**/*.zip", "/src/extension/"],
            linters: "addons-linter",
        },
        {
            patterns: "/src/extension/**/*.js",
            linters: {
                eslint: ["eslint.config.js", "eslint_webext.config.js"],
            },
        },
        {
            patterns: [
                "/src/engine/**/*.js",
                "/src/module/**/*.js",
                "/src/scraper/**/*.js",
            ],
            linters: {
                eslint: ["eslint.config.js", "eslint_browser.config.js"],
            },
        },
        {
            patterns: "/test/**/*.js",
            linters: {
                eslint: [
                    "eslint.config.js",
                    "eslint_node.config.js",
                    "eslint_test.config.js",
                ],
            },
        },
        {
            patterns: "/.script/**/*.js",
            linters: {
                eslint: ["eslint.config.js", "eslint_node.config.js"],
            },
        },
        {
            patterns: "*.config.js",
            linters: {
                eslint: ["eslint.config.js", "eslint_config.config.js"],
            },
        },
        {
            patterns: ["!/template/dashboard/", "*.html"],
            linters: "htmlhint",
        },
        {
            patterns: "/template/dashboard/**/*.html",
            linters: {
                htmlhint: [
                    "htmlhint.config.js",
                    "htmlhint_dashboard.config.js",
                ],
            },
        },
        {
            patterns: "*.tpl",
            linters: {
                htmlhint: ["htmlhint.config.js", "htmlhint_tpl.config.js"],
            },
        },
        {
            patterns: "*.css",
            linters: "stylelint",
        },
        {
            patterns: "/src/extension/popup/*.css",
            linters: { purgecss: "purgecss_popup.config.js" },
        },
        {
            patterns: "*.md",
            linters: "markdownlint",
        },
        {
            patterns: "*.json",
            linters: { "jsonlint-mod": null },
        },
        {
            patterns: "/package.json",
            linters: "npm-package-json-lint",
        },
        {
            patterns: "*.yml",
            linters: { "yaml-lint": null },
        },
    ],
};
