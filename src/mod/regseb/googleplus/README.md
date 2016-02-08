# /regseb/googleplus

Ce module affiche la liste des dernières actualités d'une liste de comptes
**[Google+](//plus.google.com)**.

## Configuration

**28** est une taille raisonnable pour la largeur du cadre. La hauteur dépend
du nombre d'actualités qu'il faut afficher dans le cadre. Si vous souhaitez
avoir les *N* derniers messages : il faut fixer la hauteur à *N + 1*.

Le répertoire de la passerelle doit avoir un fichier ***config.json***
contenant un objet [JSON](http://www.json.org "JavaScript Object Notation")
avec les propriétés suivantes :

- `"users"` : la liste des identifiants de comptes ;
- `"color"` : la couleur de fond du cadre (au format hexadécimale, régulier RGB
  ou avec des mots-clefs prédéfinis) ;
- `"cron"` : la notation cron indiquant la fréquence de mise à jour ;
- ̀`"key"` : une clé pour les API Google.

Une image ayant pour nom ***icon.svg*** doit aussi est présent dans le
répertoire.

## `"key"`

Pour obtenir une clé, allez dans la
***[Google Developers Console](//console.developers.google.com/)***. Créez un
projet, puis *Ajoutez des identifiants* pour obtenir une *Clé de l'API*.
Ensuite, activez l'API *Google+ API*.

## Exemple

### /config.json

Cet exemple affiche les dernières actualités du compte du
[Musée du Louvre](//plus.google.com/+MuseeLouvre/posts) (avec une mise à jour
toutes les heures).

```JSON
{
    "users": ["MuseeLouvre"],
    "color": "#673ab7",
    "cron":  "0 * * * *",
    "key":   "AIzaSyBdVl-cTICSwYKrZ95SuvNw7dbMuDt1KG0 (une clé de ce style)"
}
```
