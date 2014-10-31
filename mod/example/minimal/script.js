/* global app */

// L'application a seulement besoin d'une fonction qui crée une nouvelle
// passerelle. Cette fonction doit-être placée dans l'objet "mod" de
// l'application avec comme clé : l'adresse du module.
// La fonction fournit ne fait rien, car ce module ne fait rien.
app.mod["example/minimal"] = function() {};
