# /std/image

Ce widget affiche des images extraites d'un site Internet.

## Configuration

La configuration contient un objet
[JSON](http://www.json.org "JavaScript Object Notation") avec la propriété
suivante :

- `"cron"` : la notation cron indiquant la fréquence de mise à jour.

Les dimensions dépendent de la taille de l'image qui sera affichée.

## Scraper

Les scrapers associés à ce widget doivent définir une méthode `list()` qui prend
en paramètre un nombre indiquant le nombre de résultats à retourner. Chaque
résultat est un objet JSON ayant les propiétés :

- `"img"` : l'adresse de l'image ;
- `"title"` : le titre de l'image ;
- `"link"` : l'adresse vers la page Internet affichant l'image ;
- `"guid"` : un identifiant unique de l'image (son adresse par exemple) ;
- `"date"` : le nombre de millièmes de secondes depuis le 1 janvier 1970 à
  00:00:00 UTC.

## Exemple

Cet exemple affiche les trois dernières images du site *Urtikan*.

```JSON
{
    "std/image/urtikan": {
        "widget": "std/image",
        "coord": { "x": 1, "y": 1, "w": 14, "h": 13 },
        "config": {
            "size": 3,
            "cron": "0 */3 * * *"
        },
        "scrapers": [
            { "scraper": "regseb/image/urtikan" }
        ]
    }
}
```
