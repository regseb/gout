# /regseb/horoscope
Ce module donne l'horoscope du jour pour un signe du zodiaque.

## Configuration
Les dimensions conseillées sont **28x3**.

Le répertoire de la passerelle doit avoir un fichier ***config.json***
contenant un objet [JSON](http://www.json.org "JavaScript Object Notation")
avec les propriétés suivantes :
- `"color"` (optionnel - valeur par défaut : `"black"`) : la couleur de fond
  du cadre (au format hexadécimale, régulier RGB ou avec des mots-clefs
  prédéfinis) ;
- `"sign"` : le signe du zodiaque, les valeurs posibles sont `"belier"`,
  `"taureau"`, `"gemeaux"`, `"cancer"`, `"lion"`, `"vierge"`, `"balance"`,
  `"scorpion"`, `"sagittaire"`,`"capricorne"`, `"verseau"` et `"poissons"`.

## Exemple
### /config.json
Cet exemple affiche l'horoscope du jour des *Lion*s.
```JSON
{
    "sign": "lion"
}

