#!/usr/bin/env node

"use strict";

const fs   = require("fs");
const path = require("path");

const ROOT_DIR = path.join(__dirname, "..");
const SRC_DIR  = path.join(ROOT_DIR, "src");

const config = require(path.join(ROOT_DIR, "config"));
const manifest = require(path.join(SRC_DIR, "manifest-base"));

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
