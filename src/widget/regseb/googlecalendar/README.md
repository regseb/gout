# /regseb/googlecalendar

Ce widget affiche les prochains évènements d'un
**[Google Agenda](//www.google.com/calendar)**.

## Configuration

Le répertoire de la passerelle doit avoir un fichier ***config.json***
contenant un objet
[JSON](http://www.json.org/json-fr.html "JavaScript Object Notation") avec les
propriétés suivantes :

- `"calendars"` (optionnel - valeur par défaut : `["primary"]`) : la liste des
  identifiants des agendas qui seront affichés ;
- `"color"` (optionnel - valeur par défaut : `"#3f51b5"`) : la couleur de fond
  du cadre (au format hexadécimale, régulier RGB ou avec des mots-clefs
  prédéfinis) ;
- `"index`" (optionnel - valeur par défaut : `0`) : l'index du compte Google
  Agenda ;
- `"cron"` (optionnel - valeur par défaut : `"0 */4 * * *"`) : la notation cron
  indiquant la fréquence de mise à jour des évènements ;
- `"key"` : un identifiant client pour les API Google ;
- `"secret"` : le code secret associé à l'identifiant.

**28** est une taille raisonnable pour la largeur du cadre. La hauteur dépend
du nombre d'évènements qui peuvent être affichés dans le cadre. Si vous
souhaitez avoir les *N* prochains évènements : il faut fixer la hauteur à
*N + 1*.

### `"key"` et `"secret"`

Pour obtenir un identifiant, allez dans la
***[Console des API Google](//console.developers.google.com/)***. Créez un
projet, puis *Créez des identifiants* pour obtenir un *ID client OAuth* de type
*Application Web*. Laissez vide les champs pour définir les *Origines JavaScript
autorisées*. Pour les *URI de redirection autorisés*, ajoutez les deux adresse
de Gout :

- `https://e7ca15c1c9d74876c655f32cebd95dfd8c7afc15.extensions.allizom.org/`
- `https://jgmpleepfnjaaihkcadaphgjecnglldo.chromiumapp.org/`

Ensuite, activez la *Calendar API*.

## Scraper

Ce widget n'utilise pas de scraper.

## Exemple

Cet exemple affiche les évènements de votre calendrier principale (en les
mettant à jour une fois par jour).

```JSON
{
    "regseb/googlecalendar": {
        "widget": "regseb/googlecalendar",
        "coord": { "x": 1, "y": 1, "w": 28, "h": 5 },
        "files": {
            "config.json": {
                "key": "88198.apps.googleusercontent.com (une clé de ce style)",
                "secret": "sdlkfjaskd (un code de ce style)",
                "cron": "0 5 * * *"
            }
        }
    }
}
```
