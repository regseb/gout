// Encapsuler le code dans une module AMD pour éviter les collisions des noms
// des variables et pour ne pas créer d'effets de bord.
define(["jquery"], function ($) {
    // Activer le mode strict de JavaScript pour que le navigateur puisse
    // optimiser l'éxécution ; et qu'il remonte plus d'erreurs.
    "use strict";

    /**
     * Initialiser une nouvelle instance du widget en changeant la couleur de
     * fond du cadre et en insérant le nom de la personne saluée.
     *
     * @param {!string} id       - l'idenfiant HTML du cadre.
     * @param {!string} url      - l'adresse du répertoire où est stocké l'image
     *                             de fond.
     * @param {!Object} config   - la configuration du widget.
     */
    const create = function (id, url, config) {
        // Le paramètre config doit contenir un objet JSON avec la propriété
        // "who" : une chaine de caractères contenant le nom de la personne à
        // saluer. Et éventuellement la propriété "color" : une chaine de
        // caractères représentant une couleur (avec une valeur hexadécimale,
        // une valeur régulière RGB ou avec des mots-clefs prédéfinis) qui sera
        // utilisée comme couleur de fond du cadre. Si la propriété "color"
        // n'est pas renseignée : le noir est utilisé par défaut.

        // Récupérer le cadre dans le DOM grâce son identifiant. Le cadre est
        // ajouté dans la page par l'application. L'application définit les
        // dimensions du cadre ; et lui affecte une classe CSS ayant pour nom
        // l'adresse du widget, mais avec les barres obliques remplacées par des
        // tirets hauts. Pour ce widget, sa classe est : "example-hello".
        const $root = $("#" + id);

        // Définir la couleur de fond du cadre. Si le propriété "color" n'existe
        // pas : utiliser du noir.
        $root.css({
            "background-color": config.color || "black",
            "background-image": "url(\"" + url + "/icon.svg\")"
        });

        // Insérer le nom de la personne saluée.
        $("span", $root).text(config.who);
    }; // create()

    // Retourner la fonction de création pour que l'application puisse créer
    // plusieurs instances de ce widget.
    return create;
});
