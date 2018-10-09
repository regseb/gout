# core/stack

Ce module affiche la liste des derniers éléments d'une liste de flux. Les
éléments sont gardés et ils peuvent être retirés en cliquant sur son icône. Ce
module est utile pour suivre des flux remontant rarement des actualités.

## Configuration

Le répertoire du widget doit avoir un fichier ***config.json*** contenant un
objet
[JSON](https://www.json.org/json-fr.html "JavaScript Object Notation") avec les
propriétés suivantes :

- `"color"` : la couleur de fond du cadre (au format hexadécimale, régulier RGB
  ou avec des mots-clefs prédéfinis) ;
- `"cron"` : la notation cron indiquant la fréquence de mise à jour.
- `"max"` (optionnel - aucune limite par défaut) : le nombre maximal d'éléments
  affichés dans le widget.

Une image ayant pour nom ***icon.svg*** peut aussi est présente dans le
répertoire du widget. Par défaut, le symbole *RSS* sera utilisé. L'image doit
être carrée et le dessin doit occupé toute la zone de l'image. Si le dessin
n'est pas carré, il faut le centrer verticalement et l'aligner à droite. Seule
la couleur noire doit être utilisée et elle doit avoir une opacité de `0.2`.

## Scraper

Les scrapers associés à ce module doivent définir une méthode `extract()` qui
prend en paramètre un entier indiquant le nombre maximal de résultats à
retourner. Chaque résultat est un objet JSON ayant les propriétés :

- `"title"` : le titre de l'élément ;
- `"desc"` : la description de l'élément qui sera affichée dans l'info-bulle ;
- `"link"` : le lien de l'élément ;
- `"icon"` : l'URL de l'icône qui préfixera le titre ;
- `"guid"` : un identifiant de l'élément ;
- `"date"` : le nombre de millisecondes depuis le 1er janvier 1970 à 00:00:00
  UTC.

## Exemple

Cet exemple surveille le prix de
[Half-Life](https://store.steampowered.com/app/70/HalfLife/) sur Steam.

```JSON
{
    "module": "core/stack",
    "files": {
        "config.json": {
            "color": "#3f51b5",
            "cron": "@daily"
        }
    },
    "scrapers": [
        {
            "scraper": "core/stack/watcher",
            "config": {
                "url": "https://store.steampowered.com/app/70/HalfLife/",
                "selector": ".game_purchase_price",
                "title": "Half-Life"
            }
        }
    ]
}
```
