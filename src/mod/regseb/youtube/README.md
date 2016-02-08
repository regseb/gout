# /regseb/youtube

Ce module affiche la liste des dernières vidéos postées sur
**[Youtube](//www.youtube.com)** par des utilisateurs.

## Configuration

**28** est une taille raisonnable pour la largeur du cadre. La hauteur dépend
du nombre de vidéos qu'il faut afficher dans le cadre. Si vous souhaitez avoir
les *N* dernières vidéos : il faut fixer la hauteur à *N + 1*.

Le répertoire de la passerelle doit avoir un fichier ***config.json***
contenant un objet [JSON](http://www.json.org "JavaScript Object Notation")
avec les propriétés suivantes :

- `"users"` : la liste des identifiants de comptes ;
- `"color"` : la couleur de fond du cadre (au format hexadécimale, régulier RGB
  ou avec des mots-clefs prédéfinis) ;
- `"cron"` : la notation cron indiquant la fréquence de mise à jour ;
- ̀`"key"` : une clé pour les API Google.

## `"key"`

Pour obtenir une clé, allez dans la
***[Google Developers Console](//console.developers.google.com/)***. Créez un
projet, puis *Ajoutez des identifiants* pour obtenir une *Clé de l'API* de type
*Navigateur*. Dans le champs pour filtrer les requêtes : renseignez l'adresse où
est accessible Gout. Par exemple : `http://localhost:3000/*`.

Ensuite, activez la *YouTube Data API v3*.

## Exemple

### /config.json

Cet exemple affiche les dernières vidéos de
*[Data Gueule](//www.youtube.com/user/datagueule)* (avec une mise à jour à
minuit).

```JSON
{
    "users": ["datagueule"],
    "color": "#9e9e9e",
    "cron":  "0 0 * * *",
    "key":   "AIzaSyBdVl-cTICSwYKrZ95SuvNw7dbMuDt1KG0 (une clé de ce style)"
}
```
