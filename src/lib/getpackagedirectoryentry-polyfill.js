"use strict";

// Ajouter une prothèse pour la fonction
// browser.runtime.getPackageDirectoryEntry() et ses sous-ensembles
// (DirectoryEntry, DirectoryReader) tant que ces API n'ont pas été intégrées
// dans Firefox (https://bugzilla.mozilla.org/show_bug.cgi?id=1246236).

if (undefined === browser.runtime.getPackageDirectoryEntry) {
    const DirectoryReader = class {
        constructor(entries) {
            this.entries = entries;
        }

        readEntries(callback) {
            callback(this.entries);
        }
    };

    const DirectoryEntry = class {
        constructor(entries) {
            this.entries = entries;
        }

        createReader() {
            return new DirectoryReader(this.entries);
        }

        getDirectory(url, _, successCallback, errorCallback) {
            fetch("/" + url + "/").then(function (response) {
                return response.text();
            }).then(function (response) {
                return response.split("\n").filter(function (line) {
                    return line.startsWith("201: ");
                }).map(function (line) {
                    const name = decodeURIComponent(
                                       line.substring(5, line.indexOf(" ", 5)));
                    return { "name": name.endsWith("/") ? name.slice(0, -1)
                                                        : name };
                });
            }).then(function (entries) {
                return new DirectoryEntry(entries);
            }).catch(function (error) {
                if ("NetworkError when attempting to fetch resource." ===
                                                                error.message) {
                    throw { "name": "NotFoundError" };
                }
                throw { "name": error.message };
            }).then(successCallback, errorCallback);
        }
    };

    browser.runtime.getPackageDirectoryEntry = function (callback) {
        callback(new DirectoryEntry(null));
    };
}
