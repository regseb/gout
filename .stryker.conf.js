export default {
    testRunner: "mocha",
    ignorePatterns: [
        "/src/extension/", "/src/module/", "/src/scraper/"
    ],
    ignoreStatic: true,
    mochaOptions: { config: "test/unit/mocharc.json" },
    reporters: ["dots", "clear-text"],
};
