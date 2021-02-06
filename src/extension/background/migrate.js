/**
 * @module
 */

browser.storage.sync.get().then(async (current) => {
    await browser.storage.sync.clear();
    // eslint-disable-next-line unicorn/prefer-ternary
    if ("version" in current) {
        await browser.storage.sync.set({
            version:    current.version,
            dashboards: current.dashboards,
        });
    } else {
        await browser.storage.sync.set({
            version:    1,
            dashboards: [],
        });
    }
});
