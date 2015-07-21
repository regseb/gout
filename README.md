# Gout

> Agrégateur d'Internet (flux RSS et tout le reste).

[Site Internet](https://regseb.github.io/gout/)

## Description

Gout est une **application Web** utilisant [io.js](https://iojs.org/fr/) (ou
[Node.js](http://nodejs.org)). Elle récupère des informations sur Internet
(flux RSS, résultats d'API, parsing de page Web) pour les afficher sur une
seule page. Le paramètrage des données récupérées se fait avec des fichiers
[JSON](http://www.json.org/json-fr.html "JavaScript Object Notation"). Il est
aussi possible de développer des modules pour agréger de nouveaux sites
Internet.

## Installation

Commencer par installer **io.js** (ou Node.js). Puis déployer Gout dans le
répertoire de votre choix en exécutant les commandes suivantes dans la console :

    wget https://regseb.github.io/gout/gout.tar.gz
    tar zvf gout.tar.gz
    cd gout
    npm install

Ligne par ligne, les instructions précédentes :

1. télécharge le fichier dans le répertoire courant ;
2. décompresse l'archive ;
3. rentre dans le répertoire ;
4. installe les dépendances ([Express](http://expressjs.com/),
   [Require.js](http://requirejs.org/), [jQuery](http://jquery.com/),
   [Wiloquery](http://regseb.github.io/wiloquery/) et
   [Scronpt](http://regseb.github.io/scronpt/)).

## Utilisation

Il faut lancer l'application en exécutant la commande :

    npm start

Rendez-vous ensuite à l'adresse suivante avec votre navigateur :

    http://localhost:3000/

## Contributeur

- [Sébastien Règne](https://github.com/regseb)

## Licence

La bibliothèque est publiée sous *GNU GENERAL PUBLIC LICENSE*.
