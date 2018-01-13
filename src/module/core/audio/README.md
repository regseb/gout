# core/audio

Ce module permet d'écouter un flux audio.

## Configuration

Le répertoire du widget doit avoir un fichier ***config.json*** contenant un
objet
[JSON](https://www.json.org/json-fr.html "JavaScript Object Notation") avec les
propriétés suivantes :

- `"url"` : l'URL vers le flux audio ;
- `"link"` : le lien vers une page Internet ;
- `"desc"` (optionnel) : la description du flux qui sera affichée dans
  l'info-bulle ;
- `"color"` (optionnel - valeur par défaut : `"black"`) : la couleur de fond du
  cadre (au format hexadécimale, régulier RGB ou avec des mots-clefs
  prédéfinis).

Une image ayant pour nom ***icon.svg*** peut aussi est présente dans le
répertoire du widget. Par défaut, une note de musique sera utilisée. L'image
doit être carrée et le dessin doit occupé toute la zone de l'image. Si le dessin
n'est pas carré, il faut le centrer verticalement et horizontalement. Seule la
couleur blanche doit être utilisée et elle doit avoir une opacité de `0.8`.

Le module doit être carré.

## Scraper

Ce module n'utilise pas de scraper.

## Exemple

Cet exemple affiche cadre pour écouter la radio [Fip](http://www.fipradio.fr/).

```JSON
{
    "audio/fip": {
        "module": "core/audio",
        "coord": { "x": 1, "y": 1, "w": 5, "h": 5 },
        "files": {
            "config.json": {
                "url": "https://direct.fipradio.fr/live/fip-midfi.mp3",
                "link": "http://www.fipradio.fr/",
                "desc": "Fip",
                "color": "#e91e63"
            }
        }
    }
}
```
