# /regseb/meltdown

Ce module affiche le cours d'une action cotée en bourse (grâce à l'API de
**Yahoo Finance**).

## Configuration

Les dimensions conseillées sont **10x2**.

Le répertoire de la passerelle doit avoir un fichier ***config.json***
contenant un objet [JSON](http://www.json.org "JavaScript Object Notation")
avec les propriétés suivantes :

- `"share"` : le symbole de la société ;.
- `"lang"` (optionnel - valeur par défaut : `"fr"`) : le
  [code du site](https://everything.yahoo.com/world/) (`"fr"`, `"fr-be"`,
  `"qc"̀`, ...) ;
- `"color"` : la couleur de fond du cadre (au format hexadécimale, régulier RGB
  ou avec des mots-clefs prédéfinis) ;
- `"cron`" (optionnel - valeur par défaut : `"0/5 * * * *"`) : la notation cron
  indiquant la fréquence de mise à jour du cours.

Une image ayant pour nom ***icon.svg*** doit aussi est présent dans le
répertoire.

## Exemple

### /config.json

Cet exemple affiche le cours de l'action de la société *Pernod Ricard*, avec une
actualisation toutes les cinq minutes durant les heures d'ouverture de la Bourse
de Paris.

```JSON
{
    "share": "ri.pa",
    "color": "#3f51b5",
    "cron": "*/5 9-18 * * 1-5"
}
```
