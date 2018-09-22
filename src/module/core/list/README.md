# core/list

Ce module affiche une liste de liens.

## Configuration

Le répertoire du widget doit avoir un fichier ***config.json*** contenant un
objet
[JSON](https://www.json.org/json-fr.html "JavaScript Object Notation") avec les
propriétés suivantes :

- `"color"` : la couleur de fond du cadre (au format hexadécimale, régulier RGB
  ou avec des mots-clefs prédéfinis) ;
- `"cron"` : la notation cron indiquant la fréquence de mise à jour.
- `"empty"` (optionnel - aucun élément affiché par défaut) : un objet JSON ayant
  les mêmes propriétés qu'une ligne renvoyée par les scrapers et qui est affiché
  quand la liste est vide ;
- `"max"` (optionnel - aucune limite par défaut) : le nombre maximal d'éléments
  affichés dans le widget ;
- `"visited"` (optionnel - par défaut : `true`) : la marque indiquant s'il faut
  afficher les liens déjà visités.

Une image ayant pour nom ***icon.svg*** peut aussi est présente dans le
répertoire du widget. Par défaut, le symbole d'une liste sera utilisé. L'image
doit être carrée et le dessin doit occupé toute la zone de l'image. Si le dessin
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
- `"date"` : le nombre de millisecondes depuis le 1er janvier 1970 à 00:00:00
  UTC.

Les scrapers du module *core/feed* peuvent aussi être utilisés.

## Exemple

Cette configuration affiche un cadre jaune avec trois liens allant vers
*[Facebook](https://www.facebook.com/)*, *[Twitter](https://www.twitter.com/)*
et *[Google+](https://plus.google.com/)*.

```JSON
{
    "module": "core/list",
    "files": {
        "config.json": {
            "color": "#f0a30a",
            "cron": "@yearly"
        }
    },
    "scrapers": [
        {
            "scraper": "core/repeater",
            "config": [
                {
                    "link": "https://www.facebook.com/",
                    "title": "Facebook"
                }, {
                    "link": "https://www.twitter.com/",
                    "title": "Twitter"
                }, {
                    "link": "https://plus.google.com/",
                    "title": "Google+"
                }
            ]
        }
    ]
}
```
