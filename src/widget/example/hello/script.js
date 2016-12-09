// Encapsuler le code dans une module AMD pour éviter les collisions des noms
// des variables et pour ne pas créer d'effets de bord. Et récupérer la
// bibliothèque jQuery en dépendences.
define(["jquery"], function ($) {
    // Activer le mode strict de JavaScript pour que le navigateur puisse
    // optimiser l'éxécution ; et qu'il remonte plus d'erreurs.
    "use strict";

    /**
     * Initialiser une nouvelle instance du widget en changeant la couleur de
     * fond du cadre et en insérant le nom de la personne saluée.
     *
     * @param {!string} id           - l'idenfiant HTML du cadre.
     * @param {!Object} files        - la liste des fichiers présents dans le
     *                                 répertoire de la passerelle ou
     *                                 directement dans la propriété "files".
     * @param {!Object} files.config - la configuration du widget.
     * @param {!string} files.icon   - l'image (au format SVG) qui sera affichée
     *                                 dans le cadre.
     */
    const create = function (id, { "config.json": config, "icon.svg": icon }) {
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

        // Adapter le CSS du cadre en fonction de la confiration du widget.
        $root.css({
            // Définir la couleur de fond du cadre. Si le propriété "color"
            // n'existe pas : utiliser du noir.
            "background-color": config.color || "black",
            // Ajouter l'image dans le cadre. La variable 'icon' contient le
            // code SVG de l'image ; il faut donc la convertir en base 64 pour
            // l'ajouter en image de fond.
            "background-image": "url(\"data:image/svg+xml;base64," +
                                     btoa(icon) + "\")"
        });

        // Insérer le nom de la personne saluée.
        $("span", $root).text(config.who);
    }; // create()

    // Retourner la fonction de création pour que l'application puisse créer des
    // instances de ce widget.
    return create;
});
