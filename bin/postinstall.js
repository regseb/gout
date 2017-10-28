#!/usr/bin/env node

"use strict";

const fs   = require("fs");
const path = require("path");

/**
 * La liste des fichiers des bibliothèques à récupérer.
 */
const LIBS = [
    "dialog-polyfill/dialog-polyfill.css",
    "dialog-polyfill/dialog-polyfill.js",
    "jquery/dist/jquery.js",
    "requirejs/require.js",
    "scronpt/scronpt.js",
    "webcomponents.js/webcomponents-lite.js",
    "webextension-polyfill/dist/browser-polyfill.js"
];

// Copier les biblithèques.
for (const lib of LIBS) {
    fs.createReadStream("node_modules/" + lib).pipe(
                         fs.createWriteStream("src/lib/" + path.basename(lib)));
}

// Initialiser le fichier de configuration s'il n'existe pas.
if (!fs.existsSync("config.json")) {
    const config = {
        "firefox": {
            "id":     null,
            "issuer": null,
            "secret": null
        },
        "chrome": {
            "key": null
        }
    };
    fs.writeFileSync("config.json", JSON.stringify(config, null, 4) + "\n");
}
