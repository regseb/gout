# /std/feed

Ce widget affiche la liste des derniers éléments d'une liste de flux.

## Configuration

La configuration contient un objet
[JSON](http://www.json.org "JavaScript Object Notation") avec les propriétés
suivantes :

- `"color"` : la couleur de fond du cadre (au format hexadécimale, régulier RGB
  ou avec des mots-clefs prédéfinis) ;
- `"cron"` : la notation cron indiquant la fréquence de mise à jour.

**28** est une taille raisonnable pour la largeur du cadre. La hauteur dépend
du nombre d'éléments qu'il faut afficher dans le cadre. Si vous souhaitez
avoir les *N* derniers éléments : il faut fixer la hauteur à *N + 1*.

Une image ayant pour nom ***icon.svg*** doit aussi est présent dans le
répertoire passerelle.

## Scraper

Les scrapers associés à ce widget doivent définir une méthode `list()` qui prend
en paramètre un nombre indiquant le nombre de résultats à retourner. Chaque
résultat est un objet JSON ayant les propriétés :

- `"title"` : le titre de l'élément ;
- `"desc"` : la description de l'élément ;
- `"link"` : le lien de l'élément ;
- `"guid"` : un identifiant de l'élément ;
- `"date"` : le nombre de millièmes de secondes depuis le 1 janvier 1970 à
  00:00:00 UTC.

## Exemple

Cet exemple affiche les cinq dernières actualités du site
[LinuxFr.org](http://linuxfr.org/) (avec une mise jour toutes les dix minutes).

```JSON
{
    "std/feed/linuxfr": {
        "widget": "std/feed",
        "coord": { "x": 1, "y": 1, "w": 28, "h": 6 },
        "config": {
            "color": "#ff9800",
            "cron": "*/10 * * * *"
        },
        "scrapers": [
            { "scraper": "std/feed/atom",
              "config": "http://linuxfr.org/news.atom" }
        ]
    }
}
```
