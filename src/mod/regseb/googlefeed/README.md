# /regseb/googlefeed

Ce module affiche la liste des dernières actualités d'une liste de flux **RSS**
ou **Atom** (en utilisant l'[API Google Feed](//developers.google.com/feed/)).

## Configuration

**28** est une taille raisonnable pour la largeur du cadre. La hauteur dépend
du nombre d'actualités qu'il faut afficher dans le cadre. Si vous souhaitez
avoir les *N* derniers articles : il faut fixer la hauteur à *N + 1*.

Le répertoire de la passerelle doit avoir un fichier ***config.json***
contenant un objet [JSON](http://www.json.org "JavaScript Object Notation")
avec les propriétés suivantes :

- `"urls"` : la liste des adresses de flux RSS ou Atom ;
- `"color"` : la couleur de fond du cadre (au format hexadécimale, régulier RGB
  ou avec des mots-clefs prédéfinis) ;
- `"cron"` : la notation cron indiquant la fréquence de mise à jour.

Une image ayant pour nom ***icon.svg*** doit aussi est présent dans le
répertoire.

## Exemple

### /config.json

Cet exemple affiche les dernières actualités du site
[LinuxFr.org](//linuxfr.org/) (avec une mise jour toutes les dix minutes).

```JSON
{
    "urls":  ["https://linuxfr.org/news.atom"],
    "color": "#ff9800",
    "cron":  "*/10 * * * *"
}
```
