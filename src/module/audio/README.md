# Module *audio*

Ce module permet d'écouter un flux audio.

## Configuration

La configuration du module est un objet
[JSON](https://www.json.org/json-fr.html "JavaScript Object Notation") avec les
propriétés suivantes :

- `"link"` : le lien vers une page Internet ;
- `"desc"` (optionnel) : la description du flux qui sera affichée dans
  l'info-bulle ;
- `"color"` (optionnel - gris par défaut) : la couleur de fond du
  cadre (au format hexadécimale, régulier RGB ou avec des mots-clefs
  prédéfinis).

Une image ayant pour nom ***icon.svg*** peut aussi est présente dans le
répertoire du widget. Par défaut, une note de musique sera utilisée. L'image
doit être carrée et le dessin doit occupé toute la zone de l'image. Si le dessin
n'est pas carré, il faut le centrer verticalement et horizontalement. Seule la
couleur blanche doit être utilisée et elle doit avoir une opacité de `0.8`.

## Scraper

Ce module n'utilise pas de scraper.

- `"url"` : l'URL vers le flux audio ;

## Exemple

Cet exemple affiche un widget pour écouter la radio
[Fip](https://www.fipradio.fr/).

```JSON
{
    "module": "core/audio",
    "files": {
        "config.json": {
            "url": "https://direct.fipradio.fr/live/fip-midfi.mp3",
            "link": "https://www.fipradio.fr/",
            "desc": "Fip",
            "color": "#e91e63"
        }
    }
}
```
