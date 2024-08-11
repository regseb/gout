/**
 * @module
 * @license MIT
 * @author Sébastien Règne
 */

// Copier la variable "chrome" (qui contient les APIs pour les WebExtensions)
// dans la variable "browser", car Chromium fournit seulement "chrome".
// https://issues.chromium.org/40556351
if (!("browser" in globalThis)) {
    globalThis.browser = chrome;
}
