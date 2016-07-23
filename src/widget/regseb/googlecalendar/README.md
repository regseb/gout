# /regseb/googlecalendar

Ce widget affiche les prochains évènements d'un **Google Agenda**.

## Configuration

**28** est une taille raisonnable pour la largeur du cadre. La hauteur dépend
du nombre d'évènements qui peuvent être affichés dans le cadre. Si vous
souhaitez avoir les *N* prochains évènements : il faut fixer la hauteur à
*N + 1*.

Le répertoire de la passerelle doit avoir un fichier ***config.json***
contenant un objet [JSON](http://www.json.org "JavaScript Object Notation")
avec les propriétés suivantes :

- `"calendar"` (optionnel - valeur par défaut : `["primary"]`) : la liste des
  identifiants des calendriers qui seront affichés ;
- `"color"` (optionnel - valeur par défaut : `"#3f51b5"`) : la couleur de fond
  du cadre (au format hexadécimale, régulier RGB ou avec des mots-clefs
  prédéfinis) ;
- `"index`" (optionnel - valeur par défaut : `"0"`) : TODO ;
- `"cron"` (optionnel - valeur par défaut : `"0 */4 * * *"`) : la notation cron
  indiquant la fréquence de mise à jour des évènements ;
- `"key"` : un identifiant client pour les API Google ;
- `"secret"` : le code secret associé à l'identifiant.

## `"key"` et `"secret"`

Pour obtenir un identifiant, allez dans la
***[Google Developers Console](//console.developers.google.com/)***. Créez un
projet, puis *Ajoutez des identifiants* pour obtenir un *identifiant client
OAuth 2.0* de type *Application Web*. Dans le champs pour définir l'origine des
requêtes : renseignez l'adresse où est accessible Gout. Par exemple :
`http://localhost:3000/`. Pour les *URI* de redirection : indiquez l'adresse de
Gout suffixée avec `/widget/regseb/googlecalendar/oauth2.html`. Par exemple :
`http://localhost:3000/widget/regseb/googlecalendar/oauth2.html`.

Ensuite, activez la *Calendar API*.

## Exemple

### /config.json

Cet exemple affiche les évènements (en les mettant à jour toutes les quatre
heures).

```JSON
{
    "key": "8819981768.apps.googleusercontent.com (une clé de ce style)",
    "secret": "sdlkfjaskd (un code de ce style)"
}
```
