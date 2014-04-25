# /fr/regseb/articleauhasard
Ce module donne un lien vers un article au hasard de
**[Wikipédia](https://fr.wikipedia.org/)**.

## Configuration
Les dimensions conseillées sont **25x3**.

Le répertoire de la passerelle doit avoir un fichier ***config.json***
contenant un objet *[JSON](http://www.json.org "JavaScript Object Notation")*
avec les propriétés suivantes :
- `"color"` : la couleur de fond du cadre au format hexadécimal (par exemple
  `"#647687"`pour du gris) ;
- `"lang"` : le
  [code de la langue](https://meta.wikimedia.org/wiki/List_of_Wikipedias/fr)
  des pages (par exemple `"fr"` pour du français) ;
- `"cron`" : la notation *cron* indiquant la fréquence de changer des pages.

## Exemple
### /config.json
Cet configuration donne un nouveau lien vers un article en français toutes les
cinq minutes.
```JSON
{
    "color": "#647687",
    "lang": "fr",
    "cron": "*/5 * * * *"
}
```
