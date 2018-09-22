#!/usr/bin/env node

"use strict";

const fs   = require("fs");
const path = require("path");

/**
 * Copie un fichier ou un répertoire récursivement.
 *
 * @param {String} src  Le fichier ou répertoire qui sera copié.
 * @param {String} dest Le fichier ou répertoire de destination.
 */
const copy = function (src, dest) {
    const stat = fs.lstatSync(src);
    if (stat.isDirectory()) {
        fs.mkdirSync(dest);
        for (const file of fs.readdirSync(src)) {
            copy(path.join(src, file), path.join(dest, file));
        }
    } else {
        fs.createReadStream(src).pipe(fs.createWriteStream(dest));
    }
};

// Copier certains fichiers des bibliothèques externes.
const libs = [
    "@webcomponents/custom-elements/custom-elements.min.js",
    "dialog-polyfill/dialog-polyfill.css",
    "dialog-polyfill/dialog-polyfill.js",
    "jquery/dist/jquery.js",
    "requirejs/require.js",
    "scronpt/scronpt.js",
    "webextension-polyfill/dist/browser-polyfill.js"
];
for (const lib of libs) {
    copy("node_modules/" + lib, "src/lib/" + path.basename(lib));
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

// Proposer des tableaux de bord par défaut.
const widgets = fs.readdirSync("./src/widget/")
                  .filter((w) => ![".gitignore", "README.md"].includes(w));
if (widgets.every((w) => w.startsWith("."))) {
    for (const widget of widgets) {
        copy(path.join("./src/widget/", widget),
             path.join("./src/widget/", widget.substr(1)));
    }
}
