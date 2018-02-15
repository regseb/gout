#!/usr/bin/env node

"use strict";

const fs   = require("fs");
const path = require("path");

// Lister les fichiers des bibliothèques à récupérer.
const LIBS = [
    "dialog-polyfill/dialog-polyfill.css",
    "dialog-polyfill/dialog-polyfill.js",
    "jquery/dist/jquery.js",
    "requirejs/require.js",
    "scronpt/scronpt.js",
    "@webcomponents/custom-elements/custom-elements.min.js",
    "webextension-polyfill/dist/browser-polyfill.js"
];

// Copier les bibliothèques.
for (const lib of LIBS) {
    fs.createReadStream("node_modules/" + lib)
      .pipe(fs.createWriteStream("src/lib/" + path.basename(lib)));
}

// Initialiser le fichier de configuration s'il n'existe pas.
if (!fs.existsSync("config.json")) {
    const config = {
        "firefox": {
            "id":     null,
            "issuer": null,
            "secret": null
        },
        "chrome":  {
            "key": null
        }
    };
    fs.writeFileSync("config.json", JSON.stringify(config, null, 4) + "\n");
}
