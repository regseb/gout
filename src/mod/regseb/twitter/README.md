# /regseb/twitter

Ce module affiche la liste des dernières tweets d'une liste de comptes
**[Twitter](//twitter.com/)**.

## Configuration

**28** est une taille raisonnable pour la largeur du cadre. La hauteur dépend
du nombre de tweet qu'il faut afficher dans le cadre. Si vous souhaitez avoir
les *N* derniers messages : il faut fixer la hauteur à *N + 1*.

Le répertoire de la passerelle doit avoir un fichier ***config.json***
contenant un objet [JSON](http://www.json.org "JavaScript Object Notation")
avec les propriétés suivantes :

- `"users"` : la liste des identifiants de comptes ;
- `"color"` : la couleur de fond du cadre (au format hexadécimale, régulier RGB
  ou avec des mots-clefs prédéfinis) ;
- `"cron"` : la notation cron indiquant la fréquence de mise à jour.

Une image ayant pour nom ***icon.svg*** doit aussi est présent dans le
répertoire.

## Exemple

### /config.json

Cet exemple affiche les derniers tweets du compte de
**[jQuery](//twitter.com/jquery)** (avec une mise à jour toutes les heures).

```JSON
{
    "users": ["jquery"],
    "color": "#3f51b5",
    "cron":  "0 * * * *"
}
```
