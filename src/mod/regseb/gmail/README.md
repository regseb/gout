# /regseb/gmail

Ce module affiche les derniers courriels reçus sur une boite **Gmail**.

## Configuration

**28** est une taille raisonnable pour la largeur du cadre. La hauteur dépend
du nombre de courriel qui peuvent être affichés dans le cadre. Si vous souhaitez
avoir les *N* derniers courriel : il faut fixer la hauteur à *N + 1*.

Le répertoire de la passerelle doit avoir un fichier ***config.json***
contenant un objet [JSON](http://www.json.org "JavaScript Object Notation")
avec les propriétés suivantes :

- `"color"` (optionnel - valeur par défaut : `"#f44336"`) : la couleur de fond
  du cadre (au format hexadécimale, régulier RGB ou avec des mots-clefs
  prédéfinis) ;
- `"index`" (optionnel - valeur par défaut : `"0"`) : TODO ;
- `"cron"` : la notation cron indiquant la fréquence de mise à jour des
  nouveaux courriels ;
- `"key"` : un identifiant client pour les API Google ;
- `"secret"` : le code secret associé à l'identifiant.

## `"key"` et `"secret"`

Pour obtenir un identifiant, allez dans la
***[Google Developers Console](//console.developers.google.com/)***. Créez un
projet, puis *Ajoutez des identifiants* pour obtenir un *identifiant client
OAuth 2.0* de type *Application Web*. Dans le champs pour définir l'origine des
requêtes : renseignez l'adresse où est accessible Gout. Par exemple :
`http://localhost:3000/`. Pour les *URI* de redirection : indiquez l'adresse de
Gout suffixée avec `/mod/regseb/gmail/oauth2.html`. Par exemple :
`http://localhost:3000/mod/regseb/gmail/oauth2.html`.

Ensuite, activez la *Gmail API*.

## Exemple

### /config.json

Cet exemple actualise la liste des courriels reçus toutes les heures.

```JSON
{
    "cron": "0 * * * *",
    "key": "123456789-a1z2e3r4... (une clé de ce style)"
}
```
