# /regseb/betaseries

Ce widget affiche les prochains épisodes de séries à récupérer et/ou voir. La
liste est récupérée de votre compte du site
**[BetaSeries](//www.betaseries.com/)**.

## Configuration

**20** est une taille raisonnable pour la largeur du cadre. La hauteur dépend
du nombre d'épisodes qu'il faut afficher dans le cadre. Si vous souhaitez avoir
les *N* derniers épisodes : il faut fixer la hauteur à *N + 1*.

Le répertoire de la passerelle doit avoir un fichier ***config.json***
contenant un objet [JSON](http://www.json.org "JavaScript Object Notation")
avec les propriétés suivantes :

- `"shows"` (optionnel - valeur par défaut : toutes vos séries) : la liste des
  noms de série ;
- `"format"` (optionnel - valeur par défaut :
  `"S{season}E{episode} : {title} ({show})"`) : le format du texte affiché ;
- `"color"` (optionnel - valeur par défaut : `"#2196f3"`) : la couleur de fond
  du cadre (au format hexadécimale, régulier RGB ou avec des mots-clefs
  prédéfinis) ;
- `"key"` : votre [clé pour l'API](//www.betaseries.com/api/) de BetaSeries ;
- `"secret"` : votre clé secrète pour l'API de BetaSeries ;
- `"cron"` (optionnel - valeur par défaut : `"0 0 * * *"`) : la notation cron
  indiquant la fréquence de mise à jour.

Une image ayant pour nom ***icon.svg*** doit aussi est présent dans le
répertoire.

## Exemple

Cet exemple affiche la liste des épisodes à récupérer et/ou voir pour la série
[The IT Crowd](//www.betaseries.com/serie/itcrowd) (avec une mise à jour à
minuit).

```JSON
{
    "regseb/betaseries/itcrowd": {
        "widget": "regseb/betaseries",
        "coord": { "x": 1, "y": 1, "w": 20, "h": 5 },
        "config": {
            "shows": ["The IT Crowd"],
            "format": "s{season}e{episode} : {title}",
            "key": "d527c40702a3 (une clé de ce style)",
            "secret": "6d587671253e40475442502c66593526 (une clé de ce style)",
            "cron": "0 0 * * *"
        }
    }
}
```
