#!/usr/bin/env node

"use strict";

const fs = require("fs");

/**
 * La liste des fichiers des bibliothèques à récupérer.
 */
const LIBS = [
    {
        "src":  "dialog-polyfill/dialog-polyfill.css",
        "dest": "dialog-polyfill.css"
    }, {
        "src":  "dialog-polyfill/dialog-polyfill.js",
        "dest": "dialog-polyfill.js"
    }, {
        "src":  "jquery/dist/jquery.js",
        "dest": "jquery.js"
    }, {
        "src":  "requirejs/require.js",
        "dest": "requirejs.js"
    }, {
        "src":  "scronpt/scronpt.js",
        "dest": "scronpt.js"
    }
];

for (const lib of LIBS) {
    fs.createReadStream("node_modules/" + lib.src).pipe(
                                   fs.createWriteStream("src/lib/" + lib.dest));
}
