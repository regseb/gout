define([], function () {
    "use strict";

    return class {
        constructor(sites) {
            this.sites = sites;
        } // constructor()

        list(size) {
            return Promise.resolve(this.sites.slice(0, size));
        } // list()
    };
});
