define(["jquery"], function ($) {
    "use strict";

    return class {
        constructor({ url, jobs }) {
            this.host    = url;
            this.filters = jobs;
        } // constructor()

        extract(size) {
            const that = this;
            const url = that.host +
                        "/api/json?tree=jobs[name,url,displayName," +
                                            "lastBuild[number,result]," +
                                            "modules[name,url,displayName," +
                                                    "lastBuild[number," +
                                                              "result]]]";
            return $.get(url).then(function (data) {
                const items = [];
                for (let job of data.jobs) {
                    // S'il y a des filtres et que le nom du job ne correspond à
                    // aucune filtre : ignorer ce job.
                    if (0 !== Object.keys(that.filters).length &&
                            !(job.name in that.filters)) {
                        continue;
                    }

                    if (null === that.filters[job.name]) {
                        if (null === job.lastBuild ||
                                "FAILURE" !== job.lastBuild.result &&
                                "ABORTED" !== job.lastBuild.result) {
                            continue;
                        }
                        items.push({
                            "title": job.displayName,
                            "desc":  job.lastBuild.result,
                            "link":  job.url,
                            "guid":  job.lastBuild.number
                        });
                        if (size === items.length) {
                            break;
                        }
                    } else {
                        for (let module of job.modules) {
                            if (0 !== that.filters[job.name].length &&
                                    !that.filters[job.name].includes(
                                                                 module.name)) {
                                continue;
                            }
                            if (null === module.lastBuild ||
                                    "FAILURE" !== module.lastBuild.result &&
                                    "ABORTED" !== module.lastBuild.result) {
                                continue;
                            }
                            items.push({
                                "title": module.displayName + " (" +
                                         job.displayName + ")",
                                "desc":  module.lastBuild.result,
                                "link":  module.url,
                                "guid":  module.lastBuild.number
                            });
                            if (size === items.length) {
                                break;
                            }
                        }
                    }
                }
                return items;
            });
        } // extract()
    };
});
