# /regseb/om

Ce widget affiche le résultat du dernier match de
l'**[Olympique de Marseille](http://www.om.net/)** et des informations sur le
prochain match.

## Configuration

Les dimensions conseillées sont **20x3**.

Le répertoire de la passerelle doit avoir un fichier ***config.json***
contenant un objet [JSON](http://www.json.org "JavaScript Object Notation")
avec les propriétés suivantes :

- `"color"` (optionnel - valeur par défaut : `"#03a9f4"`) : la couleur de fond
  du cadre (au format hexadécimale, régulier RGB ou avec des mots-clefs
  prédéfinis) ;
- `"cron`" (optionnel - valeur par défaut : `"0 7 * * *"`) : la notation cron
  indiquant la fréquence de changement des pages.

## Exemple

### /config.json

Cet exemple affiche les informations sur les matchs de l'OM tous les jours à
sept heures.

```JSON
{}
```
