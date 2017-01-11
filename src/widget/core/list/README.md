# core/list

Ce widget affiche une liste de liens.

## Configuration

Le répertoire de la passerelle doit avoir un fichier ***config.json***
contenant un objet
[JSON](http://www.json.org/json-fr.html "JavaScript Object Notation") avec les
propriétés suivantes :

- `"empty"` : un objet JSON ayant les mêmes propriétés qu'une ligne renvoyée par
  les scrapers et qui est affiché quand la liste est vide ;
- `"color"` : la couleur de fond du cadre (au format hexadécimale, régulier RGB
  ou avec des mots-clefs prédéfinis) ;
- `"cron"` : la notation cron indiquant la fréquence de mise à jour.

Une image ayant pour nom ***icon.svg*** peut aussi est présente dans le
répertoire de la passerelle. Par défaut, le symbole d'une liste sera utilisé.
L'image doit être carrée et le dessin doit occupé toute la zone de l'image. Si
le dessin n'est pas carré, il faut le centrer verticalement et l'aligner à
droite. Seule la couleur noire doit être utilisée et elle doit avoir une opacité
de `0.2`.

**28** est une taille raisonnable pour la largeur du cadre. La hauteur dépend
du nombre d'éléments qu'il faut afficher dans le cadre. Si vous souhaitez
avoir les *N* éléments : il faut fixer la hauteur à *N + 1*.

## Scraper

Les scrapers associés à ce widget doivent définir une méthode `extract()` qui
prend en paramètre un entier indiquant le nombre de résultats à retourner.
Chaque résultat est un objet JSON ayant les propriétés :

- `"title"` : le titre de l'élément ;
- `"desc"` : la description de l'élément qui sera affichée dans l'info-bulle ;
- `"link"` : le lien de l'élément ;
- `"date"` : le nombre de millièmes de secondes depuis le 1 janvier 1970 à
  00:00:00 UTC.

Les scrapers des widgets *core/feed* et *core/stack* peuvent aussi être
utilisés.

## Exemple

Cette configuration affiche un cadre jaune avec trois liens allant vers
*[Facebook](//www.facebook.com/)*, *[Twitter](//www.twitter.com/)* et
*[Google+](//plus.google.com/)*.

```JSON
{
    "list/social": {
        "widget": "core/list",
        "coord": { "x": 1, "y": 1, "w": 20, "h": 4 },
        "files": {
            "config.json": {
                "color": "#f0a30a",
                "cron": "0 0 1 1 0"
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
}
```
