/**
 * @module
 * @license MIT
 * @author Sébastien Règne
 */

/**
 * @type {import("@stryker-mutator/api/core").PartialStrykerOptions}
 */
export default {
    disableTypeChecks: false,
    incremental: true,
    incrementalFile: ".stryker/incremental.json",
    ignoreStatic: true,
    mochaOptions: { config: "test/unit/mocharc.json" },
    mutate: ["src/**/*.js", "!src/extension/**", "!src/module/**"],
    reporters: ["dots", "clear-text"],
    tempDirName: ".stryker/tmp/",
    testRunner: "mocha",
};
