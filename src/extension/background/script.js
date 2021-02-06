import { PostMessageServer } from "./postmessageserver.js";

const server = new PostMessageServer();
server.get("fetch", async (resource, init = {}) => {
    const response = await fetch(resource, init);
    const body = await response.text();
    return {
        headers:    Object.fromEntries(response.headers.entries()),
        status:     response.status,
        statusText: response.statusText,
        url:        response.url,
        body,
    };
});
