(function () {
    "use strict";

    const readdir = function (url) {
        return new Promise(function (resolve, reject) {
            browser.runtime.getPackageDirectoryEntry(function (root) {
                root.getDirectory(url, {}, function (dir) {
                    dir.createReader().readEntries(function (entries) {
                        resolve(entries.map((e) => e.name));
                    });
                }, function (err) {
                    reject(err);
                });
            });
        });
    }; // readdir()

    const walk = function () {
        return readdir("gate").then(function (dashboards) {
            return Promise.all(dashboards.filter((d) => !d.startsWith("."))
                                         .map(function (dashboard) {
                return readdir("gate/" + dashboard).then(function (configs) {
                    return [dashboard, configs];
                });
            }));
        }).then(function (results) {
            const configs = {};
            for (const result of results) {
                configs[result[0]] = result[1];
            }
            return configs;
        }).then(function (configs) {
            for (const dashboard in configs) {
                configs[dashboard] = configs[dashboard].filter(
                                                             function (config) {
                    return !config.startsWith(".") && config.endsWith(".json");
                }).map(function (config) {
                    return config.slice(0, -5);
                }).sort(function (config1, config2) {
                    return "config" === config1 ? -1
                                                : "config" === config2 ? 1
                                                                       : 0;
                });
            }
            return configs;
        });
    }; // walk()

    const add = function (dashboard, config) {
        const item = document.createElement("div");
        const text = document.createElement("div");
        item.className = "panel-list-item";
        if (null === config) {
            item.className += " disabled";
        } else {
            let href = "index.html?dashboard=" + dashboard;
            if ("config" !== config) {
                href += "&config=" + config;
            }
            text.setAttribute("data-href", href);
            text.onclick = function (event) {
                browser.tabs.create({
                    "index":  0,
                    "url":    browser.extension.getURL(
                                        event.target.getAttribute("data-href")),
                    "pinned": true
                });
                window.close();
            };
        }
        text.className = "text";
        if (null === config || "config" === config) {
            text.className += " primary";
            text.textContent = dashboard;
        } else {
            text.className += " alternative";
            text.textContent = config;
        }
        item.appendChild(text);
        return item;
    }; // add()

    walk().then(function (configs) {
        const dashboards = Object.keys(configs);
        // S'il existe un seul tableau de bord : afficher directement celui-ci.
        if (1 === dashboards.length && 1 === configs[dashboards[0]].length) {
            let href = "index.html?dashboard=" + dashboards[0];
            if ("config" !== configs[dashboards[0]][0]) {
                href += "&config=" + configs[dashboards[0]][0];
            }
            browser.tabs.create({
                "index":  0,
                "url":    browser.extension.getURL(href),
                "pinned": true
            });
            window.close();
        }

        const list = document.getElementsByClassName("panel-section-list")[0];
        let first = true;
        for (const dashboard of dashboards) {
            if (first) {
                first = false;
            } else {
                const separator = document.createElement("div");
                separator.className = "panel-section-separator";
                list.appendChild(separator);
            }
            if ("config" === configs[dashboard][0]) {
                configs[dashboard].shift();
                list.appendChild(add(dashboard, "config"));
            } else {
                list.appendChild(add(dashboard, null));
            }
            for (const config of configs[dashboard]) {
                list.appendChild(add(dashboard, config));
            }
        }
    });
})();
