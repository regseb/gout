import { PostMessage } from "./postmessage.js";

const postMessage = new PostMessage();

// eslint-disable-next-line func-names
globalThis.fetch = async function fetch(resource, init) {
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
    return response;
};
