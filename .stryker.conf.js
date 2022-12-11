export default {
    incremental: true,
    incrementalFile: ".stryker/stryker-incremental.json",
    ignorePatterns: [
        "/src/extension/", "/src/module/", "/src/scraper/",
    ],
    ignoreStatic: true,
    mochaOptions: { config: "test/unit/mocharc.json" },
    reporters: ["dots", "clear-text"],
    tempDirName: ".stryker/tmp/",
    testRunner: "mocha",
};
