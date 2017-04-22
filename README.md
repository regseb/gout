# Gout

> Agrégateur d'Internet (flux RSS et tout le reste).

## Description

Gout est une **extension** Firefox / Chrome pour récupérer des informations sur
Internet (flux RSS / Atom, résultats d'API, parsing de page Web) et les
afficher sur une seule page. Le paramètrage des données récupérées se fait avec
des objets
[JSON](http://www.json.org/json-fr.html "JavaScript Object Notation"). Il est
aussi possible de développer des widgets et des scrapers pour agréger de
nouveaux sites Internet.

## Démonstration

Une version de démonstration non-configurable est disponible sur :

- **[AMO](//addons.mozilla.org/fr/firefox/)** (addons.mozilla.org) ;
- **[Chrome Web Store](//chrome.google.com/webstore/category/extensions)**.

## Installation

Cette procédure décrit l'installation. Vous aurez besoin de
[`git`](//git-scm.com/) et `npm` ([Node.js](//nodejs.org/en/)). Commencez par
cloner le projet, puis installez les dépendances :

```shell
git clone https://github.com/regseb/gout.git
cd gout
npm install
```

Vous pouvez ensuite ajouter des
**[widgets](//github.com/search?q=topic%3Agout+widget)** et des
**[scrapers](//github.com/search?q=topic%3Agout+scraper)** externes.

### Firefox

Lancez Firefox et rendez vous dans le *gestionnaire de modules complémentaires*.
Ouvrez l'outil pour *déboguer des modules*. *Chargez un module temporaire* en
ouvrant le fichier `src/manifest.json`.

### Chrome

Ouvrez Chrome et allez dans la page paramètrage des *extensions*. Activez le
*Mode développeur*, puis *chargez l'extension non empaquetée* en ouvrant le
répertoire `src`.

## Licence

L'extension est publiée sous la [Licence Publique de l’Union européenne - EUPL
v.1.1](//joinup.ec.europa.eu/software/page/eupl/licence-eupl).
