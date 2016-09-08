# /std/list

Ce widget affiche une liste de liens.

## Configuration

La configuration contient un objet
[JSON](http://www.json.org "JavaScript Object Notation") avec les propriétés
suivantes :

- `"empty"` : un objet JSON ayant les mêmes propriétés qu'une ligne renvoyée par
  les scrapers et qui sera affiché quand la liste est vide ;
- `"color"` : la couleur de fond du cadre (au format hexadécimale, régulier RGB
  ou avec des mots-clefs prédéfinis) ;
- `"cron"` : la notation cron indiquant la fréquence de mise à jour.

**28** est une taille raisonnable pour la largeur du cadre. La hauteur dépend
du nombre d'éléments qu'il faut afficher dans le cadre. Si vous souhaitez
avoir les *N* éléments : il faut fixer la hauteur à *N + 1*.

Une image ayant pour nom ***icon.svg*** doit aussi est présent dans le
répertoire passerelle.

## Scraper

Les scrapers associés à ce widget doivent définir une méthode `list()` qui prend
en paramètre un nombre indiquant le nombre de résultats à retourner. Chaque
résultat est un objet JSON ayant les propriétés :

- `"title"` : le titre de l'élément ;
- `"desc"` : la description de l'élément ;
- `"link"` : le lien de l'élément ;

Les scrapers du widget *std/feed* peuvent aussi être utilisés (mais les éléments
ne seront pas triés par date).

## Exemple

Cet configuration affiche un cadre jaune avec trois liens allant vers
*[Facebook](//www.facebook.com/)*, *[Twitter](https://www.twitter.com/)* et
*[Google+](https://plus.google.com/)*.

```JSON
{
    "std/list/social": {
        "widget": "std/list",
        "coord": { "x": 1, "y": 1, "w": 20, "h": 4 },
        "config": {
            "color": "#f0a30a",
            "cron": "0 0 1 1 0"
        },
        "scrapers": [
            { "scraper": "std/list/bookmark",
              "config": [{ "link": "https://www.facebook.com/",
                           "title": "Facebook" },
                         { "link": "https://www.twitter.com/",
                           "title": "Twitter" },
                         { "link": "https://plus.google.com/",
                           "title": "Google+" }] }
        ]
    }
}
```
