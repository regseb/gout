// Récupérer le document HTML qui contient le template de ce module.
fetch("module/example/hello/index.html").then(function (response) {
    return response.text();
}).then(function (data) {
    // Interpréter le document et extraire le template.
    return new DOMParser().parseFromString(data, "text/html")
                          .querySelector("template");
}).then(function (template) {
    // Enregistrer le nouvel élément personnalisé.
    customElements.define("example-hello", class extends HTMLElement {

        // Ajouter une méthode qui sera appelée avec les fichiers contenus dans
        // le répertoire du widget.
        set files({ "config.json": config, "icon.svg": icon }) {
            this._config = config;
            this._icon   = icon;
        }

        connectedCallback() {
            // Ajouter le template dans le cadre du widget.
            this.appendChild(template.content.cloneNode(true));

            // Définir la couleur de fond du cadre. Si le propriété "color"
            // n'existe pas dans la configuration du widget : utiliser du noir.
            this.style.backgroundColor = this._config.color || "black";

            // Si une image est présente dans le répertoire du widget :
            // l'ajouter dans le cadre. Sinon garder l'image par défaut qui est
            // définit dans le CSS.
            if (undefined !== this._icon) {
                // La variable 'icon' contient le code SVG de l'image ; il faut
                // donc la convertir en base 64 pour l'ajouter en image de fond.
                this.style.backgroundImage = "url(\"data:image/svg+xml;" +
                                             "base64," + btoa(this._icon) +
                                             "\")";
            }

            // Insérer le nom de la personne saluée.
            this.getElementsByTagName("span")[0].textContent = this._config.who;
        }
    });
});
