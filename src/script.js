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
    };

    const read = function (file) {
        return fetch(file).then(function (response) {
            return file.endsWith(".json") ? response.json()
                                          : response.text();
        }).then(function (response) {
            return [file, response];
        });
    };

    const getFiles = function (obj, url) {
        return readdir(url).then(function (urls) {
            return Promise.all(urls.map(read));
        }).then(function (results) {
            const files = {};
            for (const result of results) {
                files[result[0].substr(url.length + 1)] = result[1];
            }
            return Object.assign(obj, files);
        });
    };

    const getScrapers = function (scrapers) {
        return Promise.all(scrapers.map(function (scraper) {
            return new Promise(function (resolve) {
                require(["../scraper/" + scraper.scraper + "/script"],
                        function (Construct) {
                    resolve(new Construct(scraper.config));
                });
            });
        }));
    };

    const getGate = function (widget) {
        const tag = widget.replace(/\//g, "-");
        // Si le widget a déjà été chargé.
        if (HTMLElement !== document.createElement(tag).constructor) {
            return Promise.resolve(tag);
        }

        return new Promise(function (resolve, reject) {
            const link = document.createElement("link");
            link.rel = "import";
            link.href = "widget/" + widget + "/index.html";

            link.onload = function () {
                resolve(tag);
            };
            link.onerror = reject;

            document.head.appendChild(link);
        });
    };

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
    };

    // Récupérer les paramètres transmits dans l'URL.
    const params = new URLSearchParams(window.location.search.slice(1));

    const dashboard = params.get("dashboard");
    document.title = dashboard + " - " + document.title;

    let config;
    if (params.has("config")) {
        config = params.get("config");
        document.title = config + " - " + document.title;
    } else {
        config = "config";
    }

    // Charger les passerelles contenues dans la configuration du tableau de
    // bord.
    const url = "gate/" + dashboard + "/" + config + ".json";
    fetch(url).then(function (response) {
        return response.json();
    }).then(function (gates) {
        for (const key in gates) {
            load(key, gates[key], "gate/" + dashboard + "/" + key);
        }
    });
});
