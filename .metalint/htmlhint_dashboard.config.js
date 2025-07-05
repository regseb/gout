/**
 * @license MIT
 * @author Sébastien Règne
 */

export default {
    // Doctype and Head.
    // Autoriser le CSS directement dans le fichier HTML afin d'avoir un seul
    // fichier pour les dashboards.
    "style-disabled": false,

    // Tags.
    // Ne pas exiger une balise `<h1>` et `<main>`, car ils ont seulement des
    // widgets.
    "h1-require": false,
    "main-require": false,

    // Inline.
    // Autoriser de styliser directement des éléments pour faciliter la mise en
    // page.
    "inline-style-disabled": false,
};
