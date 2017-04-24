require.config({
    "baseUrl": "lib"
});

// Charger toutes les bibliothèques pour pouvoir les charger en synchrone dans
// les widgets.
define(["require", "jquery", "scronpt"], function (require, $) {
    "use strict";

    // Supprimer les variables globales de jQuery.
    $.noConflict(true);

    const readdir = function (url) {
        if (undefined !== browser.runtime.getPackageDirectoryEntry) {
            return new Promise(function (resolve, reject) {
                browser.runtime.getPackageDirectoryEntry(function (root) {
                    root.getDirectory(url, {}, function (dir) {
                        dir.createReader().readEntries(function (entries) {
                            resolve(entries.map((entry) => url + "/" +
                                                           entry.name));
                        });
                    }, function (err) {
                        if ("NotFoundError" === err.name) {
                            resolve([]);
                        } else {
                            reject(err);
                        }
                    });
                });
            });
        }
        return fetch("/" + url + "/").then(function (response) {
            return response.text();
        }).then(function (response) {
            return response.split("\n").filter(function (line) {
                return line.startsWith("201: ");
            }).map(function (line) {
                return url + "/" + line.substring(5, line.indexOf(" ", 5));
            });
        }).catch(function (_err) {
            return [];
        });
    }; // readdir()

    const read = function (file) {
        return fetch(file).then(function (response) {
            return file.endsWith(".json") ? response.json()
                                          : response.text();
        }).then(function (response) {
            return [file, response];
        });
    }; // read()

    const getFiles = function (obj, url) {
        return readdir(url).then(function (urls) {
            return Promise.all(urls.map(read));
        }).then(function (results) {
            const files = {};
            for (let result of results) {
                files[result[0].substr(url.length + 1)] = result[1];
            }
            return Object.assign(obj, files);
        });
    }; // getFiles()

    const getScrapers = function (scrapers) {
        return Promise.all(scrapers.map(function (scraper) {
            return new Promise(function (resolve) {
                require(["../scraper/" + scraper.scraper + "/script"],
                        function (Construct) {
                    resolve(new Construct(scraper.config));
                });
            });
        }));
    }; // scrapers()

    const getGate = function (widget) {
        const tag = widget.replace(/\//g, "-");
        // Si le widget a déjà été chargé.
        if (HTMLElement !== document.createElement(tag).constructor) {
            return Promise.resolve(tag);
        }

        const link = document.createElement("link");
        link.rel = "import";
        link.href = "widget/" + widget + "/index.html";

        const promise = new Promise(function (resolve, reject) {
            link.onload = function () {
                resolve(tag);
            };
            link.onerror = reject;
        });

        document.head.appendChild(link);

        return promise;
    }; // getGate()

    const load = function (key, gate, url) {
        // Si la propriété 'active' n'est pas définie : considérer que la
        // passerelle est active.
        if (false === gate.active) {
            return;
        }

        getGate(gate.widget).then(function (tag) {
            getFiles(gate.files || {}, url).then(function (files) {
                getScrapers(gate.scrapers || []).then(function (scrapers) {
                    const elem = document.createElement(tag);
                    elem.id           = key.replace(/\//g, "-");
                    elem.style.left   = gate.coord.x * 14 + "px";
                    elem.style.top    = gate.coord.y * 14 + "px";
                    elem.style.width  = gate.coord.w * 14 + "px";
                    elem.style.height = gate.coord.h * 14 + "px";
                    if ("setFiles" in elem) {
                        elem.setFiles(files);
                    }
                    if ("setScrapers" in elem) {
                        elem.setScrapers(scrapers);
                    }
                    document.body.appendChild(elem);
                });
            });
        });
    }; // load()

    // Récupérer les paramètres transmits dans l'URL.
    const params = new URLSearchParams(window.location.search.slice(1));
    const user   = params.get("user");
    const config = params.has("config") ? params.get("config")
                                        : "config";

    // Charger les passerelles contenues dans le fichier de configuration.
    const url = "gate/" + user + "/" + config + ".json";
    fetch(url).then(function (response) {
        return response.json();
    }).then(function (gates) {
        for (let key in gates) {
            load(key, gates[key], "gate/" + user + "/" + key);
        }
    }).catch((err) => console.log(err));
});
