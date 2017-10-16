define([], function () {
    "use strict";

    return class {
        constructor(data) {
            this.data = data;
        }

        extract() {
            return Promise.resolve(this.data);
        }
    };
});
