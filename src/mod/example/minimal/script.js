// L'application a seulement besoin d'un module AMD qui retourne une fonction.
// Cette fonction sera appelée pour créer une nouvelle passerelle. La fonction
// fournit, dans cette exemple, ne fait rien ; car ce module ne fait rien.
define(function () {
    "use strict";

    return function () {
        // Ne rien faire.
    };
});
