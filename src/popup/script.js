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
        return readdir("gate").then(function (users) {
            return Promise.all(users.filter((u) => !u.startsWith("."))
                                    .map(function (user) {
                return readdir("gate/" + user).then(function (configs) {
                    return [user, configs];
                });
            }));
        }).then(function (results) {
            const configs = {};
            for (let result of results) {
                configs[result[0]] = result[1];
            }
            return configs;
        }).then(function (configs) {
            for (let user in configs) {
                configs[user] = configs[user].filter(function (config) {
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

    const add = function (user, config) {
        const item = document.createElement("div");
        const text = document.createElement("div");
        item.className = "panel-list-item";
        if (null === config) {
            item.className += " disabled";
        } else {
            let href = "index.html?user=" + user;
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
            text.textContent = user;
        } else {
            text.className += " alternative";
            text.textContent = config;
        }
        item.appendChild(text);
        return item;
    }; // add()

    walk().then(function (configs) {
        const list = document.getElementsByClassName("panel-section-list")[0];
        let first = true;
        for (let user in configs) {
            if (first) {
                first = false;
            } else {
                const separator = document.createElement("div");
                separator.className = "panel-section-separator";
                list.appendChild(separator);
            }
            if ("config" === configs[user][0]) {
                configs[user].shift();
                list.appendChild(add(user, "config"));
            } else {
                list.appendChild(add(user, null));
            }
            for (let config of configs[user]) {
                list.appendChild(add(user, config));
            }
        }
    });
})();
