define([], function () {
    "use strict";

    return class {
        extract() {
            const now = new Date();
            return Promise.resolve(now.getTime() -
                                   60000 * now.getTimezoneOffset());
        } // extract()
    };
});
