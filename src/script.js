require.config({
    "baseUrl": "lib"
});

// Charger toutes les bibliothèques pour pouvoir les charger en synchrone dans
// les modules.
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
            return Object.assign(files, obj);
        });
    };

    const getScrapers = function (scrapers) {
        return Promise.all(scrapers.map(function (scraper) {
            return new Promise(function (resolve) {
                // Remonter dans le répertoire parent pour sortir de lib/.
                require(["../scraper/" + scraper.scraper + "/script"],
                        function (Construct) {
                    resolve(new Construct(scraper.config));
                });
            });
        }));
    };

    const getModule = function (module) {
        return new Promise(function (resolve, reject) {
            const src = "module/" + module + "/script.js";
            // Charger le module une seule fois.
            if (null === document.querySelector("[src=\"" + src + "\"]")) {
                const script = document.createElement("script");
                script.src     = src;
                script.onload  = resolve;
                script.onerror = reject;
                document.head.appendChild(script);
            } else {
                resolve();
            }
        }).then(function () {
            const tag = module.replace(/\//g, "-");
            return customElements.whenDefined(tag).then(() => tag);
        });
    };

    const load = function (article, url) {
        const widget = JSON.parse(article.textContent);
        article.innerHTML = "";

        getModule(widget.module).then(function (tag) {
            getFiles(widget.files || {}, url).then(function (files) {
                getScrapers(widget.scrapers || []).then(function (scrapers) {
                    const element = document.createElement(tag);
                    element.id       = article.id.replace(/\//g, "-");
                    element.files    = files;
                    element.scrapers = scrapers;

                    article.append(element);
                });
            });
        });
    };

    // Récupérer les paramètres transmis dans l'URL.
    const params = new URLSearchParams(location.search);

    const dashboard = params.get("dashboard");
    document.title = dashboard + " - " + document.title;

    let config;
    if (params.has("config")) {
        config = params.get("config");
        document.title = config + " - " + document.title;
    } else {
        config = "config";
    }

    // Charger les widgets contenus dans la configuration du tableau de bord.
    const url = "widget/" + dashboard + "/" + config + ".html";
    fetch(url).then(function (response) {
        return response.text();
    }).then(function (html) {
        document.body.innerHTML = html;
        for (const article of document.querySelectorAll("article")) {
            // Charger seulement les widgets visibles.
            if (window.getComputedStyle(article).display) {
                load(article, "widget/" + dashboard + "/" + article.id);
            }
        }
    }).catch(function (err) {
        console.error(err);
    });
});
