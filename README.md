# Gout

> Agrégateur d'Internet (flux RSS et tout le reste).

## Description

Gout est une **extension** Firefox / Chrome pour récupérer des informations sur
Internet (flux RSS / Atom, résultats d'API, parsing de page Web) et les
afficher sur une seule page. Le paramétrage des données récupérées se fait avec
des objets
[JSON](http://www.json.org/json-fr.html "JavaScript Object Notation"). Il est
aussi possible de développer des widgets et des scrapers pour agréger de
nouveaux sites Internet.

## Démonstration

Une version de démonstration non-configurable est disponible sur :

- **[AMO](https://addons.mozilla.org/fr/firefox/)** (addons.mozilla.org) ;
- **[Chrome Web
  Store](https://chrome.google.com/webstore/category/extensions)**.

## Configuration

Cette procédure décrit la création de l'extension. Vous aurez besoin de
[`git`](https://git-scm.com/) et [Node.js](https://nodejs.org/fr/) (`npm`).
Commencez par cloner le projet, puis installez les dépendances :

```shell
git clone https://github.com/regseb/gout.git
cd gout
npm install
```

Vous pouvez ensuite ajouter des
**[widgets](https://github.com/search?q=topic%3Agout+widget)** et des
**[scrapers](https://github.com/search?q=topic%3Agout+scraper)** externes ; puis
vous inspirer des **[gates](https://github.com/search?q=topic%3Agout+gate)** de
la communauté.

### Firefox

Renseignez la propriété `firefox.id` (du fichier *config.json*) avec votre nom /
pseudo. Exécutez la commande `npm run gout:init`.

Lancez Firefox et rendez vous dans le *gestionnaire de modules complémentaires*.
Ouvrez l'outil pour *déboguer des modules*. *Chargez un module temporaire* en
ouvrant le fichier `src/manifest.json`.

Quand vous êtes satisfait de vos tableaux de bord, il vous reste à signer votre
extension pour la déployer. Créez un compte sur
[AMO](https://addons.mozilla.org/fr/firefox/) et générez une clé pour l'API.
Copiez l'*émetteur du JWT* et le *secret JWT* respectivement dans les propriétés
`firefox.issuer` et `firefox.secret` du fichier *config.json*. Puis exécutez
`npm run gout:sign` pour signer l'extension.

Ouvrez le fichier *XPI* généré avec Firefox pour l'installer définitivement.

### Chrome

Exécutez la commande `npm run gout:init` pour initialiser l'extension. Ouvrez
Chrome et allez dans la page paramétrage des *extensions*. Activez le *Mode
développeur*, puis *chargez l'extension non empaquetée* en ouvrant le répertoire
`src`.

## Licence

L'extension est publiée sous la [licence publique de l’Union européenne - EUPL
v1.2](https://joinup.ec.europa.eu/page/eupl-text-11-12).
