/* @flow */
/* global define */

// Encapsuler le code dans une module AMD pour éviter les collisions des noms
// des variables et pour ne pas créer d'effets de bord.
define(["jquery"], function ($) {

    // Activer le mode strict de JavaScript pour que le navigateur puisse
    // optimiser l'éxécution ; et qu'il remonte plus d'erreurs.
    "use strict";

    /**
     * Initialiser une nouvelle instance du module en changeant la couleur de
     * fond du cadre et en insérant le nom de la personne saluée.
     *
     * @param {!string} id  - l'idenfiant HTML du cadre.
     * @param {!string} url - l'adresse où est stocké le fichier de
     *                        configuration de la passerelle.
     */
    var create = function (id, url) {
        // Récupérer le fichier de configuration de la passerelle. Le fichier
        // doit contenir une objet JSON avec la propriété "who" : une chaine de
        // caractères contenant le nom de la personne à saluer. Et
        // éventuellement la propriété "color" : une chaine de caractères
        // représentant une couleur (avec une valeur hexadécimale, une valeur
        // régulière RGB ou avec des mots-clefs prédéfinis) qui sera utilisée
        // comme couleur de fond du cadre. Si la propriété "color" n'est pas
        // renseignée : le noir est utilisé par défaut.
        $.getJSON(url + "/config.json").then(function (args) {
            // Récupérer le cadre dans le DOM grâce son identifiant. Le cadre
            // est ajouté dans la page par l'application. L'application définit
            // les dimensions du cadre ; et lui affecte une classe CSS ayant
            // pour nom l'adresse du module, mais avec les barres obliques
            // remplacées par des tirets hauts. Pour ce module, sa classe est :
            // "example-hello".
            var $root = $("#" + id);

            // Définir la couleur de fond du cadre. Si le propriété "color"
            // n'existe pas : utiliser du noir.
            $root.css("background-color", args.color || "black");

            // Insérer le nom de la personne saluée.
            $("span", $root).text(args.who);
        });
    }; // create()

    // Retourner la fonction de création pour que l'application puisse créer
    // plusieurs instances de ce module.
    return create;

});
