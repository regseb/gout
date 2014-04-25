# /std/feed
Ce module affiche la liste des dernières actualités d'un (ou d'une liste) de
flux ***RSS***.

## Configuration
Les dimensions conseillées sont **26x3**.

Le répertoire de la passerelle doit avoir un fichier ***config.json***
contenant un objet *[JSON](http://www.json.org "JavaScript Object Notation")*
avec les propriétés suivantes :
- `"color"` : la couleur de fond du cadre au format hexadécimal (par exemple
  `"#f0a30a"`pour du jaune) ;
- `"url"` : l'adresse d'un flux *RSS* ou un tableau d'adresse de flux ;
- `"size"` : le nombre d'actualités affichées ;
- `"cron"` : la notation *cron* indiquant la fréquence de mise à jour.
Une image ayant pour nom ***icon.svg*** doit aussi est présent dans le
répertoire.

## Exemple
### /config.json
Cet exemple affiche les cinq dernières actualités du site LinuxFR.org (avec une
mise à jour toutes les trois minutes).
```JSON
{
    "color": "#f0a30a",
    "url": "http://linuxfr.org/news.atom",
    "size": 5,
    "cron": "*/3 * * * *"
}
```
### /icon.svg
TODO Insérer une image.
