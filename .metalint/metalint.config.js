/**
 * @license MIT
 * @see https://github.com/regseb/metalint
 * @author Sébastien Règne
 */

/**
 * @import { Config } from "metalint/types"
 */

/**
 * @type {Config}
 */
export default {
    patterns: [
        "**",
        // Ignorer les répertoires et les fichiers générés.
        "!/.git/**",
        "!/.tmp/**",
        "!/build/**",
        "!/jsdocs/**",
        "!/node_modules/**",
        "!/src/extension/polyfill/lib/**",
        "!/stryker.log",
        // Ignorer les fichiers de configuration de Visual Studio Code.
        "!/.vscode/**",
        // Ignorer les fichiers de configuration des IDEs de JetBrains :
        // WebStorm, IntelliJ IDEA...
        "!/.idea/**",
        // Ignorer les fichiers temporaires de Vim.
        "!*.swp",
        // Ignorer les autres lockfiles.
        "!/bun.lock",
        "!/pnpm-lock.yaml",
        "!/yarn.lock",
    ],
    checkers: [
        {
            patterns: "*",
            linters: "secretlint",
        },
        {
            patterns: "/src/extension/*/",
            linters: "addons-linter",
        },
        {
            patterns: "*.js",
            linters: [
                "prettier",
                "prettier_javascript",
                "eslint",
                "biomejs__js-api",
            ],
            overrides: [
                {
                    patterns: "/src/extension/**",
                    linters: "eslint_webext",
                },
                {
                    patterns: [
                        "/src/engine/**",
                        "/src/module/**",
                        "/src/scraper/**",
                    ],
                    linters: "eslint_browser",
                },
                {
                    patterns: "/test/**",
                    linters: ["eslint_node", "eslint_test"],
                },
                {
                    patterns: "/.script/**",
                    linters: "eslint_node",
                },
                {
                    patterns: "*.config.js",
                    linters: ["eslint_node", "eslint_config"],
                },
            ],
        },
        {
            patterns: "*.html",
            linters: ["prettier", "htmlhint"],
            overrides: [
                {
                    patterns: "/examples/**",
                    linters: "htmlhint_dashboard",
                },
            ],
        },
        {
            patterns: "*.tpl",
            linters: ["prettier", "prettier_tpl", "htmlhint", "htmlhint_tpl"],
        },
        {
            patterns: "*.css",
            linters: ["prettier", "prettier_css", "stylelint"],
            overrides: [
                {
                    patterns: "/src/module/**",
                    linters: "stylelint_module",
                },
                {
                    patterns: "/src/extension/popup/**",
                    linters: "purgecss_popup",
                },
            ],
        },
        {
            patterns: "*.md",
            linters: ["prettier", "markdownlint"],
            overrides: {
                patterns: "/.github/ISSUE_TEMPLATE/**",
                linters: {
                    wrapper: "markdownlint",
                    options: {
                        // eslint-disable-next-line camelcase
                        "heading-increment": { front_matter_title: "" },
                    },
                },
            },
        },
        {
            patterns: "*.json",
            linters: ["prettier", "prantlf__jsonlint", "biomejs__js-api"],
            overrides: {
                patterns: "/package.json",
                linters: "npm-package-json-lint",
            },
        },
        {
            patterns: "*.yml",
            linters: ["prettier", "yaml-lint"],
        },
        {
            patterns: "*.svg",
            linters: "prettier",
        },
    ],
};
