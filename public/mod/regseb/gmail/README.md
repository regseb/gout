# /regseb/youtube
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
- `"cron"` : la notation cron indiquant la fréquence de mise à jour des
  nouveaux courriels ;
- `"client_id"` : votre
  [identifiant client](https://developers.google.com/console/help/new/#generatingoauth2)
  pour demander un connexion OAuth.

## Exemple
### /config.json
Cet exemple actualise la liste des courriels reçus toutes les heures.
```JSON
{
    "cron": "0 * * * *"
    "key": "123456789-a1z2e3r4... (une clé de ce style)",
}
```
