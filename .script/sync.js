import fs from "node:fs/promises";
import path from "node:path";

const copy = async function (src, dest) {
    await fs.mkdir(path.dirname(dest), { recursive: true });
    const stats = await fs.lstat(src);
    if (stats.isDirectory()) {
        await fs.mkdir(dest, { recursive: true });

        for (const filename of await fs.readdir(src)) {
            copy(path.join(src, filename), path.join(dest, filename));
        }
    } else {
        fs.copyFile(src, dest);
    }
};

copy("node_modules/webextension-polyfill/dist/browser-polyfill.js",
     "src/extension/polyfill/lib/browser-polyfill.js");
