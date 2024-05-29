/**
 * @module
 * @license MIT
 * @author Sébastien Règne
 */

// Copier la variable "chrome" (qui contient les APIs pour les WebExtensions)
// dans la variable "browser", car Chromium fournit seulement "chrome".
// https://crbug.com/798169
if (!("browser" in globalThis)) {
    globalThis.browser = chrome;
}
