# /regseb/gmail

Ce widget affiche les derniers courriels reçus sur une boite
**[Gmail](//mail.google.com/)**.

## Configuration

La configuration contient un objet
[JSON](http://www.json.org "JavaScript Object Notation") avec les propriétés
suivantes :

- `"query"` (optionnel - valeur par défaut : `"is:unread"`) : le
  [filtre](https://support.google.com/mail/answer/7190) des courriels affichés ;
- `"color"` (optionnel - valeur par défaut : `"#f44336"`) : la couleur de fond
  du cadre (au format hexadécimale, régulier RGB ou avec des mots-clefs
  prédéfinis) ;
- `"index`" (optionnel - valeur par défaut : `0`) : l'index du compte Gmail ;
- `"cron"` : la notation cron indiquant la fréquence de mise à jour des
  nouveaux courriels ;
- `"key"` : un identifiant client pour les API Google ;
- `"secret"` : le code secret associé à l'identifiant.

**28** est une taille raisonnable pour la largeur du cadre. La hauteur dépend
du nombre de courriel qui peuvent être affichés dans le cadre. Si vous souhaitez
avoir les *N* derniers courriel : il faut fixer la hauteur à *N + 1*.

## `"key"` et `"secret"`

Pour obtenir un identifiant, allez dans la
***[Google Developers Console](//console.developers.google.com/)***. Créez un
projet, puis *Ajoutez des identifiants* pour obtenir un *identifiant client
OAuth 2.0* de type *Application Web*. Dans le champs pour définir l'origine des
requêtes : renseignez l'adresse où est accessible Gout. Par exemple :
`http://localhost:3000/`. Pour les *URI* de redirection : indiquez l'adresse de
Gout suffixée avec `/widget/regseb/gmail/oauth2.html`. Par exemple :
`http://localhost:3000/widget/regseb/gmail/oauth2.html`.

Ensuite, activez la *Gmail API*.

## Scraper

Ce widget n'utilise pas de scraper.

## Exemple

Cet exemple actualise, toutes les minutes, la liste des courriels non-lus et qui
sont dans la boîte de réception.

```JSON
{
    "regseb/gmail": {
        "widget": "regseb/gmail",
        "coord": { "x": 1, "y": 1, "w": 28, "h": 5 },
        "config": {
            "query": "is:unread in:inbox",
            "key": "881981768.apps.googleusercontent.com (une clé de ce style)",
            "secret": "sdlkfjaskd (un code de ce style)"
            "cron": "* * * * *"
        }
    }
}
```
