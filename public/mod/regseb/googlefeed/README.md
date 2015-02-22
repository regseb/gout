# /regseb/googlefeed
Ce module affiche la liste des dernières actualités d'un (ou d'une liste) de
flux **RSS** ou **Atom**.

## Configuration
**28** est une taille raisonnable pour la largeur du cadre. La hauteur dépend
du nombre d'actualités qu'il faut afficher dans le cadre. Si vous souhaitez
avoir les *N* derniers articles : il faut fixer la hauteur à *N + 1*.

Le répertoire de la passerelle doit avoir un fichier ***config.json***
contenant un objet [JSON](http://www.json.org "JavaScript Object Notation")
avec les propriétés suivantes :
- `"color"` : la couleur de fond du cadre (au format hexadécimale, régulier RGB
  ou avec des mots-clefs prédéfinis) ;
- `"url"` : l'adresse d'un flux RSS ou Atom ou un tableau d'adresses de flux ;
- `"cron"` : la notation cron indiquant la fréquence de mise à jour.
Une image ayant pour nom ***icon.svg*** doit aussi est présent dans le
répertoire.

## Exemple
### /config.json
Cet exemple affiche les dernières actualités du site LinuxFR.org (avec une mise
à jour toutes les dix minutes).
```JSON
{
    "color": "#f0a30a",
    "url":   "http://linuxfr.org/news.atom",
    "cron":  "*/10 * * * *"
}
```
### /icon.svg
TODO Insérer une image.
