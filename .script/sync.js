import { createWriteStream } from "node:fs";
import fs from "node:fs/promises";
import https from "node:https";
import path from "node:path";
import stream from "node:stream/promises";

const copy = async function (src, dest) {
    await fs.mkdir(path.dirname(dest), { recursive: true });
    const stats = await fs.lstat(src);
    if (stats.isDirectory()) {
        await fs.mkdir(dest, { recursive: true });

        for (const filename of await fs.readdir(src)) {
            await copy(path.join(src, filename), path.join(dest, filename));
        }
    } else {
        // Supprimer le fichier de destination s'il existe car la fonction
        // link() échoue si la destination existe déjà.
        // https://github.com/nodejs/node/issues/40521
        await fs.rm(dest, { force: true });
        await fs.link(src, dest);
    }
};

const download = async function (url, dest) {
    await fs.mkdir(path.dirname(dest), { recursive: true });
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            resolve(stream.pipeline(res, createWriteStream(dest)));
        }).on("error", reject);
    });
};

await copy("node_modules/webextension-polyfill/dist/browser-polyfill.js",
           "src/extension/polyfill/lib/browser-polyfill.js");

await copy("node_modules/typeson/dist/typeson-esm.js",
           "src/extension/inject/lib/typeson-esm.js");

await download(
    "https://bundle.fregante.com/api/bundle" +
                                       "?pkg=content-scripts-register-polyfill",
    "src/extension/polyfill/lib/content-scripts-register-polyfill.js",
 );
