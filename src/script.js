require.config({
    "baseUrl": "lib",
    "paths":   {
        "widget":  "../widget",
        "scraper": "../scraper"
    }
});

define(["require", "jquery"], function (require, $) {
    "use strict";

    // Supprimer les variables globales de jQuery.
    $.noConflict(true);

    const readdir = function (url) {
        if ("getPackageDirectoryEntry" in browser.runtime) {
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
        return fetch(url + "/").then(function (response) {
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
            if (file.endsWith(".json")) {
                return response.json();
            }
            return response.text();
        }).then(function (response) {
            return [file, response];
        });
    }; // read()

    const getFiles = function (obj, url) {
        return readdir(url).then(function (urls) {
            return Promise.all(urls.map(read)).then(function (results) {
                const files = {};
                for (let result of results) {
                    files[result[0].substr(url.length + 1)] = result[1];
                }
                return Object.assign(obj, files);
            });
        });
    }; // getFiles()

    const getScrapers = function (scrapers) {
        return Promise.all(scrapers.map(function (scraper) {
            return new Promise(function (resolve) {
                require(["scraper/" + scraper.scraper + "/script"],
                        function (Construct) {
                    resolve(new Construct(scraper.config));
                });
            });
        }));
    }; // scrapers()

    const load = function (key, gate, url) {
        // Si la propriété 'active' n'est pas définie : considérer que la
        // passerelle est active.
        if (false === gate.active) {
            return;
        }

        const id = key.replace(/\//g, "-");
        const clazz = gate.widget.replace(/\//g, "-");

        // Si le widget est utilisé pour la première fois.
        if (!$("body > template." + clazz).length) {
            // Charger la feuille de style.
            $("head").append($("<link />", {
                "rel":  "stylesheet",
                "href": "widget/" + gate.widget + "/style.css"
            }));
            // Passer en synchrone pour attendre que le HTML soit chargé avant
            // de l'utiliser.
            $.ajaxSetup({ "async": false });
            // Charger le HTML.
            $("body").append(
                $("<template>").load("widget/" + gate.widget + "/index.html")
                               .addClass(clazz));
            $.ajaxSetup({ "async": true });
        }

        $("body").append(
            $("<article>").attr("id", id)
                          .addClass(clazz)
                          .css({ "left": gate.coord.x * 1.4 + "em",
                                 "top":  gate.coord.y * 1.4 + "em" })
                          .width(gate.coord.w * 1.4 + "em")
                          .height(gate.coord.h * 1.4 + "em")
                          .html($("body > template." + clazz).html()));

        getFiles(gate.files || {}, url).then(function (files) {
            getScrapers(gate.scrapers || []).then(function (scrapers) {
                require(["widget/" + gate.widget + "/script"],
                                                            function (factory) {
                    factory(id, files, scrapers);
                });
            });
        });
    }; // load()

    const init = function (user, config) {
        // Charger les passerelles contenues dans le fichier de configuration.
        const url = "gate/" + user + "/" + config + ".json";
        $.getJSON(url).then(function (gates) {
            for (let key in gates) {
                load(key, gates[key], "gate/" + user + "/" + key);
            }
            $("template").remove();
        }, (err) => console.log(err));
    }; // init()

    // Récupérer les paramètres transmits dans l'URL.
    const params = new URLSearchParams(window.location.search.slice(1));
    const user   = params.get("user")   || "default";
    const config = params.get("config") || "config";

    init(user, config);
});
