# /std/image
Ce module affiche des images extraites d'un site Internet.

## Configuration
Les dimensions dépendent de la taille de l'image qui sera affichée.

Le répertoire de la passerelle doit avoir un fichier ***config.json***
contenant un objet [JSON](http://www.json.org "JavaScript Object Notation")
avec la propriété suivante :
- `"cron"` : la notation cron indiquant la fréquence de mise à jour.
Un fichier JavaScript, ayant pour nom ***extract.js***, doit aussi est présent
dans le répertoire. Le script doit contenir une fonction prenant en paramètre
le nombre d'image à afficher et qui retourne une `Promise` qui retourne
elle-même un tableau d'objets JSON ayant les propriétés :
- `"img"` : l'adresse de l'image ;
- `"title"` : le titre de l'image ;
- `"link"` : l'adresse vers la page Internet affichant l'image ;
- `"guid"` : un identifiant unique de l'image (son adresse par exemple) ;
- `"date"` : la date de parution de l'image.

## Exemple
### /config.json
Cet exemple actualise les images toutes les trois heures.
```JSON
{
    "cron": "0 */3 * * *"
}
```
### /extract.js
Cette fonction récupère les images les plus récentes du site *Urtikan*.
```JavaScript
define(["jquery"], function ($) {
    "use strict";

    return function (size) {
        var url = "http://www.urtikan.net/dessin-du-jour/";
        return $.get(url).then(function (data) {
            var events = [];
            $("#posts-dessin li:lt(" + size + ")", data).each(
                                                            function (i, item) {
                var $img = $("img", item);
                events.push({
                    "img":   $img.attr("src"),
                    "title": $img.attr("title"),
                    "link":  $img.parent().attr("href"),
                    "guid":  $img.attr("src"),
                    "date":  0
                });
            });
            return events;
        });
    };
});

```
