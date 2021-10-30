/**
 * @module
 */

import { PostMessage } from "./postmessage.js";

const postMessage = new PostMessage();

globalThis.fetch = async (resource, init) => {
    // Préfixer éventuellement le lien avec l'URL de la page courante et
    // convertir les URLs en chaine de caractères.
    const href = new URL(resource, location.href).href;
    const result = await postMessage.send("fetch", href, init);
    const response = new Response(result.body, {
        status:     result.status,
        statusText: result.statusText,
        headers:    result.headers,
    });
    Object.defineProperty(response, "url", { value: result.url });
    if (!response.ok) {
        // eslint-disable-next-line no-console
        console.error(`${init?.method ?? "GET"} ${href} ${response.status}`);
    }
    return response;
};
