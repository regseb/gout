/**
 * @module
 * @license MIT
 * @author Sébastien Règne
 */

/**
 * Migre éventuellement la configuration.
 */
export default async function migrate() {
    const current = await browser.storage.sync.get();

    // Vider la configuration pour enlever les éventuelles propriétés obsolètes.
    await browser.storage.sync.clear();

    if ("version" in current) {
        await browser.storage.sync.set({
            version: current.version,
            urls: current.urls,
        });
    } else {
        await browser.storage.sync.set({
            version: 1,
            urls: [],
        });
    }
}
