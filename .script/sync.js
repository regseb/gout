/**
 * @module
 */

import { createWriteStream } from "node:fs";
import fs from "node:fs/promises";
import https from "node:https";
import path from "node:path";
import stream from "node:stream/promises";

const download = async function (url, dest) {
    await fs.mkdir(path.dirname(dest), { recursive: true });
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            resolve(stream.pipeline(res, createWriteStream(dest)));
        }).on("error", reject);
    });
};

await fs.cp("node_modules/webextension-polyfill/dist/browser-polyfill.js",
            "src/extension/polyfill/lib/browser-polyfill.js");

await fs.cp("node_modules/typeson/dist/typeson.esm.js",
            "src/extension/inject/lib/typeson.esm.js");

// Télécharger la prothèse car le paquet npm ne contient pas de module autonome.
// https://github.com/fregante/content-scripts-register-polyfill/issues/34
await download(
    "https://bundle.fregante.com/api/bundle" +
                                       "?pkg=content-scripts-register-polyfill",
    "src/extension/polyfill/lib/content-scripts-register-polyfill.js",
);
