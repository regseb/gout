# Module *list*

Ce module affiche la liste des derniers éléments d'une liste de flux.

## Configuration

La configuration du module est un objet
[JSON](https://www.json.org/json-fr.html "JavaScript Object Notation") avec les
propriétés suivantes :

- `"color"` (optionnel - gris par défaut) : la couleur de fond du cadre (au
  format hexadécimale, régulier RGB ou avec des mots-clefs prédéfinis) ;
- `"icon"` (optionnel - l'icône des flux *RSS* par défaut) : l'URL de l'icône
  qui sera affichée en fond ;
- `"cron"` (optionnel - aucune mise à jour par défaut) : la notation cron
  indiquant la fréquence de mise à jour ;
- `"max"` (optionnel - aucune limite par défaut) : le nombre maximal d'éléments
  affichés dans le module.

Pour l'icône, l'image doit être carrée et le dessin doit occupé toute la zone de
l'image. Si le dessin n'est pas carré, il faut le centrer verticalement et
l'aligner à droite. Seule la couleur noire doit être utilisée et elle doit avoir
une opacité de `0.2`.

## Scrapers

Les scrapers associés à ce module doivent définir une méthode `extract()` qui
prend en paramètre un entier indiquant le nombre maximal de résultats à
retourner. La méthode retourne une promesse contenant un tableau dont chaque
résultat est un objet JSON ayant les propriétés :

- `"title"` : le titre de l'élément ;
- `"desc"` : la description de l'élément qui sera affichée dans l'info-bulle ;
- `"link"` : le lien de l'élément ;
- `"icon"` : l'URL de l'icône qui préfixera le titre ;
- `"guid"` : un identifiant de l'élément ;
- `"date"` : le nombre de millisecondes depuis le 1er janvier 1970 à 00:00:00
  UTC.

## Exemple

Cette configuration affiche les cinq dernières actualités du site
[LinuxFr.org](https://linuxfr.org/) (avec une mise à jour toutes les dix
minutes).

```JSON
{
    "module": {
        "url": "https://cdn.jsdelivr.net/gh/regseb/gout/src/module/feed/feed.js",
        "config": {
            "color": "#ffc107",
            "icon": "https://cdn.jsdelivr.net/gh/regseb/gout/src/widget/feed/linuxfr/linuxfr.svg",
            "cron": "*/10 * * * *",
            "max": 5
        }
    },
    "scrapers": [{
        "url": "https://cdn.jsdelivr.net/gh/regseb/gout/src/scraper/feed/atom/atom.js",
        "config": {
            "url": "https://linuxfr.org/news.atom"
        }
    }]
}
```
