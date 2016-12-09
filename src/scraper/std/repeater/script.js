define([], function () {
    "use strict";

    return class {
        constructor(data) {
            this.data = data;
        } // constructor()

        extract() {
            return Promise.resolve(this.data);
        } // extract()
    };
});
