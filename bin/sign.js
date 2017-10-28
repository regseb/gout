#!/usr/bin/env node

"use strict";

const fs = require("fs");
const path = require("path");

const signAddon = require("sign-addon").default;
const archiver = require("archiver");

const ROOT_DIR  = path.join(__dirname, "..");
const BUILD_DIR = path.join(ROOT_DIR, "build");
const DIST_DIR  = path.join(ROOT_DIR, "dist");
const SRC_DIR   = path.join(ROOT_DIR, "src");

const zip = function () {
    const manifest = JSON.parse(fs.readFileSync(path.join(SRC_DIR,
                                                          "manifest.json"),
                                                "utf-8"));
    manifest.version += "pre" + Math.floor(Date.now() / 1000);
    if (!fs.existsSync(BUILD_DIR)) {
        fs.mkdirSync(BUILD_DIR);
    }
    return new Promise(function (resolve, reject) {
        const output = fs.createWriteStream(path.join(BUILD_DIR, "gout.zip"));
        const archive = archiver("zip");
        output.on("close", () => resolve(manifest));
        output.on("error", reject);
        archive.pipe(output);
        const files = fs.readdirSync(SRC_DIR);
        for (const filename of files) {
            const file = path.join(SRC_DIR, filename);
            if ("manifest.json" === filename) {
                archive.append(Buffer.from(JSON.stringify(manifest)),
                               { "name": "manifest.json" });
            } else if (fs.statSync(file).isDirectory()) {
                archive.glob(filename + "/**", { "cwd": SRC_DIR });
            } else {
                archive.file(file, { "name": filename });
            }
        }
        archive.finalize();
    });
};

const sign = function (manifest) {
    const config = JSON.parse(fs.readFileSync(path.join(ROOT_DIR,
                                                        "config.json"),
                                              "utf-8"));
    if (!fs.existsSync(DIST_DIR)) {
        fs.mkdirSync(DIST_DIR);
    }
    const parameters = {
        "xpiPath":     path.join(BUILD_DIR, "gout.zip"),
        "version":     manifest.version,
        "apiKey":      config.firefox.issuer,
        "apiSecret":   config.firefox.secret,
        "id":          manifest.applications.gecko.id,
        "downloadDir": DIST_DIR
    };
    return signAddon(parameters).then(function (result) {
        if (!result.success) {
            throw new Error("Your add-on could not be signed!");
        }
    }).catch(function (err) {
        throw new Error("Signing error:" + err.toString());
    });
};

zip().then(sign).catch((err) => process.stderr.write(err));
