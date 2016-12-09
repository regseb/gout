# /regseb/single/horoscope

Ce scraper récupère l'horoscope du jour pour un signe du zodiaque.

## Configuration

La configuration contient le signe du zodiaque. Les valeurs posibles sont
`"belier"`, `"taureau"`, `"gemeaux"`, `"cancer"`, `"lion"`, `"vierge"`,
`"balance"`, `"scorpion"`, `"sagittaire"`,`"capricorne"`, `"verseau"` et
`"poissons"`.

## Exemple

Cet exemple affiche l'horoscope du jour des *Lion*s.

```JSON
{
    "std/single/horoscope": {
        "widget": "std/single",
        "coord": { "x": 1, "y": 1, "w": 20, "h": 3 },
        "files": {
            "config.json": {
                "color": "black",
                "cron": "0 0 * * *"
            }
        },
        "scrapers": [
            {
                "scraper": "regseb/single/horoscope",
                "config": "lion"
            }
        ]
    }
}
```
