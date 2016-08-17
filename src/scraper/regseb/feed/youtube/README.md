# /regseb/feed/youtube

Ce scraper récupère la liste des dernières vidéos postées sur
**[Youtube](//www.youtube.com)** par un utilisateur.

## Configuration

La configuration contient un objet
[JSON](http://www.json.org "JavaScript Object Notation") avec les propriétés
suivantes :

- `"user"` : un identifiant de compte ;
- ̀`"key"` : une clé pour les API Google.

Pour obtenir une clé, allez dans la
***[Google Developers Console](//console.developers.google.com/)***. Créez un
projet, puis *Ajoutez des identifiants* pour obtenir une *Clé de l'API* de type
*Navigateur*. Dans le champs pour filtrer les requêtes : renseignez l'adresse où
est accessible Gout. Par exemple : `http://localhost:3000/*`.

Ensuite, activez la *YouTube Data API v3*.

## Exemple

Cet exemple affiche les dernières vidéos de
*[Data Gueule](//www.youtube.com/user/datagueule)*.

```JSON
{
    "std/feed/datagueule": {
        "widget": "std/feed",
        "coord": { "x": 1, "y": 1, "w": 28, "h": 6 },
        "config": {
            "color": "#3f51b5",
            "cron": "0 * * * *"
        },
        "scrapers": [
            { "scraper": "regseb/feed/youtube",
              "config": { "user": "datagueule",
                          "key": "AIzaSyBdVl-cTICSwY... (une clé de ce style)" }
            }
        ]
    }
}
```
