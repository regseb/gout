# /regseb/articleauhasard
Ce module donne un lien vers un article au hasard de
**[Wikipédia](https://fr.wikipedia.org/)**.

## Configuration
Les dimensions conseillées sont **20x2**.

Le répertoire de la passerelle peut avoir un fichier ***config.json***
contenant un objet [JSON](http://www.json.org "JavaScript Object Notation")
avec les propriétés suivantes :
- `"color"` (optionnel - valeur par défaut : `"#607d8b"`) : la couleur de fond
  du cadre (au format hexadécimale, régulier RGB ou avec des mots-clefs
  prédéfinis) ;
- `"lang"` (optionnel - valeur par défaut : `"fr"`) : le
  [code de la langue](https://meta.wikimedia.org/wiki/List_of_Wikipedias/fr)
  des pages ;
- `"cron`" (optionnel - valeur par défaut : `"0 * * * *"`) : la notation cron
  indiquant la fréquence de changement des pages.

## Exemple
Par défaut (sans fichier *config.json*), le module affiche un lien vers un
article en français et change de lien toutes les heures.
