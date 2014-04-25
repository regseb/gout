# /std/image
Ce module affiche un cadre vide dont la couleur de fond est personnalisable.

## Configuration
Aucune dimension particulière est conseillée.

Le répertoire de la passerelle doit avoir un fichier ***config.json***
contenant un objet *[JSON](http://www.json.org "JavaScript Object Notation")*
avec la propriété suivante :
- `"cron"` : la notation *cron* indiquant la fréquence de mise à jour.
Une fichier *JavaScript*, ayant pour nom ***extract.js***, doit aussi est
présent dans le répertoire. Le script doit contenir une fonction qui retourne
une `Promise` qui retourne elle-même un objet *JSON* avec trois propriétés :
- `"img"` : l'adresse de l'image ;
- `"link"` : l'adresse vers la page Internet affichant l'image ;
- `"title"` : le titre de l'image.

## Exemple
### /config.json
Cet exemple actualise l'image toutes les trois heures.
```JSON
{
    "cron": "0 */3 * * *"
}
```
### /extract.js
Cette fonction récupère l'image la plus récente du site *Urtikan*.
```JavaScript
function() {
    "use strict";
    return $.get("http://www.urtikan.net/dessin-du-jour/").then(function(data) {
        var img = $("#posts-dessin img:first", data);
        return {
            "img":   $(img).attr("src"),
            "link":  $(img).parent().attr("href"),
            "title": $(img).attr("title")
        };
    });
}
```
