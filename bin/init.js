#!/usr/bin/env node

"use strict";

const fs   = require("fs");
const path = require("path");

const merge = function (first, second) {
    if ("object" !== typeof first || "object" !== typeof second) {
        return second;
    }
    const third = {};
    for (const key of new Set([...Object.keys(first),
                               ...Object.keys(second)])) {
        // Si la propriété est dans les deux objets.
        if (key in first && key in second) {
            third[key] = merge(first[key], second[key]);
        // Si la propriété est seulement dans le premier objet.
        } else if (key in first) {
            third[key] = first[key];
        // Si la propriété est seulement dans le second objet.
        } else {
            third[key] = second[key];
        }
    }
    return third;
};

const ROOT_DIR = path.join(__dirname, "..");
const SRC_DIR  = path.join(ROOT_DIR, "src");

const config = require(path.join(ROOT_DIR, "config"));
let manifest = require(path.join(SRC_DIR, "manifest-vanilla"));

if ("manifest" in config) {
    manifest = merge(manifest, config.manifest);
}

// Gérer les propriétés pour Firefox.
if (null === config.firefox.id) {
    delete manifest.applications;
} else {
    manifest.applications.gecko.id = "gout-" + config.firefox.id +
                                     "@regseb.github.io";
}

// Gérer les propriétés pour Chrome.
if (null !== config.chrome.key) {
    manifest.key = config.chrome.key;
}

fs.writeFileSync(path.join(SRC_DIR, "manifest.json"),
                 JSON.stringify(manifest, null, 4) + "\n");
