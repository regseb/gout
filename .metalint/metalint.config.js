/**
 * @license MIT
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
        "!/.stryker/**",
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
        "!/bun.lockb",
        "!/pnpm-lock.yaml",
        "!/yarn.lock",
    ],
    checkers: [
        {
            patterns: "/src/extension/*/",
            linters: "addons-linter",
        },
        {
            patterns: "*.js",
            linters: ["prettier", "prettier_javascript", "eslint"],
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
        },
        {
            patterns: "*.json",
            linters: ["prettier", "prantlf__jsonlint"],
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
