/**
 * @module
 * @license MIT
 * @author Sébastien Règne
 */

/**
 * @type {import("metalint/types").Config}
 */
export default {
    patterns: [
        "**",
        // Ignorer les répertoires générés.
        "!/.git/**",
        "!/.stryker/**",
        "!/jsdocs/**",
        "!/node_modules/**",
        "!/src/extension/polyfill/lib/**",
        // Ignorer les fichiers de configuration de Visual Studio Code.
        "!/.vscode/**",
        // Ignorer les fichiers de configuration de IntelliJ IDEA.
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
            patterns: ["/build/*.zip", "/src/extension/*/"],
            linters: "addons-linter",
            overrides: {
                patterns: "/src/extension/chromium/",
                linters: "addons-linter_mv3",
            },
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
                    patterns: "/template/dashboard/**",
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
                    patterns: "/src/extension/popup/**",
                    linters: "purgecss_popup",
                },
            ],
        },
        {
            patterns: "*.md",
            linters: ["prettier", "markdownlint"],
            overrides: {
                patterns: "/CHANGELOG.md",
                linters: "markdownlint_changelog",
            },
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
