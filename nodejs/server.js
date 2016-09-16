"use strict";

const CONFIG = {
    "port": 6047
};

const http    = require("http");
const https   = require("https");
const path    = require("path");
const express = require("express");
const app = express();

// Créer le proxy.
app.use("/proxy", function (req, res) {
    let protocol;
    let presize;
    if (/^\/https/.test(req.url)) {
        protocol = https;
        presize = 7;
    } else {
        protocol = http;
        presize = 6;
    }

    // Garder l'adresse du serveur pour du reverse proxy. Puis supprimer
    // l'adresse pour pouvoir transmettre les entêtes.
    const host = req.headers.host;
    delete req.headers.host;
    const options = {
        "host":    req.url.substring(presize, req.url.indexOf("/", presize)),
        "method":  req.method,
        "path":    req.url.substring(req.url.indexOf("/", presize)),
        "headers": req.headers
    };

    const client = protocol.request(options, function (proxy) {
        // Faire du reverse proxy dans le cas d'une redirection.
        if (300 < proxy.statusCode && 400 > proxy.statusCode &&
                proxy.headers.location) {
            proxy.headers.location =
                "http://" + host + "/proxy/http" +
                proxy.headers.location.replace("https:/", "s")
                                      .replace("http:/",  "");
        }
        res.writeHead(proxy.statusCode, proxy.headers);
        proxy.pipe(res);
    }).on("error", function (error) {
        process.stdout.write(error.toString());
        res.writeHead(500, error.message);
        res.end();
    });

    // Rediriger le flux de la requête reçue vers la requête créée.
    req.pipe(client);
});

// Créer le serveur web pour les fichiers statiques.
app.use(express.static(path.join(__dirname, "public")));

app.listen(CONFIG.port);
process.stdout.write("Go http://localhost:" + CONFIG.port);
