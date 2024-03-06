/**
 * @module
 * @license MIT
 * @author Sébastien Règne
 */

// Écrire le code minimal d'un module qui ne fait rien, mais qui ne provoque pas
// d'erreur. Il faut exporter par défaut une classe qui hérite de HTMLElement.
// La sera utilisée pour créer un élément personnalisé
// (https://developer.mozilla.org/Web/API/Web_components/Using_custom_elements).
export default class MinimalModule extends HTMLElement {}
