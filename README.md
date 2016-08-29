# Gout

> Agrégateur d'Internet (flux RSS et tout le reste).

## Description

Gout est une **application Web** utilisant [Node.js](//nodejs.org/). Elle
récupère des informations sur Internet (flux RSS, résultats d'API, parsing de
page Web) pour les afficher sur une seule page. Le paramètrage des données
récupérées se fait avec des fichiers
[JSON](http://www.json.org/json-fr.html "JavaScript Object Notation"). Il est
aussi possible de développer des widgets et des scrapers pour agréger de
nouveaux sites Internet.

## Installation

Commencer par installer **Node.js**. Puis déployer Gout dans le répertoire de
votre choix en exécutant les commandes suivantes dans la console :

```shell
git clone https://github.com/regseb/gout.git
cd gout
npm install
```

Ligne par ligne, les instructions précédentes :

1. clone le projet hébergé dans GitHub ;
2. rentre dans le répertoire ;
3. installe les dépendances ([Express](http://expressjs.com),
   [RequireJS](http://requirejs.org), [jQuery](//jquery.com),
   [Wiloquery](//regseb.github.io/wiloquery/) et
   [Scronpt](//regseb.github.io/scronpt/)).

## Utilisation

Il faut lancer l'application en exécutant la commande :

```shell
npm start
```

Rendez-vous ensuite à l'adresse suivante avec votre navigateur :

    http://localhost:3000/

## Licence

La bibliothèque est publiée sous la [Licence Publique de l’Union européenne -
EUPL v.1.1](//joinup.ec.europa.eu/software/page/eupl/licence-eupl).
