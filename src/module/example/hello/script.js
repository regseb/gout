// Encapsuler le code dans une IIFE pour éviter les collisions des noms des
// variables et pour ne pas créer d'effets de bord.
(function () {
    // Activer le mode strict de JavaScript pour que le navigateur puisse
    // optimiser l'exécution ; et qu'il remonte plus d'erreurs.
    "use strict";

    // Récupérer le document qui contient le template de ce module.
    const owner = (document["_currentScript"] || document.currentScript)
                                                                 .ownerDocument;

    // Enregistrer le nouvel élément personnalisé.
    customElements.define("example-hello", class extends HTMLElement {

        // Ajouter une méthode qui sera appelée avec les fichiers contenus dans
        // le répertoire du widget.
        set files({ "config.json": config, "icon.svg": icon }) {
            // Définir la couleur de fond du cadre. Si le propriété "color"
            // n'existe pas dans la configuration du widget : utiliser du noir.
            this.style.backgroundColor = config.color || "black";

            // Si une image est présente dans le répertoire du widget :
            // l'ajouter dans le cadre. Sinon garder l'image par défaut qui est
            // définit dans le CSS.
            if (undefined !== icon) {
                // La variable 'icon' contient le code SVG de l'image ; il faut
                // donc la convertir en base 64 pour l'ajouter en image de fond.
                this.style.backgroundImage = "url(\"data:image/svg+xml;" +
                                             "base64," + btoa(icon) + "\")";
            }

            // Insérer le nom de la personne saluée.
            this.getElementsByTagName("span")[0].textContent = config.who;
        }

        constructor() {
            super();
            const shadowRoot = this.attachShadow({ "mode": "open" });
            const tmpl = owner.querySelector("template");
            shadowRoot.appendChild(tmpl.content.cloneNode(true));
        }
    });
})();
