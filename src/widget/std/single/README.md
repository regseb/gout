# /regseb/single

Ce widget affiche un lien.

## Configuration

Les dimensions conseillées sont **20x2**.

Le répertoire de la passerelle doit avoir un fichier ***config.json***
contenant un objet [JSON](http://www.json.org "JavaScript Object Notation")
avec les propriétés suivantes :

- `"city"` : le nom de ville où se trouve le bar.
- `"color"` (optionnel - valeur par défaut : `"#4caf50"`) : la couleur de fond
  du cadre (au format hexadécimale, régulier RGB ou avec des mots-clefs
  prédéfinis) ;
- `"cron`" (optionnel - valeur par défaut : `"0 6 * * *"`) : la notation cron
  indiquant la fréquence de mise à jour de l'évènement.

## Exemple

### /config.json

Cet exemple affiche l'évènement du Meltdown d'*Aix-en-Provence*.

```JSON
{
    "city": "aix"
}
```
