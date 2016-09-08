# /regseb/single

Ce widget affiche un lien.

## Configuration

La configuration contient un objet
[JSON](http://www.json.org "JavaScript Object Notation") avec la propriété
suivante :

- `"color"` (optionnel - valeur par défaut : `"#4caf50"`) : la couleur de fond
  du cadre (au format hexadécimale, régulier RGB ou avec des mots-clefs
  prédéfinis).

Les dimensions conseillées sont **20x2**.

Une image ayant pour nom ***icon.svg*** doit aussi est présent dans le
répertoire passerelle.

## Scraper

Les scrapers associés à ce widget doivent définir une méthode `get()` et qui
retourne un objet JSON ayant les propriétés :

- `"title"` : le titre ;
- `"desc"` : la description ;
- `"link"` : le lien.

## Exemple

Cet exemple affiche un lien vers un article au hasard de *Wikipédia*.

```JSON
{
    "std/single/articleauhasard": {
        "widget": "std/single",
        "coord": { "x": 1, "y": 1, "w": 20, "h": 2 },
        "config": {
            "color": "#607d8b",
            "cron": "*/5 * * * *"
        },
        "scrapers": [
            { "scraper": "regseb/single/articleauhasard" }
        ]
    }
}
```
