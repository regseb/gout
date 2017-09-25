# core/stack

Ce widget affiche la liste des derniers éléments d'une liste de flux.

## Configuration

Le répertoire de la passerelle doit avoir un fichier ***config.json***
contenant un objet
[JSON](http://www.json.org/json-fr.html "JavaScript Object Notation") avec les
propriétés suivantes :

- `"size"` : le nombre d'élément à récupérer pour chaque scraper ;
- `"color"` : la couleur de fond du cadre (au format hexadécimale, régulier RGB
  ou avec des mots-clefs prédéfinis) ;
- `"cron"` : la notation cron indiquant la fréquence de mise à jour.

Une image ayant pour nom ***icon.svg*** doit aussi est présente dans le
répertoire de la passerelle.

**28** est une taille raisonnable pour la largeur du cadre.

## Scraper

Les scrapers associés à ce widget doivent définir une méthode `extract()` qui
prend en paramètre un nombre indiquant le nombre de résultats à retourner.
Chaque résultat est un objet JSON ayant les propriétés :

- `"title"` : le titre de l'élément ;
- `"desc"` : la description de l'élément qui sera affichée dans l'info-bulle ;
- `"link"` : le lien de l'élément ;
- `"icon"` : l'URL de l'icône qui préfixera le titre ;
- `"guid"` : un identifiant de l'élément ;
- `"date"` : le nombre de millisecondes depuis le 1er janvier 1970 à 00:00:00
  UTC.

Les scrapers du widget *core/feed* peuvent aussi être utilisés.

## Exemple

Cette configuration affiche les actualités du site [LinuxFr.org](//linuxfr.org/)
(avec une mise à jour toutes les dix minutes).

```JSON
{
    "stack/linuxfr": {
        "widget": "core/stack",
        "coord": { "x": 1, "y": 1, "w": 28, "h": 6 },
        "files": {
            "config.json": {
                "size": 10,
                "color": "#ff9800",
                "cron": "*/10 * * * *"
            }
        },
        "scrapers": [
            {
                "scraper": "core/feed/atom",
                "config": {
                    "url": "https://linuxfr.org/news.atom"
                }
            }
        ]
    }
}
```
